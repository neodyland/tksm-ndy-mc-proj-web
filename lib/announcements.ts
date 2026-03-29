import { promises as fs } from "node:fs";
import path from "node:path";

import { markdownToHtml } from "@/lib/markdown";

const ANNOUNCEMENTS_DIR = path.join(process.cwd(), "content", "announcements");

type AnnouncementFrontmatter = {
  title?: string;
  date?: string;
  summary?: string;
};

export type AnnouncementListItem = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export type AnnouncementDetail = AnnouncementListItem & {
  contentHtml: string;
};

function parseFrontmatter(markdown: string): {
  frontmatter: AnnouncementFrontmatter;
  body: string;
} {
  if (!markdown.startsWith("---\n")) {
    return { frontmatter: {}, body: markdown };
  }

  const end = markdown.indexOf("\n---\n", 4);
  if (end === -1) {
    return { frontmatter: {}, body: markdown };
  }

  const rawFrontmatter = markdown.slice(4, end);
  const body = markdown.slice(end + 5);
  const frontmatter: AnnouncementFrontmatter = {};

  for (const line of rawFrontmatter.split("\n")) {
    const delimiterIndex = line.indexOf(":");
    if (delimiterIndex <= 0) {
      continue;
    }

    const key = line.slice(0, delimiterIndex).trim();
    const value = line.slice(delimiterIndex + 1).trim().replace(/^"|"$/g, "");

    if (key === "title" || key === "date" || key === "summary") {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body: body.trim() };
}

export async function getAnnouncementSlugs(): Promise<string[]> {
  const entries = await fs.readdir(ANNOUNCEMENTS_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name.replace(/\.md$/, ""));
}

export async function getAnnouncementBySlug(slug: string): Promise<AnnouncementDetail> {
  const filePath = path.join(ANNOUNCEMENTS_DIR, `${slug}.md`);
  const markdown = await fs.readFile(filePath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(markdown);

  return {
    slug,
    title: frontmatter.title ?? slug,
    date: frontmatter.date ?? "日付未設定",
    summary: frontmatter.summary ?? "",
    contentHtml: markdownToHtml(body),
  };
}

export async function getAllAnnouncements(): Promise<AnnouncementListItem[]> {
  const slugs = await getAnnouncementSlugs();
  const items = await Promise.all(slugs.map((slug) => getAnnouncementBySlug(slug)));

  return items
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      date: item.date,
      summary: item.summary,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
