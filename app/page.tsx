"use client";

import { ExternalLink, Pickaxe, Sprout, Wifi } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const servers = [
  {
    name: "サバイバル鯖",
    description: "採掘・冒険・建築を楽しむ通常ワールドです。",
    address: "survival.mc.neody.ad.jp",
    icon: Sprout,
    badgeVariant: "default" as const,
  },
  {
    name: "建築鯖",
    description: "大型建築や街づくり向けのクリエイティブ環境です。",
    address: "kenchiku.mc.neody.ad.jp",
    icon: Pickaxe,
    badgeVariant: "secondary" as const,
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-x-clip bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[380px] bg-gradient-to-b from-emerald-200/40 via-sky-200/25 to-transparent blur-3xl dark:from-emerald-500/20 dark:via-sky-500/20" />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:gap-10 sm:px-8 sm:py-14">
        <section className="rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur sm:p-10">
          <Badge variant="outline" className="mb-4 max-w-full text-[11px] sm:text-xs">
            Takasumi-Neodyマイクラサーバプロジェクト接続ガイド
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Minecraft サーバへ接続する
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            サーバー追加画面で下記アドレスを入力してください。Java版 と
            統合版のどちらにも対応しています。
          </p>
          <div className="mt-6">
            <Link href="/announcements" className={cn(buttonVariants({ variant: "outline" }))}>
              お知らせを見る
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {servers.map((server) => {
            const Icon = server.icon;
            return (
              <article
                key={server.name}
                className="rounded-2xl border border-foreground/10 bg-card p-5 shadow-xs sm:p-6"
              >
                <header>
                  <div className="mb-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <Badge variant={server.badgeVariant}>{server.name}</Badge>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Wifi className="size-3.5" />
                      Java版 / 統合版 対応
                    </span>
                  </div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold">
                    <Icon className="size-5" />
                    {server.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{server.description}</p>
                </header>
                <div className="mt-5">
                  <div className="rounded-xl border bg-background px-4 py-3">
                    <p className="text-xs text-muted-foreground">サーバアドレス</p>
                    <p className="mt-1 break-all font-mono text-sm">{server.address}</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <a
                    className={cn(buttonVariants(), "w-full sm:w-auto")}
                    href={`minecraft://?addExternalServer=${server.name}|${server.address}`}
                  >
                    Minecraft で開く
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </section>

        <section className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold">接続手順</h2>
          <Separator className="my-4" />
          <ol className="space-y-3 text-sm leading-7 sm:text-base">
            <li>1. Minecraft（Java版 または統合版）を起動する。</li>
            <li>2. サーバー追加画面を開く（Java版: マルチプレイ / 統合版: サーバー）。</li>
            <li>3. 接続したい鯖のサーバアドレスを入力して保存する。</li>
            <li>4. 一覧からサーバを選んで接続する。</li>
          </ol>
        </section>
      </main>
      <footer className="border-t bg-card/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-4 text-center text-xs text-muted-foreground sm:px-8 sm:text-sm">
          運用元:
          <a
            href="https://neody.land/ja"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-medium text-foreground underline underline-offset-4 hover:text-primary"
          >
            Neodyland
          </a>
        </div>
      </footer>
    </div>
  );
}
