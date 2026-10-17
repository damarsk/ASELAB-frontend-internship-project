export default function TeamCardSkeleton() {
  return (
    <article
      className="flex min-h-72 animate-pulse flex-col rounded-xl border border-border bg-white p-5"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="size-14 rounded-full bg-background-muted" />
        <div className="h-4 w-20 rounded bg-background-muted" />
      </div>
      <div className="mt-4 h-6 w-3/4 rounded bg-background-muted" />
      <div className="mt-2 h-4 w-1/2 rounded bg-background-muted" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-background-muted" />
        <div className="h-3 w-5/6 rounded bg-background-muted" />
      </div>
      <div className="mt-5 h-3 w-28 rounded bg-background-muted" />
      <div className="mt-2 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-background-muted" />
        <div className="h-6 w-20 rounded-full bg-background-muted" />
        <div className="h-6 w-14 rounded-full bg-background-muted" />
      </div>
      <div className="mt-auto pt-5">
        <div className="h-2 rounded bg-background-muted" />
        <div className="mt-5 h-10 rounded-lg bg-background-muted" />
      </div>
    </article>
  );
}
