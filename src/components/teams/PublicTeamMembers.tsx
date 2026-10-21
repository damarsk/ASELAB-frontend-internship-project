import UserAvatar from "@/src/components/ui/UserAvatar";
import type { TeamMember } from "@/src/components/my-team/types";

export default function PublicTeamMembers({
  members,
}: {
  members: TeamMember[];
}) {
  return (
    <section className="mt-10" aria-labelledby="public-members-heading">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="public-members-heading"
          className="text-xl font-bold text-text-primary sm:text-2xl"
        >
          Anggota Tim
        </h2>
        <span className="text-base font-bold text-text-primary">
          {members.length} Orang
        </span>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {members.map((member) => (
          <article
            key={member.name}
            className="flex items-center gap-4 rounded-2xl border border-border bg-white px-4 py-4 shadow-sm"
          >
            <UserAvatar
              name={member.name}
              imageUrl={member.fotoProfilUrl}
              size={48}
              className="rounded-full"
            />
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-text-primary">
                {member.name}
              </h3>
              <p className="mt-1 text-xs text-text-secondary">
                {member.department ?? member.role}
              </p>
              <p className="mt-1 text-xs font-semibold text-text-primary">
                {member.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
