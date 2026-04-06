import type { MetadataRoute } from "next";

import { getAllAnnouncements } from "@/lib/announcements";

export const dynamic = "force-static";

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ??
	process.env.SITE_URL ??
	"https://mc.neody.ad.jp";

function toAbsoluteUrl(pathname: string): string {
	return new URL(pathname, SITE_URL).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const announcements = await getAllAnnouncements();

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: toAbsoluteUrl("/"),
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: toAbsoluteUrl("/announcements/"),
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		},
	];

	const announcementRoutes: MetadataRoute.Sitemap = announcements.map(
		(item) => {
			const parsedDate = new Date(item.date);

			return {
				url: toAbsoluteUrl(`/announcements/${item.slug}/`),
				lastModified: Number.isNaN(parsedDate.getTime())
					? new Date()
					: parsedDate,
				changeFrequency: "monthly",
				priority: 0.7,
			};
		},
	);

	return [...staticRoutes, ...announcementRoutes];
}
