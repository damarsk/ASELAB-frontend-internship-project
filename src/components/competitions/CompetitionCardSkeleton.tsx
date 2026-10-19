export default function CompetitionCardSkeleton() {
  return (
    <article
      className="flex min-h-72 animate-pulse flex-col rounded-xl border border-border bg-white px-4 py-5 text-center sm:px-5"
      aria-hidden="true"
    >
      <div className="mx-auto h-28 w-full max-w-48 bg-background-muted sm:h-32" />
      <div className="mx-auto mt-5 h-10 w-3/4 rounded bg-background-muted" />
      <div className="mx-auto mt-2 h-10 w-5/6 rounded bg-background-muted" />
      <div className="mx-auto mt-3 h-3 w-20 rounded bg-background-muted" />
      <div className="mx-auto mt-1 h-8 w-28 rounded bg-background-muted" />
      <div className="mx-auto mt-1 h-3 w-32 rounded bg-background-muted" />
      <div className="mx-auto mt-3 h-7 w-32 rounded-md bg-background-muted" />
    </article>
  );
}
