import { getConfirmationContent, getOwnConfirmation } from "./confirmation-content.js";
import { getLastChanceContent, getOwnLastChance } from "./last-chance-content.js";
import { SAMPLE_READER, fillForReader } from "./merge-tags.js";
import { hasEmailBody, toEmailContent } from "./newsletter-emails.js";
import { getReaderLanguage } from "./reader-language.js";
import { renderEmail } from "./render-email.js";
import { prefillWelcome } from "./welcome-content.js";

// A newsletter's welcome, confirmation or last-chance email as a reader would get it, filled for the sample reader.
// Nothing is sent and no provider is called. Welcome is the saved email, or the built-in draft when it's still empty.
// Confirmation and last-chance are the newsletter's own when they keep their button, otherwise the built-in ones.
export function previewNewsletterEmail(newsletter, kind) {
	const language = getReaderLanguage(newsletter);
	const content = kind === "welcome" ? welcomePreview(newsletter) : kind === "lastChance" ? lastChancePreview(newsletter) : confirmationPreview(newsletter);
	const email = toEmailContent(content.email);
	const rendered = renderEmail({ ...email, newsletter, unsubscribeUrl: "{{unsubscribe_url}}" });
	const filled = fillForReader(
		{ subject: email.subject, previewText: email.previewText, html: rendered.html, text: rendered.text },
		SAMPLE_READER,
		[],
		language
	);
	return { kind, language, isBuiltIn: content.isBuiltIn, ...filled };
}

function welcomePreview(newsletter) {
	const welcome = newsletter?.welcome;
	if (welcome?.subject?.trim() && hasEmailBody(welcome)) return { email: welcome, isBuiltIn: false };
	const prefilled = prefillWelcome({ subject: "", previewText: "", format: "rich", content: "" }, newsletter);
	return { email: { subject: prefilled.subject, previewText: "", format: "rich", content: prefilled.content }, isBuiltIn: true };
}

function confirmationPreview(newsletter) {
	return { email: getConfirmationContent(newsletter), isBuiltIn: !getOwnConfirmation(newsletter) };
}

function lastChancePreview(newsletter) {
	return { email: getLastChanceContent(newsletter), isBuiltIn: !getOwnLastChance(newsletter) };
}
