import { ArrowRight, Users } from "lucide-react";
import type { Team } from "@/src/components/dashboard/TeamSection";

export default function TeamCard({ team }: { team: Team }) {
  return (
    <article className="flex min-h-72 flex-col rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-success-light text-2xl">
          👩🏻‍💼
        </div>
        <span className="flex items-center gap-1 pt-1 text-xs text-text-secondary">
          <Users className="size-3.5" aria-hidden="true" />
          2/4 Anggota
        </span>
      </div>
      <h2 className="mt-4 text-lg font-bold text-text-primary">{team.name}</h2>
      <p className="mt-1 text-sm text-text-muted">{team.event}</p>
      <p className="mt-5 text-xs font-medium text-text-secondary">
        Skill Dibutuhkan
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {team.skills.map((item) => (
          <span
            key={item}
            className="rounded-full bg-success-light px-3 py-1 text-xs text-brand-primary"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-5">
        <div className="mb-1 flex justify-between text-xs text-text-secondary">
          <span>Kecocokan</span>
          <span>{team.match}%</span>
        </div>
        <div className="h-1.5 bg-border">
          <div
            className="h-full bg-brand-primary"
            style={{ width: `${team.match}%` }}
          />
        </div>
        <button className="mt-5 flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover">
          Lihat Tim <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
