import { ShieldCheck } from "lucide-react";

export default function TeamHero({
  memberCount,
  pendingCount,
}: {
  memberCount: number;
  pendingCount: number;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#10251d] px-6 py-8 text-white sm:px-10 sm:py-10">
      <div className="absolute -right-16 -top-20 size-64 rounded-full border-[28px] border-emerald-400/15" />
      <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-emerald-300">
            <ShieldCheck className="size-4" aria-hidden="true" /> Tim kamu
          </p>
          <h1 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Nebula Team
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-emerald-50/70 sm:text-base">
            Bangun solusi terbaik untuk NusaHack 2026 bersama orang-orang dengan
            semangat yang sama.
          </p>
        </div>
        <div className="flex shrink-0 gap-6 text-sm text-emerald-50/70">
          <div>
            <p className="text-2xl font-semibold text-white">{memberCount}/4</p>
            <p>Anggota</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">{pendingCount}</p>
            <p>Request baru</p>
          </div>
        </div>
      </div>
    </section>
  );
}
