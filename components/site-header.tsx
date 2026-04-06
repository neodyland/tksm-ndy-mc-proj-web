import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-500">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight transition-colors duration-200 hover:text-primary sm:text-base"
        >
          Takasumi-Neodyマイクラサーバプロジェクト
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
          >
            メインページ
          </Link>
          <Link
            href="/announcements"
            className="underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline"
          >
            お知らせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
