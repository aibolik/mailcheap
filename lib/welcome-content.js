import { formatSentence } from "./format.js";
import { hasEmailBody, htmlParagraph } from "./newsletter-emails.js";
import { readerCopy } from "./reader-copy.js";

// Where the settings form starts a welcome email switched on with no subject and no content, in the editor's HTML. Only
// a prefill: saved welcome emails go out as they are (lib/sending-rules.js), in the words the owner wrote. welcome: as
// the form has it, { subject, previewText, format, content }.
export function prefillWelcome(welcome, newsletter) {
	if (welcome.subject.trim() || hasEmailBody(welcome)) return welcome;
	const copy = readerCopy(newsletter?.language).welcome;
	const name = newsletter?.name?.trim() || copy.fallbackName;
	const intro = [copy.thanks(name), formatSentence(newsletter?.description)].filter(Boolean).join(" ");
	return {
		...welcome,
		subject: copy.subject(name),
		format: "rich",
		content: [htmlParagraph(intro), htmlParagraph(copy.next)].join(""),
	};
}
