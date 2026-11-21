import { CONFIRM_URL_PLACEHOLDER } from "./action-links.js";
import { formatSentence } from "./format.js";
import { htmlButton, htmlParagraph, isSameEmail, readEmail, toEmailContent } from "./newsletter-emails.js";
import { readerCopy } from "./reader-copy.js";
import { renderEmail } from "./render-email.js";

export { CONFIRM_URL_PLACEHOLDER };
const CONFIRM_LINK = `href="${CONFIRM_URL_PLACEHOLDER}"`;
export const CONFIRM_BUTTON_TEXT = readerCopy("en").confirmation.button;

// The built-in email, and where a newsletter's own version starts, in the editor's HTML. Kept short: one job, one button.
// A newsletter's own confirmation is left as they wrote it; only this one follows the newsletter's language.
function getDefaultConfirmation(newsletter) {
	const copy = readerCopy(newsletter?.language).confirmation;
	const name = newsletter?.name?.trim() || copy.fallbackName;
	const description = formatSentence(newsletter?.description);
	const intro = copy.intro(name);
	return {
		subject: copy.subject(name),
		previewText: copy.preview(name),
		format: "rich",
		html: [
			htmlParagraph(copy.headline, { isBold: true }),
			...(description ? [htmlParagraph(`${intro} ${description}`), htmlParagraph(copy.nextStep)] : [htmlParagraph(`${intro} ${copy.nextStep}`)]),
			htmlButton(CONFIRM_URL_PLACEHOLDER, copy.button),
			htmlParagraph(copy.ignore),
		].join(""),
	};
}

export function isDefaultConfirmation(confirmation, ...newsletters) {
	return newsletters.some((newsletter) => isSameEmail(confirmation, getDefaultConfirmation(newsletter)));
}

// Markdown links encode the braces (%7B%7B), so in Markdown only an HTML link keeps the placeholder; in the editor, a
// button or a link to it does.
export function getConfirmationProblem(confirmation) {
	if (!confirmation?.subject?.trim()) return "Confirmation email needs a subject";
	if (!renderEmail(toEmailContent(confirmation)).html.includes(CONFIRM_LINK)) {
		return `Confirmation email needs its button: a link to ${CONFIRM_URL_PLACEHOLDER}, which becomes each subscriber's own link`;
	}
	return null;
}

// The newsletter's own confirmation email, or null without one that keeps its button.
export function getOwnConfirmation(newsletter) {
	const custom = newsletter?.confirmation && readEmail(newsletter.confirmation);
	return custom && !getConfirmationProblem(custom) ? toEmailContent(custom) : null;
}

// What a new subscriber gets when their newsletter asks them to confirm. It's the only email they get,
// so a newsletter can write its own; without one, if it lost its button, or while the content check holds it
// (builtIn), the built-in one goes out.
export function getConfirmationContent(newsletter, { builtIn = false } = {}) {
	return (!builtIn && getOwnConfirmation(newsletter)) || toEmailContent(getDefaultConfirmation(newsletter));
}
