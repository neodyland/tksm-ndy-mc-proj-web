import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
	getAnnouncementBySlug,
	getAnnouncementSlugs,
} from "@/lib/announcements";

type PageProps = {
	params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
	const slugs = await getAnnouncementSlugs();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;

	try {
		const announcement = await getAnnouncementBySlug(slug);
		return {
			title: `${announcement.title} | お知らせ`,
			description:
				announcement.summary || `${announcement.title} のお知らせです。`,
		};
	} catch {
		return {
			title: "お知らせ",
			description: "お知らせページ",
		};
	}
}

export default async function AnnouncementDetailPage({ params }: PageProps) {
	const { slug } = await params;

	let announcement;
	try {
		announcement = await getAnnouncementBySlug(slug);
	} catch {
		notFound();
	}

	return (
		<article className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-8 sm:px-8 sm:py-12">
			<header className="rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 sm:p-8">
				<Badge variant="outline" className="mb-3">
					お知らせ詳細
				</Badge>
				<p className="text-xs text-muted-foreground">{announcement.date}</p>
				<h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">
					{announcement.title}
				</h1>
			</header>

			<section className="rounded-3xl border bg-card p-6 shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-700 sm:p-8">
				<div
					className="markdown-body space-y-4 text-sm leading-7 sm:text-base [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-semibold [&_li]:ml-5 [&_ol]:list-decimal [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted [&_pre]:p-3 [&_ul]:list-disc"
					dangerouslySetInnerHTML={{ __html: announcement.contentHtml }}
				/>
			</section>

			<Link
				href="/announcements"
				className="text-sm text-primary underline underline-offset-4 transition-transform duration-200 hover:-translate-y-0.5"
			>
				お知らせ一覧へ戻る
			</Link>
		</article>
	);
}
