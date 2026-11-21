import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ViewUnsubscribe from "../components/ViewUnsubscribe.jsx";
import { getConfirmationContent } from "../lib/confirmation-content.js";
import { formatDate } from "../lib/format.js";
import { getLastChanceContent } from "../lib/last-chance-content.js";
import en from "../lib/locales/en.js";
import ru from "../lib/locales/ru.js";
import { formatMergeValue } from "../lib/merge-tags.js";
import { prefillWelcome } from "../lib/welcome-content.js";
import { renderEmail } from "../lib/render-email.js";
import { renderDonePage, renderFormPage } from "../lib/signup-form-page.js";
import { getEmbedCode, toSignupFormSettings } from "../lib/signup-form.js";

const newsletter = { name: "Field notes", postalAddress: "1 Main St, Paris" };
const issue = { format: "markdown", markdown: "Hello", subject: "Hi", webUrl: "https://example.com/p/hi", author: { name: "Jane Doe" } };

function email(language) {
	return renderEmail({ ...issue, newsletter: language ? { ...newsletter, language } : newsletter });
}

function leaves(value, prefix = "", out = []) {
	if (typeof value === "function" || typeof value === "string") out.push(prefix);
	else for (const [key, child] of Object.entries(value)) leaves(child, prefix ? `${prefix}.${key}` : key, out);
	return out;
}

