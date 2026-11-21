"use client";

import { useSubscribe } from "@/components/ProviderSubscribe";
import { Button } from "@/components/ui/button";
import { readerCopy } from "@/lib/reader-copy";

export default function ButtonSubscribe() {
	const { open, language } = useSubscribe();

	return (
		<Button size="sm" onClick={() => open()} className="h-8 px-3">
			{readerCopy(language).archive.subscribe}
		</Button>
	);
}
