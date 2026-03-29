import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Takasumi-Neodyマイクラサーバプロジェクト接続ガイド",
  description: "Takasumi-Neodyマイクラサーバプロジェクト（サバイバル鯖・建築鯖）への接続方法とサーバアドレスを案内します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
            <Link href="/" className="text-sm font-semibold tracking-tight sm:text-base">
              Takasumi-Neodyマイクラサーバプロジェクト
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="underline-offset-4 hover:underline">
                メインページ
              </Link>
              <Link href="/announcements" className="underline-offset-4 hover:underline">
                お知らせ
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
