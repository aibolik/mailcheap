import { Link2Off } from "lucide-react";
import CardNotice from "@/components/CardNotice";
import FormConfirm from "@/components/FormConfirm";
import SetDocumentLang from "@/components/SetDocumentLang";
import StyleTheme from "@/components/StyleTheme";
import { hasPublishedIssue } from "@/lib/archive-data";
import { getArchiveUrls } from "@/lib/archive-hosts";
import { verifyConfirmToken } from "@/lib/confirmation";
import { connectDb } from "@/lib/db";
import { findOpenNewsletter } from "@/lib/public-newsletters";
import { readerCopy } from "@/lib/reader-copy";
import { getReaderLanguage } from "@/lib/reader-language";

// The URL carries the confirmation token: keep it out of search results and referrer headers.
const PRIVATE = { robots: { index: false, follow: false }, referrer: "no-referrer" };

export async function generateMetadata({ searchParams }) {
	const { token } = await searchParams;
	const reference = verifyConfirmToken(typeof token === "string" ? token : null);
	const newsletter = reference ? await getNewsletter(reference.newsletterId) : null;
	return { ...PRIVATE, title: readerCopy(newsletter?.language).confirm.metaTitle };
}

export default async function ConfirmPage({ searchParams }) {
	const { token } = await searchParams;
	const validToken = typeof token === "string" ? token : null;
	const reference = verifyConfirmToken(validToken);
	const newsletter = reference ? await getNewsletter(reference.newsletterId) : null;

	const copy = readerCopy(newsletter?.language).confirm;
	const lang = getReaderLanguage(newsletter);

	return (
		<main lang={lang} className="flex min-h-dvh items-center justify-center bg-background px-4 py-16">
			<SetDocumentLang language={newsletter?.language} />
			<StyleTheme theme={newsletter?.theme} />
			{newsletter ? (
				<FormConfirm
					token={validToken}
					newsletterName={newsletter.name}
					fromName={newsletter.fromName}
					fromEmail={newsletter.fromEmail}
					archiveUrl={newsletter.isArchiveLive ? getArchiveUrls(newsletter).siteIndex : null}
					language={newsletter.language}
				/>
			) : (
				<CardNotice icon={Link2Off} title={copy.invalidTitle}>
					{copy.invalidBody}
				</CardNotice>
			)}
		</main>
	);
}

async function getNewsletter(newsletterId) {
	try {
		await connectDb();
		const newsletter = await findOpenNewsletter({ _id: newsletterId });
		return newsletter && { ...newsletter, isArchiveLive: newsletter.archiveEnabled && (await hasPublishedIssue(newsletter)) };
	} catch (error) {
		console.error("[confirm] Could not load the newsletter:", error.message);
		return null;
	}
}
