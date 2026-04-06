export function SiteFooter() {
  return (
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
  );
}