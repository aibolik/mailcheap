"use client";

import { startTransition, useActionState, useEffect } from "react";
import { Link2Off, Loader2, MailCheck } from "lucide-react";
import { confirmSubscription } from "@/app/confirm/actions";
import CardNotice from "@/components/CardNotice";
import { Button } from "@/components/ui/button";
import { readerCopy } from "@/lib/reader-copy";

// Confirms once the page's script runs, so a link scanner that only loads the page doesn't. No <form>: posted without
// the script from this page, which sends no referrer, it would come with Origin: null, which Next.js refuses with an
// error, and some scanners post forms that way.
export default function FormConfirm({ token, newsletterName, fromName, fromEmail, archiveUrl, language }) {
	const [state, confirm, isPending] = useActionState(confirmSubscription.bind(null, token), null);
	const copy = readerCopy(language).confirm;

	useEffect(() => {
		startTransition(confirm);
	}, [confirm]);

	if (state?.ok) {
		return (
			<CardNotice icon={MailCheck} tone="success" title={copy.successTitle}>
				{copy.successBeforeName}
				{newsletterName}
				{copy.successBeforeFrom}
				<span className="font-medium text-foreground">{fromName || fromEmail}</span>
				{fromName && ` (${fromEmail})`}
				{copy.successAfterFrom}
				{archiveUrl && (
					<Button asChild size="lg" variant="outline" className="mt-6 w-full">
						<a href={archiveUrl}>{copy.archive}</a>
					</Button>
				)}
			</CardNotice>
		);
	}

	if (state?.error) {
		return (
			<CardNotice icon={Link2Off} title={copy.invalidTitle}>
				{copy.invalidBody}
			</CardNotice>
		);
	}

	return (
		<CardNotice icon={isPending ? Loader2 : MailCheck} spin={isPending} title={copy.pendingTitle(newsletterName)}>
			{copy.pendingBody}
			<Button size="lg" disabled={isPending} onClick={() => startTransition(confirm)} className="mt-6 w-full">
				{isPending ? copy.confirming : copy.button}
			</Button>
		</CardNotice>
	);
}