test("a newsletter with no language, and one set to English, render the same English email", () => {
	const missing = email();
	const english = email("en");
	assert.equal(english.html, missing.html);
	assert.equal(english.text, missing.text);
	assert.match(missing.html, /<html lang="en">/);
	assert.match(missing.html, /You're receiving this because you subscribed to Field notes\. <a[^>]*>Unsubscribe<\/a>/);
	assert.match(missing.html, />Read online</);
	assert.match(missing.html, />By Jane Doe</);
	assert.ok(missing.text.includes("You're receiving this because you subscribed to Field notes."));
	assert.ok(missing.text.includes("Unsubscribe: {{unsubscribe_url}}"));
	assert.ok(missing.text.includes("Read online: https://example.com/p/hi"));
	assert.ok(missing.text.includes("By Jane Doe"));
});

test("a Russian newsletter translates the footer, the byline and the browser link", () => {
	const rendered = email("ru");
	assert.match(rendered.html, /<html lang="ru">/);
	assert.match(rendered.html, /Вы получаете это письмо, потому что подписаны на Field notes\. <a[^>]*>Отписаться<\/a>/);
	assert.match(rendered.html, />Читать в браузере</);
	assert.match(rendered.html, />Автор: Jane Doe</);
	assert.ok(rendered.text.includes("Отписаться: {{unsubscribe_url}}"));
	assert.ok(rendered.text.includes("Читать в браузере: https://example.com/p/hi"));
	assert.ok(!rendered.html.includes(">Unsubscribe<"));
	assert.ok(!rendered.text.includes("You're receiving this"));
});

test("the built-in confirmation and last-chance emails follow the language, and a saved one does not", () => {
	const confirmation = getConfirmationContent({ name: "Field notes" });
	assert.equal(confirmation.subject, "Confirm your subscription to Field notes");
	assert.equal(confirmation.previewText, "One click and you're in. Until then, you won't get Field notes.");
	assert.ok(confirmation.html.includes("One click and you're in."));
	assert.ok(confirmation.html.includes("You asked to get Field notes."));
	assert.ok(confirmation.html.includes("Confirm your email and the next issue lands in your inbox."));
	assert.ok(confirmation.html.includes(">Confirm my subscription</a>"));
	assert.ok(confirmation.html.includes("Didn't sign up? Ignore this email and you won't hear from us again."));
	assert.equal(getConfirmationContent({ name: "Field notes", language: "en" }).html, confirmation.html);

	const russian = getConfirmationContent({ name: "Field notes", language: "ru" });
	assert.equal(russian.subject, "Подтвердите подписку на Field notes");
	assert.ok(russian.html.includes("Одно нажатие — и вы подписаны."));
	assert.ok(russian.html.includes("Вы попросили присылать Field notes."));
	assert.ok(russian.html.includes(">Подтвердить подписку</a>"));
	assert.ok(russian.html.includes("Не подписывались?"));

	const own = { subject: "My subject", previewText: "Mine", format: "rich", html: '<div data-button=""><a href="{{confirm_url}}">Go</a></div>' };
	const kept = getConfirmationContent({ name: "Field notes", language: "ru", confirmation: own });
	assert.equal(kept.subject, "My subject");
	assert.ok(kept.html.includes(">Go</a>"));
	assert.ok(!kept.html.includes("Подтвердить подписку"));

	const last = getLastChanceContent({ name: "Field notes" });
	assert.equal(last.subject, "Do you still want Field notes?");
	assert.equal(last.previewText, "Click the button, and it keeps coming.");
	assert.ok(last.html.includes("You haven't opened it in a while, so I'm checking before I stop sending it."));
	assert.ok(last.html.includes(">Yes, keep sending it</a>"));
	assert.ok(last.html.includes("If I don't hear from you, this is the last Field notes email you'll get."));
	const lastRu = getLastChanceContent({ name: "Field notes", language: "ru" });
	assert.equal(lastRu.subject, "Вы ещё хотите получать Field notes?");
	assert.ok(lastRu.html.includes(">Да, присылайте дальше</a>"));
	assert.ok(lastRu.html.includes("Вы давно её не открывали"));
	const ownLast = { subject: "Stay?", previewText: "", format: "rich", html: '<div data-button=""><a href="{{keep_url}}">Stay</a></div>' };
	assert.equal(getLastChanceContent({ name: "Field notes", language: "ru", lastChance: ownLast }).subject, "Stay?");
});

test("the welcome email's empty starting text follows the language, and a saved welcome email does not", () => {
	const empty = { subject: "", previewText: "", format: "rich", content: "" };
	const prefilled = prefillWelcome(empty, { name: "Field notes" });
	assert.equal(prefilled.subject, "Welcome to Field notes");
	assert.ok(prefilled.content.includes("Thanks for joining Field notes."));
	assert.ok(prefilled.content.includes("The next issue lands in your inbox. Hit reply to say hi."));
	const russian = prefillWelcome(empty, { name: "Field notes", language: "ru" });
	assert.equal(russian.subject, "Добро пожаловать в Field notes");
	assert.ok(russian.content.includes("Спасибо, что подписались на Field notes."));
	const saved = { subject: "Hi there", previewText: "", format: "rich", content: "<p>My own welcome.</p>" };
	assert.deepEqual(prefillWelcome(saved, { name: "Field notes", language: "ru" }), saved);
});

test("the unsubscribe page is English unless the newsletter is Russian", () => {
	const page = (view, language) => renderToStaticMarkup(createElement(ViewUnsubscribe, { view, newsletterName: "Field notes", token: "abc", language }));
	const confirm = page("confirm");
	assert.match(confirm, /Unsubscribe from Field notes\?/);
	assert.match(confirm, /You&#x27;ll stop receiving its emails\./);
	assert.match(confirm, />Unsubscribe</);
	assert.match(confirm, /lang="en"/);
	assert.match(page("invalid"), /This link doesn&#x27;t work/);
	assert.match(page("invalid"), /Open the unsubscribe link from the email again/);
	assert.match(page("error"), /You&#x27;re still subscribed to Field notes\. Try again in a minute\./);
	assert.match(page("done"), /You&#x27;re unsubscribed/);
	assert.match(page("done"), /You won&#x27;t receive emails from Field notes anymore\./);
	assert.equal(page("done"), page("done", "en"));

	const russian = page("confirm", "ru");
	assert.match(russian, /lang="ru"/);
	assert.match(russian, /Отписаться от Field notes\?/);
	assert.match(russian, /Вы больше не будете получать её письма\./);
	assert.match(russian, />Отписаться</);
	assert.match(page("done", "ru"), /Вы отписались/);
	assert.match(page("invalid", "ru"), /Эта ссылка не работает/);
	assert.ok(!russian.includes("Unsubscribe"));
});

test("the signup form's built-in words follow the language, and words the owner wrote stay", () => {
	assert.equal(toSignupFormSettings(undefined).buttonText, "Subscribe");
	assert.equal(toSignupFormSettings(undefined).placeholder, "you@example.com");
	assert.equal(toSignupFormSettings({ buttonText: "Subscribe", placeholder: "you@example.com" }, { language: "ru" }).buttonText, "Подписаться");
	assert.equal(toSignupFormSettings({ buttonText: "Subscribe", placeholder: "you@example.com" }, { language: "ru" }).placeholder, "вы@example.com");
	assert.equal(toSignupFormSettings({ buttonText: "Join us", placeholder: "work@example.com" }, { language: "ru" }).buttonText, "Join us");
	assert.equal(toSignupFormSettings({ buttonText: "Join us", placeholder: "work@example.com" }, { language: "ru" }).placeholder, "work@example.com");

	const html = renderFormPage({ newsletter: { name: "Field notes", theme: {} }, settings: toSignupFormSettings(undefined), endpoint: "/api/embed/x" });
	assert.match(html, /<html lang="en">/);
	assert.ok(html.includes("<strong>You&#39;re in</strong>"));
	assert.ok(html.includes("The next issue lands in your inbox."));
	assert.ok(html.includes('placeholder="you@example.com"'));
	assert.ok(html.includes('aria-label="Email"'));
	assert.ok(html.includes(">Subscribe</button>"));
	assert.ok(html.includes("Click the link we sent to <span data-email></span> to confirm. Until you do, you won&#39;t get a single issue."));
	assert.ok(html.includes('"Open "+inbox.name'));
	assert.ok(html.includes("Something went wrong. Try again."));

	const russian = renderFormPage({
		newsletter: { name: "Field notes", theme: {}, language: "ru" },
		settings: toSignupFormSettings({ buttonText: "Subscribe", placeholder: "you@example.com" }, { language: "ru" }),
		endpoint: "/api/embed/x",
	});
	assert.match(russian, /<html lang="ru">/);
	assert.ok(russian.includes(">Подписаться</button>"));
	assert.ok(russian.includes('placeholder="вы@example.com"'));
	assert.ok(russian.includes("Вы подписаны"));
	assert.ok(!russian.includes(">Subscribe</button>"));

	const pasted = getEmbedCode({
		appUrl: "https://mailcheap.test",
		newsletterId: "abc",
		settings: toSignupFormSettings({ askFirstName: true }),
		theme: {},
		newsletter: { name: "Field notes" },
	}).html;
	assert.ok(pasted.includes('placeholder="First name"') && pasted.includes('aria-label="Email"'));
	const pastedRu = getEmbedCode({
		appUrl: "https://mailcheap.test",
		newsletterId: "abc",
		settings: toSignupFormSettings({ askFirstName: true, buttonText: "Subscribe", placeholder: "you@example.com" }, { language: "ru" }),
		theme: {},
		newsletter: { name: "Field notes", language: "ru" },
	}).html;
	assert.ok(pastedRu.includes('placeholder="Имя"') && pastedRu.includes('aria-label="Эл. почта"') && pastedRu.includes(">Подписаться</button>"));

	const done = renderDonePage({ newsletter: { name: "Field notes", theme: {} }, done: { result: "subscribed" } });
	assert.match(done, /<html lang="en">/);
	assert.ok(done.includes("You're in") || done.includes("You&#39;re in"));
	assert.ok(done.includes("The next issue of Field notes lands in your inbox."));
	const doneRu = renderDonePage({ newsletter: { name: "Field notes", theme: {}, language: "ru" }, done: { result: "pending" } });
	assert.match(doneRu, /<html lang="ru">/);
	assert.ok(doneRu.includes("Проверьте почту"));
});

test("English dates and numbers stay as they were, and Russian uses its own", () => {
	const day = "1991-04-12T00:00:00.000Z";
	assert.equal(formatDate(day, "UTC"), "Apr 12, 1991");
	assert.equal(formatDate(day, "UTC", "en"), "Apr 12, 1991");
	assert.notEqual(formatDate(day, "UTC", "ru"), "Apr 12, 1991");
	assert.match(formatDate(day, "UTC", "ru"), /1991/);
	assert.equal(formatMergeValue("date", "1991-04-12"), "April 12, 1991");
	assert.equal(formatMergeValue("date", "1991-04-12", "en"), "April 12, 1991");
	assert.match(formatMergeValue("date", "1991-04-12", "ru"), /1991/);
	assert.notEqual(formatMergeValue("date", "1991-04-12", "ru"), "April 12, 1991");
	assert.equal(formatMergeValue("number", 1250), "1,250");
	assert.equal(formatMergeValue("number", 1250, "en"), "1,250");
	assert.notEqual(formatMergeValue("number", 1250, "ru"), "1,250");
});

test("English and Russian list the same strings, and the review table names each one", async () => {
	assert.deepEqual(leaves(ru), leaves(en));
	const table = await readFile(new URL("../docs/i18n-string-table.md", import.meta.url), "utf8");
	for (const key of leaves(en)) assert.ok(table.includes(`\`${key}\``), key);
	const printed = await new Promise((resolve, reject) => {
		execFile(process.execPath, ["scripts/print-i18n-table.mjs"], { cwd: fileURLToPath(new URL("..", import.meta.url)) }, (error, stdout) =>
			error ? reject(error) : resolve(stdout)
		);
	});
	assert.equal(table, printed);
});
