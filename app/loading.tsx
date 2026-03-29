export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-16 sm:px-8">
      <div className="flex items-center gap-3 rounded-xl border bg-card px-5 py-3 text-sm text-muted-foreground shadow-sm">
        <span className="inline-block size-2.5 animate-pulse rounded-full bg-primary" />
        Loading...
      </div>
    </div>
  );
}
