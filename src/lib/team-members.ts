import type { BackendTeamDetail } from "@/src/types/team";
import type { TeamMember } from "@/src/components/my-team/types";

export const memberColors = [
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-amber-100 text-amber-700",
  "bg-lime-100 text-lime-700",
];

export type PublicProfile = {
  fotoProfilUrl?: string | null;
};

/**
 * Fetch public profiles for team members to enrich them with `fotoProfilUrl`,
 * which the team detail endpoint does not include.
 */
export async function fetchMemberProfiles(
  members: BackendTeamDetail["members"],
  signal?: AbortSignal,
): Promise<Map<number, PublicProfile>> {
  const profileMap = new Map<number, PublicProfile>();
  await Promise.all(
    members.map(async (member) => {
      if (!member.userId) return;
      try {
        const res = await fetch(`/api/auth/profile/${member.userId}`, {
          credentials: "include",
          cache: "no-store",
          signal,
        });
        if (!res.ok) return;
        const payload = (await res.json().catch(() => null)) as {
          data?: { profile?: { fotoProfilUrl?: string | null } | null };
        } | null;
        profileMap.set(member.userId, {
          fotoProfilUrl: payload?.data?.profile?.fotoProfilUrl ?? null,
        });
      } catch {
        // ignore — leave without photo
      }
    }),
  );
  return profileMap;
}

export function mapTeamMembers(
  members: BackendTeamDetail["members"],
  profileMap: Map<number, PublicProfile>,
): TeamMember[] {
  return members.map((member, index) => {
    const name = member.user.nama;
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return {
      userId: member.userId,
      name,
      department: member.user.profile?.jurusan ?? undefined,
      role: member.role === "LEADER" ? "Team Leader" : "Anggota Tim",
      initials,
      color: memberColors[index % memberColors.length],
      fotoProfilUrl:
        profileMap.get(member.userId)?.fotoProfilUrl ??
        member.user.profile?.fotoProfilUrl ??
        null,
    };
  });
}
