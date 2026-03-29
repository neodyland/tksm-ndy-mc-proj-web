import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllAnnouncements } from "@/lib/announcements";

export const metadata = {
  title: "お知らせ | Takasumi-Neodyマイクラサーバプロジェクト",
  description: "Takasumi-Neodyマイクラサーバプロジェクトのお知らせ一覧です。",
};

export default async function AnnouncementsPage() {
  const announcements = await getAllAnnouncements();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-8 sm:py-12">
      <header className="rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur sm:p-8">
        <Badge variant="outline" className="mb-3">
          お知らせ
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">更新情報・告知</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          このページは Markdown で作成したお知らせを表示します。
        </p>
      </header>

      <section className="grid gap-4">
        {announcements.map((item) => (
          <Card key={item.slug} className="border-foreground/10">
            <CardHeader>
              <p className="text-xs text-muted-foreground">{item.date}</p>
              <CardTitle className="text-xl">
                <Link
                  href={`/announcements/${item.slug}`}
                  className="underline-offset-4 hover:underline"
                >
                  {item.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
