import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import type { Team } from "@/src/components/dashboard/TeamSection";
import type { BackendTeam } from "@/src/types/team";

type CardTeam = BackendTeam | Team;

function isBackendTeam(team: CardTeam): team is BackendTeam {
  return "nama" in team;
}

export default function TeamCard({ team }: { team: CardTeam }) {
  const backendTeam = isBackendTeam(team);
  const name = backendTeam ? team.nama : team.name;
  const competition = backendTeam ? team.kompetisi : team.event;
  const skills = backendTeam ? team.skillDibutuhkan : team.skills;
  const description = backendTeam ? team.deskripsi : null;
  const memberCount = backendTeam ? team.members.length : null;
  const capacity = backendTeam ? team.kuota : null;

  return (
    <article className="flex min-h-72 flex-col rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-success-light text-2xl">
          👩🏻‍💼
        </div>
        <span className="flex items-center gap-1 pt-1 text-xs text-text-secondary">
          <Users className="size-3.5" aria-hidden="true" />
          {backendTeam ? `${memberCount}/${capacity} ` : ""}
          Anggota
        </span>
      </div>
      <h2 className="mt-4 text-lg font-bold text-text-primary">{name}</h2>
      <p className="mt-1 text-sm text-text-muted">{competition}</p>
      {description && (
        <p className="mt-3 line-clamp-2 text-sm text-text-secondary">
          {description}
        </p>
      )}
      <p className="mt-5 text-xs font-medium text-text-secondary">
        Skill Dibutuhkan
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((item) => (
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
          <span>0%</span>
        </div>
        <div
          className="h-1.5 bg-border"
          role="progressbar"
          aria-label="Persentase kecocokan"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full bg-brand-primary" style={{ width: "0%" }} />
        </div>
        <Link
          href={`/teams/${team.id}`}
          className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover"
        >
          Lihat Tim <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
