import AvatarNewsletter from "@/components/AvatarNewsletter";
import FormSubscribe from "@/components/FormSubscribe";
import { readerCopy } from "@/lib/reader-copy";

// A handful of readers makes weak social proof, so small lists get the name instead.
const MIN_READERS_SHOWN = 100;

export default function PitchSubscribe({ newsletter, readers, titleAs: Title = "h2" }) {
	const copy = readerCopy(newsletter.language).archive;
	return (
		<div className="flex flex-col items-center text-center">
			<AvatarNewsletter newsletter={newsletter} size={48} className="rounded-xl" />
			<Title className="mt-4 text-xl font-theme-heading text-balance">
				{readers >= MIN_READERS_SHOWN ? copy.joinReaders(readers) : copy.subscribeTo(newsletter.name)}
			</Title>
			{newsletter.description && (
				<p className="mt-2 max-w-sm text-muted-foreground text-pretty">{newsletter.description}</p>
			)}
			<FormSubscribe newsletterSlug={newsletter.slug} language={newsletter.language} className="mt-6 max-w-sm" />
			<p className="mt-3 text-xs text-muted-foreground">{copy.free}</p>
		</div>
	);
}
