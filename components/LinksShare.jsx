import ListIconLinks from "@/components/ListIconLinks";
import { readerCopy } from "@/lib/reader-copy";
import { getShareLinks } from "@/lib/social";

export default function LinksShare({ url, text, className, language }) {
	const shareOn = (label) => readerCopy(language).archive.shareOn(label);
	const items = getShareLinks({ url, text, shareOn }).map(({ href, label, path }) => ({
		href,
		label,
		rel: "noopener",
		platform: { path },
	}));
	return <ListIconLinks items={items} className={className} />;
}
