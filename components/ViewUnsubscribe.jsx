import { CircleAlert, Link2Off, MailCheck, MailX } from "lucide-react";
import StyleTheme from "@/components/StyleTheme";
import { Button } from "@/components/ui/button";
import { readerCopy } from "@/lib/reader-copy";
import { getReaderLanguage } from "@/lib/reader-language";

const ICONS = { invalid: Link2Off, confirm: MailX, error: CircleAlert, done: MailCheck };

// The unsubscribe page a reader opens from an email. view: invalid, confirm, error or done.
export default function ViewUnsubscribe({ view, newsletterName, token, language, theme }) {
	const copy = readerCopy(language);
	const words = copy.unsubscribe;
	const content = {
		invalid: { title: words.invalidTitle, description: words.invalidBody },
		confirm: { title: words.confirmTitle(newsletterName), description: words.confirmBody },
		error: { title: words.errorTitle, description: words.errorBody(newsletterName) },
		done: { title: words.doneTitle, description: words.doneBody(newsletterName) },
	}[view];
	const Icon = ICONS[view];
	const hasForm = view === "confirm" || view === "error";
	const lang = getReaderLanguage({ language });

	return (
		<main lang={lang} className="flex min-h-dvh items-center justify-center bg-background px-4 py-16">
			<StyleTheme theme={theme} />
			<div className="w-full max-w-sm rounded-xl bg-card p-6 text-center shadow-border sm:p-8">
				<div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
					<Icon className="size-5" aria-hidden="true" />
				</div>
				<h1 className="mt-4 text-lg font-theme-heading text-balance">{content.title}</h1>
				<p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">{content.description}</p>
				{hasForm && (
					<form method="post" action={`/api/unsubscribe?token=${token}`} className="mt-6">
						<input type="hidden" name="source" value="page" />
						<Button type="submit" size="lg" className="w-full">
							{words.button}
						</Button>
					</form>
				)}
			</div>
		</main>
	);
}
