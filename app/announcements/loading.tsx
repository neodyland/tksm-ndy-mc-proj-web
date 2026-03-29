export default function AnnouncementsLoading() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-4 py-12 sm:px-8">
      <div className="flex items-center gap-3 rounded-xl border bg-card px-5 py-3 text-sm text-muted-foreground shadow-sm">
        <span className="inline-block size-2.5 animate-pulse rounded-full bg-primary" />
        お知らせを読み込み中...
      </div>
    </div>
  );
}
