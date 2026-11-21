"use client";

import { useActionState, useEffect, useRef } from "react";
import { HeartHandshake, Link2Off, Loader2, MailCheck } from "lucide-react";
import { keepSending } from "@/app/keep/actions";
import CardNotice from "@/components/CardNotice";
import { Button } from "@/components/ui/button";
import { readerCopy } from "@/lib/reader-copy";

// Link scanners open the page without submitting forms, so only a person's browser says yes.
export default function FormKeep({ token, newsletterName, archiveUrl, language }) {
	const [state, action, isPending] = useActionState(keepSending.bind(null, token), null);
	const formRef = useRef(null);
	const copy = readerCopy(language).keep;

	useEffect(() => {
		formRef.current?.requestSubmit();
	}, []);

	if (state?.ok) {
		return (
			<CardNotice icon={MailCheck} tone="success" title={copy.successTitle(newsletterName)}>
				{copy.successBody}
				{archiveUrl && (
					<Button asChild size="lg" variant="outline" className="mt-6 w-full">
						<a href={archiveUrl}>{copy.archive}</a>
					</Button>
				)}
			</CardNotice>
		);
	}

	if (state?.error === "invalid") {
		return (
			<CardNotice icon={Link2Off} title={copy.invalidTitle}>
				{copy.formInvalid(newsletterName)}
				{archiveUrl && (
					<Button asChild size="lg" variant="outline" className="mt-6 w-full">
						<a href={archiveUrl}>{copy.signUpAgain}</a>
					</Button>
				)}
			</CardNotice>
		);
	}

	return (
		<CardNotice icon={isPending ? Loader2 : HeartHandshake} spin={isPending} title={copy.promptTitle(newsletterName)}>
			{state?.error === "busy" ? copy.busy : copy.promptBody}
			<form ref={formRef} action={action} className="mt-6">
				<Button type="submit" size="lg" disabled={isPending} className="w-full">
					{isPending ? copy.saving : copy.button}
				</Button>
			</form>
		</CardNotice>
	);
}
