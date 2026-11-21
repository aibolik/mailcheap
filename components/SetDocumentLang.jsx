import { getReaderLanguage } from "@/lib/reader-language";

// The root layout owns <html lang="en"> so archive pages can stay cached. This runs before paint and sets the
// reader's language on that element. The page also sets lang on its own content, which is in the HTML itself.
export default function SetDocumentLang({ language }) {
	const lang = getReaderLanguage({ language });
	return <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang=${JSON.stringify(lang)}` }} />;
}
