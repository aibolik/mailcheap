import { KEEP_URL_PLACEHOLDER } from "./action-links.js";
import { htmlButton, htmlParagraph, isSameEmail, readEmail, toEmailContent } from "./newsletter-emails.js";
import { readerCopy } from "./reader-copy.js";
import { renderEmail } from "./render-email.js";

export { KEEP_URL_PLACEHOLDER };
const KEEP_LINK = `href="${KEEP_URL_PLACEHOLDER}"`;
export const KEEP_BUTTON_TEXT = readerCopy("en").lastChance.button;

// What a cold contact gets instead of an issue (lib/cleanup.js), and where a newsletter's own version starts, in the
// editor's HTML. One question, one button. A newsletter's own last-chance email is left as they wrote it.
function getDefaultLastChance(newsletter) {
	const copy = readerCopy(newsletter?.language).lastChance;
	const name = newsletter?.name?.trim() || copy.fallbackName;
	return {
		subject: copy.subject(name),
		previewText: copy.preview,
		format: "rich",
		html: [
			htmlParagraph(copy.headline(name), { isBold: true }),
			htmlParagraph(copy.body),
			htmlButton(KEEP_URL_PLACEHOLDER, copy.button),
			htmlParagraph(copy.goodbye(name)),
		].join(""),
	};
}

export function isDefaultLastChance(lastChance, ...newsletters) {
	return newsletters.some((newsletter) => isSameEmail(lastChance, getDefaultLastChance(newsletter)));
}

export function getLastChanceProblem(lastChance) {
	if (!lastChance?.subject?.trim()) return "Last-chance email needs a subject";
	if (!renderEmail(toEmailContent(lastChance)).html.includes(KEEP_LINK)) {
		return `Last-chance email needs its button: a link to ${KEEP_URL_PLACEHOLDER}, which keeps each contact who clicks it`;
	}
	return null;
}

// The newsletter's own last-chance email, or null without one that keeps its button.
export function getOwnLastChance(newsletter) {
	const custom = newsletter?.lastChance && readEmail(newsletter.lastChance);
	return custom && !getLastChanceProblem(custom) ? toEmailContent(custom) : null;
}

// The newsletter's own, unless the content check holds it (builtIn): then, or without one, the built-in one goes out.
export function getLastChanceContent(newsletter, { builtIn = false } = {}) {
	return (!builtIn && getOwnLastChance(newsletter)) || toEmailContent(getDefaultLastChance(newsletter));
}
