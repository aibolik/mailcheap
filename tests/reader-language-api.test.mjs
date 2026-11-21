import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { activate, anonymous, as, callApi, catchRedirect, form, signIn, startTestApp } from "./helpers/app.mjs";

let app;
let m;
let nextId = 0;

before(async () => {
	app = await startTestApp();
	m = {
		apiKeys: await import("../app/(app)/api-keys/actions.js"),
		newsletters: await import("../app/(app)/newsletters/actions.js"),
		mcpRoute: await import("../app/mcp/route.js"),
		Message: (await import("../models/Message.js")).default,
		sent: (await import("@/lib/ses")).sent,
	};
});

after(() => app?.stop());

async function customer(email) {
	const user = await signIn(email);
	await activate(user);
	const slug = email.split("@")[0].replaceAll(/[^a-z0-9]/g, "");
	const url = await as(user, () => catchRedirect(m.newsletters.saveNewsletter(null, form({ name: slug, slug, postalAddress: "1 Main St, Paris" }))));
	user.newsletterId = url.split("/").at(-1);
	user.key = (await as(user, () => m.apiKeys.createApiKey(null, form({ name: "Agent", level: "full" })))).key;
	return user;
}

async function callTool(key, name, args = {}, method = "tools/call") {
	const request = new Request("http://localhost:3000/mcp", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			accept: "application/json, text/event-stream",
			"mcp-protocol-version": "2025-06-18",
			authorization: `Bearer ${key}`,
		},
		body: JSON.stringify({ jsonrpc: "2.0", method, params: method === "tools/list" ? {} : { name, arguments: args }, id: ++nextId }),
	});
	const text = await (await anonymous(() => m.mcpRoute.POST(request))).text();
	const { result } = JSON.parse(text.split("\n").find((line) => line.startsWith("data: ")).slice(6));
	if (method === "tools/list") return result;
	if (!result.isError) return result.structuredContent;
	// The SDK refuses a value the schema doesn't allow before the handler, as plain text.
	try {
		return JSON.parse(result.content[0].text);
	} catch {
		return { error: { code: "validation_failed", message: result.content[0].text } };
	}
}

test("the API and MCP read and update language, and refuse anything else", async () => {
	const user = await customer("language@example.com");
	const path = `/api/v1/newsletters/${user.newsletterId}`;
	const first = await callApi("GET", path, { key: user.key });
	assert.equal(first.status, 200);
	assert.equal(first.body.language, "en", "a newsletter saved without one is English");

	const updated = await callApi("PATCH", path, { key: user.key, body: { language: "ru" } });
	assert.equal(updated.status, 200);
	assert.equal(updated.body.language, "ru");
	assert.equal(updated.body.confirmation.subject, "Подтвердите подписку на language");
	assert.equal(updated.body.confirmation.isCustom, false);

	const again = await callApi("GET", path, { key: user.key });
	assert.equal(again.body.language, "ru");

	const invalid = await callApi("PATCH", path, { key: user.key, body: { language: "fr" } });
	assert.equal(invalid.status, 400);
	assert.equal(invalid.body.error.code, "validation_failed");
	assert.match(invalid.body.error.message, /language/);
	assert.equal((await callApi("GET", path, { key: user.key })).body.language, "ru", "an invalid value is not saved");

	const fromMcp = await callTool(user.key, "update_newsletter", { id: user.newsletterId, language: "en" });
	assert.equal(fromMcp.language, "en");
	assert.equal((await callTool(user.key, "get_newsletter", { id: user.newsletterId })).language, "en");
	const refused = await callTool(user.key, "update_newsletter", { id: user.newsletterId, language: "de" });
	assert.equal(refused.error.code, "validation_failed");

	const listed = await callTool(user.key, null, {}, "tools/list");
	const update = listed.tools.find((tool) => tool.name === "update_newsletter");
	const preview = listed.tools.find((tool) => tool.name === "preview_newsletter_email");
	assert.match(JSON.stringify(update.inputSchema), /language/);
	assert.ok(preview, "preview_newsletter_email is a tool");
	assert.match(preview.description, /Nothing is sent/);
});

test("previewing a newsletter email sends nothing", async () => {
	const user = await customer("preview-language@example.com");
	await callApi("PATCH", `/api/v1/newsletters/${user.newsletterId}`, { key: user.key, body: { language: "ru" } });
	const before = { sent: m.sent.length, messages: await m.Message.countDocuments({ accountId: user.accountId }) };
	const preview = await callApi("GET", `/api/v1/newsletters/${user.newsletterId}/email-preview?kind=confirmation`, { key: user.key });
	assert.equal(preview.status, 200);
	assert.equal(preview.body.language, "ru");
	assert.equal(preview.body.isBuiltIn, true);
	assert.equal(preview.body.kind, "confirmation");
	assert.equal(preview.body.subject, "Подтвердите подписку на previewlanguage");
	assert.match(preview.body.html, /Подтвердить подписку/);
	assert.match(preview.body.html, /<html lang="ru">/);
	assert.ok(preview.body.text.includes("Отписаться:"));
	assert.equal(m.sent.length, before.sent);
	assert.equal(await m.Message.countDocuments({ accountId: user.accountId }), before.messages);

	const welcome = await callTool(user.key, "preview_newsletter_email", { id: user.newsletterId, kind: "welcome" });
	assert.equal(welcome.language, "ru");
	assert.equal(welcome.isBuiltIn, true);
	assert.equal(welcome.subject, "Добро пожаловать в previewlanguage");
	const last = await callTool(user.key, "preview_newsletter_email", { id: user.newsletterId, kind: "lastChance" });
	assert.equal(last.subject, "Вы ещё хотите получать previewlanguage?");
	const bad = await callApi("GET", `/api/v1/newsletters/${user.newsletterId}/email-preview?kind=nope`, { key: user.key });
	assert.equal(bad.status, 400);
	assert.equal(bad.body.error.code, "validation_failed");
	assert.equal(m.sent.length, before.sent);
});
