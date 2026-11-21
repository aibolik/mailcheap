import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/format";

export default function BadgeDate({ date, language }) {
	return (
		<time dateTime={new Date(date).toISOString()} className="inline-flex items-center gap-1 tabular-nums">
			<Calendar aria-hidden="true" className="size-3.5" />
			{formatDate(date, undefined, language)}
		</time>
	);
}
