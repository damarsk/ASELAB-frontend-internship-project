import { Mail, MoreHorizontal, UserPlus } from "lucide-react";
import type { TeamMember } from "./types";

export default function MembersOverview({
  members,
  onManageRequests,
}: {
  members: TeamMember[];
  onManageRequests: () => void;
}) {
  return (
    <section className="mt-8" aria-labelledby="members-heading">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-brand-primary">Kolaborasi</p>
          <h2
            id="members-heading"
            className="mt-1 text-2xl font-bold text-text-primary"
          >
            Anggota tim
          </h2>
        </div>
        <button
          type="button"
          onClick={onManageRequests}
          className="flex items-center gap-2 self-start rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover sm:self-auto"
        >
          <UserPlus className="size-4" aria-hidden="true" /> Kelola request
        </button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <article
            key={member.name}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex size-12 items-center justify-center rounded-xl text-sm font-bold ${member.color}`}
              >
                {member.initials}
              </div>
              <button
                type="button"
                aria-label={`Opsi untuk ${member.name}`}
                className="text-text-muted hover:text-text-primary"
              >
                <MoreHorizontal className="size-5" />
              </button>
            </div>
            <h3 className="mt-5 font-semibold text-text-primary">
              {member.name}
            </h3>
            <p className="mt-1 text-sm text-text-secondary">{member.role}</p>
            <div className="mt-5 flex items-center gap-2 text-xs text-text-muted">
              <Mail className="size-3.5" /> Aktif di tim
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
