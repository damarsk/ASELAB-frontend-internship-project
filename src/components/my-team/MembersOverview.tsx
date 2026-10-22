import type { ReactNode } from "react";
import { Mail, MoreHorizontal } from "lucide-react";
import UserAvatar from "@/src/components/ui/UserAvatar";
import type { TeamMember } from "./types";

export default function MembersOverview({
  members,
  quota,
  action,
  showMemberActions = true,
}: {
  members: TeamMember[];
  quota?: number;
  action?: ReactNode;
  showMemberActions?: boolean;
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
          <p className="mt-1 text-sm text-text-secondary">
            {members.length}
            {typeof quota === "number" ? `/${quota}` : ""} anggota di tim ini
          </p>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <article
            key={`${member.name}-${member.role}-${member.department ?? ""}`}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <UserAvatar
                name={member.name}
                imageUrl={member.fotoProfilUrl}
                size={48}
                className="rounded-xl"
              />
              {showMemberActions && (
                <button
                  type="button"
                  aria-label={`Opsi untuk ${member.name}`}
                  className="text-text-muted hover:text-text-primary"
                >
                  <MoreHorizontal className="size-5" />
                </button>
              )}
            </div>
            <h3 className="mt-5 font-semibold text-text-primary">
              {member.name}
            </h3>
            {member.department && (
              <p className="mt-1 text-sm text-text-secondary">
                {member.department}
              </p>
            )}
            <p className="mt-1 text-xs font-semibold text-brand-primary">
              {member.role}
            </p>
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-text-muted">
              <Mail className="size-3.5" /> Aktif di tim
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
