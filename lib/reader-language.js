// A newsletter's language is what readers see of the words MailCheap writes. Missing, or anything else, is English, so a
// newsletter saved before the field existed stays as it was. Safe to import from the browser: no database, no server.
export const READER_LANGUAGES = ["en", "ru"];

export function getReaderLanguage(newsletter) {
	return newsletter?.language === "ru" ? "ru" : "en";
}

export function readerOpenGraphLocale(language) {
	return getReaderLanguage({ language }) === "ru" ? "ru_RU" : "en_US";
}

// A newsletter's name, or a whole sentence for when it has none. One shared noun can't fit every Russian case.
export function withNewsletterName(name, withName, withoutName) {
	const trimmed = String(name ?? "").trim();
	return trimmed ? withName(trimmed) : withoutName;
}

// one / few / many, for Russian counts. 1, 21, 31 are one; 2–4 are few; 5–20 and 11–14 are many.
export function pluralRu(count, one, few, many) {
	const n = Math.abs(Number(count)) || 0;
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod10 === 1 && mod100 !== 11) return one;
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
	return many;
}
