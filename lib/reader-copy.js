import en from "./locales/en.js";
import ru from "./locales/ru.js";
import { READER_LANGUAGES, getReaderLanguage } from "./reader-language.js";

const LOCALES = { en, ru };

// The words MailCheap writes for readers of a newsletter. language: "en", "ru", or a newsletter's language field.
export function readerCopy(language) {
	return LOCALES[getReaderLanguage({ language })] ?? en;
}

const SIGNUP_DEFAULTS = {
	buttonText: (copy) => copy.signup.button,
	placeholder: (copy) => copy.signup.placeholder,
};

// Empty, or still one of the built-in button or placeholder words, in either language. Anything else was written by
// the owner and stays as they wrote it.
export function isBuiltinSignupText(value, key) {
	const text = String(value ?? "").trim();
	const pick = SIGNUP_DEFAULTS[key];
	if (!text || !pick) return !text;
	// вы@example.com was the first Russian placeholder. A newsletter that saved it is still on the default.
	return READER_LANGUAGES.some((language) => pick(LOCALES[language]) === text) || (key === "placeholder" && text === "вы@example.com");
}

// Reader-facing errors that start life in English (the signup checks). English comes back unchanged, including a
// message this doesn't know, so a dashboard or API caller keeps the words it already gets.
const KNOWN_ERRORS = [
	"enterEmail",
	"couldnt",
	"tooMany",
	"notTaking",
	"cantAdd",
	"undeliverable",
	"noMail",
	"formOff",
	"notBrowser",
	"otherSite",
	"tooFast",
	"expiredForm",
	"tooManyToday",
	"busy",
	"alreadyUsed",
	"closedForNow",
	"wrongSite",
	"tooManyVisits",
];

export function localizeKnownError(message, language) {
	if (!message || getReaderLanguage({ language }) !== "ru") return message;
	const key = KNOWN_ERRORS.find((name) => en.signup[name] === message);
	if (key) return ru.signup[key];
	const suggestion = /^Did you mean (.+)\?$/.exec(message);
	if (suggestion) return ru.signup.didYouMean(suggestion[1]);
	return message;
}
