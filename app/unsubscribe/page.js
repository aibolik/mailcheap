import SetDocumentLang from "@/components/SetDocumentLang";
import ViewUnsubscribe from "@/components/ViewUnsubscribe";
import { connectDb } from "@/lib/db";
import { findNewsletterAnywhere } from "@/lib/public-newsletters";
import { readerCopy } from "@/lib/reader-copy";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";
import Contact from "@/models/Contact";

// The URL carries the unsubscribe token: keep it out of search results and referrer headers.
const PRIVATE = { robots: { index: false, follow: false }, referrer: "no-referrer" };

export async function generateMetadata({ searchParams }) {
	const { token } = await searchParams;
	const reference = verifyUnsubscribeToken(typeof token === "string" ? token : null);
	const subscription = reference ? await getSubscription(reference) : null;
	return { ...PRIVATE, title: readerCopy(subscription?.language).unsubscribe.metaTitle };
}

const SUBSCRIBED_STATUSES = ["active", "dormant"];

export default async function UnsubscribePage({ searchParams }) {
	const { token, status } = await searchParams;
	const validToken = typeof token === "string" ? token : null;
	const reference = verifyUnsubscribeToken(validToken);
	const subscription = reference ? await getSubscription(reference) : null;
	const view = getView({ reference, status, subscription });

	return (
		<>
			<SetDocumentLang language={subscription?.language} />
			<ViewUnsubscribe
				view={view}
				newsletterName={subscription?.newsletterName}
				token={validToken}
				language={subscription?.language}
				theme={subscription?.theme}
			/>
		</>
	);
}

async function getSubscription({ contactId, newsletterId }) {
	try {
		await connectDb();
		const newsletter = await findNewsletterAnywhere({ _id: newsletterId });
		const contact =
			newsletter &&
			(await Contact.findOne({ accountId: newsletter.accountId, _id: contactId, newsletterId })
				.select({ status: 1 })
				.lean());
		return {
			newsletterName: newsletter?.name,
			theme: newsletter?.theme,
			language: newsletter?.language,
			isSubscribed: !contact || SUBSCRIBED_STATUSES.includes(contact.status),
		};
	} catch (error) {
		console.error("[unsubscribe] Could not load the subscription:", error.message);
		return { isSubscribed: true };
	}
}

function getView({ reference, status, subscription }) {
	if (!reference) return "invalid";
	if (status === "done" || status === "error") return status;
	return subscription?.isSubscribed === false ? "done" : "confirm";
}

