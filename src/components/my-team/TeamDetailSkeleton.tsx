export default function TeamDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1 space-y-4">
            <div className="h-6 w-32 rounded-full bg-slate-200" />
            <div className="h-9 w-2/3 rounded-lg bg-slate-200 sm:h-10" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
              <div className="h-4 w-3/4 rounded bg-slate-200" />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-7 w-20 rounded-full bg-slate-200" />
              ))}
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="size-10 rounded-full bg-slate-200" />
              <div className="space-y-2">
                <div className="h-3 w-20 rounded bg-slate-200" />
                <div className="h-4 w-32 rounded bg-slate-200" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:w-64">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="h-11 w-full rounded-lg bg-slate-200" />
            <div className="h-11 w-full rounded-lg bg-slate-200" />
          </div>
        </div>
      </section>

      <div className="mt-8 flex gap-2 border-b border-border">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="px-4 py-3">
            <div className="h-5 w-24 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-6 w-40 rounded bg-slate-200" />
          <div className="h-9 w-28 rounded-lg bg-slate-200" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-3 w-1/2 rounded bg-slate-200" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-slate-200" />
                <div className="h-3 w-2/3 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
