"use client";

import { Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCompact, formatNumber } from "@/lib/format";
import { readerCopy } from "@/lib/reader-copy";
import { getReaderLanguage } from "@/lib/reader-language";

const RU_NUMBER = new Intl.NumberFormat("ru-RU");
const RU_COMPACT = new Intl.NumberFormat("ru-RU", { notation: "compact", maximumFractionDigits: 1 });

export default function BadgeViews({ views, isCompact = false, language }) {
	const lang = getReaderLanguage({ language });
	const exact = lang === "ru" ? RU_NUMBER.format(views || 0) : formatNumber(views);
	const copy = readerCopy(lang).archive;

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<span className="inline-flex items-center gap-1 tabular-nums">
					<Eye aria-hidden="true" className="size-3.5" />
					{isCompact ? (lang === "ru" ? RU_COMPACT.format(views || 0) : formatCompact(views)) : exact}
					<span className="sr-only">{copy.viewLabel(views)}</span>
				</span>
			</TooltipTrigger>
			<TooltipContent>{copy.humansRead(exact, views)}</TooltipContent>
		</Tooltip>
	);
}
