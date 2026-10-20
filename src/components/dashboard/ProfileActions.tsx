import { ArrowRight, Check, Plus, UserRound, UsersRound, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { BackendTeamSummary } from "@/src/types/team";

type Profile = Record<string, unknown>;

type ProfileActionsProps = {
  profile: Profile | null;
  loading: boolean;
};

type TeamsResponse = {
  data?: BackendTeamSummary[];
  error?: string;
  message?: string;
};

function isFallbackProfileImage(value: string) {
  const path = value.split(/[?#]/, 1)[0];
  return path === "unknown.jpg" || path.endsWith("/unknown.jpg");
}

function hasProfileValue(profile: Profile | null, key: string) {
  if (!profile) return false;

  const profileData =
    profile.profile && typeof profile.profile === "object"
      ? (profile.profile as Profile)
      : null;
  const value = profile[key] ?? profileData?.[key];

  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    return (
      trimmedValue.length > 0 &&
      (key !== "fotoProfilUrl" || !isFallbackProfileImage(trimmedValue))
    );
  }
  return Boolean(value);
}

export default function ProfileActions({
  profile,
  loading,
}: ProfileActionsProps) {
  const [userTeams, setUserTeams] = useState<BackendTeamSummary[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [isStoredComplete, setIsStoredComplete] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("partnerin_profile_complete");
      if (cached !== null) {
        setIsStoredComplete(cached === "true");
      }
    } catch {
      // sessionStorage may not be available in private mode
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUserTeams = async () => {
      try {
        const [myTeamsResponse, joinedTeamsResponse] = await Promise.all([
          fetch("/api/teams/my-teams", {
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          }),
          fetch("/api/teams/joined-teams", {
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          }),
        ]);

        const [myTeamsResult, joinedTeamsResult] = (await Promise.all(
          [myTeamsResponse, joinedTeamsResponse].map((response) =>
            response.json().catch(() => null),
          ),
        )) as [TeamsResponse | null, TeamsResponse | null];

        const myTeamsList: BackendTeamSummary[] = (myTeamsResult?.data ?? []).map(
          (team) => ({
            ...team,
            peranSaya: team.peranSaya ?? "LEADER",
          }),
        );
        const joinedTeamsList: BackendTeamSummary[] = (
          joinedTeamsResult?.data ?? []
        ).map((team) => ({
          ...team,
          peranSaya: team.peranSaya ?? "MEMBER",
        }));

        const teamMap = new Map<number, BackendTeamSummary>();
        for (const team of myTeamsList) {
          teamMap.set(team.id, team);
        }
        for (const team of joinedTeamsList) {
          if (!teamMap.has(team.id)) {
            teamMap.set(team.id, team);
          }
        }

        setUserTeams(Array.from(teamMap.values()));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setUserTeams([]);
      } finally {
        if (!controller.signal.aborted) {
          setTeamsLoading(false);
        }
      }
    };

    void fetchUserTeams();
    return () => controller.abort();
  }, []);

  const profileFields = [
    hasProfileValue(profile, "nama"),
    hasProfileValue(profile, "jurusan"),
    hasProfileValue(profile, "skill"),
    hasProfileValue(profile, "minat"),
    hasProfileValue(profile, "tentang"),
    hasProfileValue(profile, "pengalamanLomba"),
    hasProfileValue(profile, "fotoProfilUrl"),
    hasProfileValue(profile, "cvPath"),
  ];
  const completedProfileFields = profileFields.filter(Boolean).length;
  const completion = Math.round(
    (completedProfileFields / profileFields.length) * 100,
  );
  const isProfileComplete = !loading && completion >= 100;

  useEffect(() => {
    if (!loading && profile) {
      const complete = completion >= 100;
      try {
        sessionStorage.setItem("partnerin_profile_complete", String(complete));
      } catch {
        // ignore storage errors
      }
      setIsStoredComplete(complete);
    }
  }, [loading, profile, completion]);

  if (loading) {
    const isFullWidth = isStoredComplete ?? false;
    return <ProfileActionsSkeleton isFullWidth={isFullWidth} />;
  }

  const checklist = [
    {
      label: "Informasi dasar terisi",
      complete:
        hasProfileValue(profile, "nama") && hasProfileValue(profile, "jurusan"),
    },
    {
      label: "Tentang kamu terisi",
      complete: hasProfileValue(profile, "tentang"),
    },
    {
      label: "Skill, minat, dan pengalaman tercatat",
      complete:
        hasProfileValue(profile, "skill") &&
        hasProfileValue(profile, "minat") &&
        hasProfileValue(profile, "pengalamanLomba"),
    },
    {
      label: "Foto profil dan CV terpasang",
      complete:
        hasProfileValue(profile, "fotoProfilUrl") &&
        hasProfileValue(profile, "cvPath"),
    },
  ];

  return (
    <section
      className={`mx-auto pt-10 lg:pt-14 ${
        isProfileComplete
          ? "w-full"
          : "grid max-w-7xl gap-8 lg:grid-cols-2"
      }`}
    >
      <article className="w-full rounded-xl border border-brand-primary-muted bg-brand-primary-light/50 px-8 py-7 sm:px-10">
        <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-white shadow-xs">
              <UsersRound className="size-6 text-black" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-text-primary">
                Tim Saya
              </h2>
              <p className="text-base text-text-secondary">
                Status Partisipasi Kompetisi
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/my-teams/create"
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-primary-hover"
            >
              <Plus className="size-3.5" aria-hidden="true" />
              Buat Tim Baru
            </Link>
            {userTeams.length > 0 && (
              <Link
                href="/my-teams"
                className="inline-flex items-center gap-1 rounded-md border border-brand-primary bg-white px-3 py-1.5 text-xs font-medium text-brand-primary transition-colors hover:bg-brand-primary-light"
              >
                Lihat Semua ({userTeams.length})
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>

        {teamsLoading ? (
          <div
            className={`mt-5 grid gap-4 ${
              isProfileComplete ? "sm:grid-cols-2" : "grid-cols-1"
            }`}
            aria-busy="true"
            aria-label="Memuat tim saya"
          >
            <div className="flex animate-pulse items-center gap-4 rounded-xl border border-border bg-white p-4">
              <div className="size-14 shrink-0 rounded-xl bg-slate-200" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-3 w-44 rounded bg-slate-200" />
                <div className="flex gap-1.5 pt-1">
                  <div className="h-4 w-12 rounded-full bg-slate-200" />
                  <div className="h-4 w-14 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="h-7 w-20 shrink-0 rounded-lg bg-slate-200" />
            </div>
            {isProfileComplete && (
              <div className="flex animate-pulse items-center gap-4 rounded-xl border border-border bg-white p-4">
                <div className="size-14 shrink-0 rounded-xl bg-slate-200" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="h-3 w-44 rounded bg-slate-200" />
                  <div className="flex gap-1.5 pt-1">
                    <div className="h-4 w-12 rounded-full bg-slate-200" />
                    <div className="h-4 w-14 rounded-full bg-slate-200" />
                  </div>
                </div>
                <div className="h-7 w-20 shrink-0 rounded-lg bg-slate-200" />
              </div>
            )}
          </div>
        ) : userTeams.length > 0 ? (
          <div className="mt-5 space-y-3">
            <div
              className={`grid gap-4 ${
                isProfileComplete && userTeams.length > 1
                  ? "sm:grid-cols-2"
                  : "grid-cols-1"
              }`}
            >
              {userTeams
                .slice(0, isProfileComplete ? 4 : 2)
                .map((team) => (
                  <article
                    key={team.id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-white p-4 text-left transition-shadow hover:shadow-md sm:flex-row sm:items-center"
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xl font-extrabold uppercase text-cyan-400 shadow-inner select-none">
                        {team.nama.trim().charAt(0).toUpperCase() || "T"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="truncate text-base font-bold text-text-primary">
                            {team.nama}
                          </h3>
                          {team.peranSaya === "LEADER" ? (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                              Ketua
                            </span>
                          ) : (
                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-800">
                              Anggota
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 truncate text-xs text-text-muted">
                          {team.kompetisi}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {team.skillDibutuhkan?.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-success-light px-2 py-0.5 text-[10px] font-medium text-brand-primary"
                            >
                              {skill}
                            </span>
                          ))}
                          {team.skillDibutuhkan &&
                            team.skillDibutuhkan.length > 3 && (
                              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] text-text-muted">
                                +{team.skillDibutuhkan.length - 3}
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border/50 pt-2 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <UsersRound className="size-3.5" aria-hidden="true" />
                        {team.jumlahAnggota ?? team.members?.length ?? 1}/
                        {team.kuota} Anggota
                      </span>
                      <Link
                        href={`/my-teams/${team.id}`}
                        className="flex items-center gap-1.5 rounded-lg bg-brand-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-primary-hover"
                      >
                        Lihat Tim <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
            </div>
            {userTeams.length > (isProfileComplete ? 4 : 2) && (
              <div className="mt-3 flex justify-end">
                <Link
                  href="/my-teams"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-primary-hover"
                >
                  Lihat {userTeams.length - (isProfileComplete ? 4 : 2)} tim
                  lainnya
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="mt-5 flex min-h-37.5 flex-col items-center justify-center rounded-lg bg-brand-primary-muted/40 px-4 py-8">
              <UserRound className="size-9 text-text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold text-text-primary">
                Mulai Perjalanan Kemenanganmu!
              </h3>
              <p className="mt-2 max-w-md text-xs leading-4 text-text-primary">
                Belum punya tim untuk kompetisi terdekat? Buat timmu sendiri dan
                rekrut talenta terbaik kampus!
              </p>
            </div>
            <Link
              href="/my-teams/create"
              className="mt-6 inline-flex items-center rounded-md bg-brand-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-primary-hover"
            >
              + Buat Tim Baru
            </Link>
          </div>
        )}
      </article>

      {!isProfileComplete && (
        <article className="rounded-xl border border-brand-primary-muted bg-brand-primary-light/50 px-8 py-7 sm:px-10">
          <h2 className="text-2xl font-semibold text-text-primary">
            Lengkapi Profil
          </h2>
          <p className="mt-4 text-xs text-text-primary">
            Profil lengkap meningkatkan peluangmu diajak bergabung hingga 3x
            lipat!
          </p>
          <div className="mt-6 flex items-center justify-between text-[10px] text-text-primary">
            <span>Kelengkapan Data</span>
            <span>{`${completion}%`}</span>
          </div>
          <div className="mt-1 h-1.5 w-full bg-white">
            <div
              className="h-full bg-brand-primary transition-[width]"
              style={{ width: `${completion}%` }}
            />
          </div>
          <ul className="mt-7 space-y-3 text-xs text-text-primary">
            {checklist.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                {item.complete ? (
                  <Check
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <X className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                )}
                <span>
                  {item.complete
                    ? item.label
                    : `Belum ${item.label.toLowerCase()}`}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex justify-center">
            <Link
              href="/profile"
              className="inline-flex items-center gap-1 rounded-md bg-brand-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-primary-hover"
            >
              Lengkapi Sekarang{" "}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </article>
      )}
    </section>
  );
}

function ProfileActionsSkeleton({ isFullWidth }: { isFullWidth: boolean }) {
  return (
    <section
      className={`mx-auto pt-10 lg:pt-14 ${
        isFullWidth
          ? "w-full"
          : "grid max-w-7xl gap-8 lg:grid-cols-2"
      }`}
      aria-label="Memuat data profil dan tim"
      aria-busy="true"
    >
      <article className="w-full rounded-xl border border-brand-primary-muted bg-brand-primary-light/50 px-8 py-7 sm:px-10">
        <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 animate-pulse rounded-md bg-white shadow-xs" />
            <div className="space-y-2">
              <div className="h-6 w-28 animate-pulse rounded-md bg-brand-primary-muted/60" />
              <div className="h-4 w-44 animate-pulse rounded-md bg-brand-primary-muted/40" />
            </div>
          </div>
          <div className="h-7 w-28 animate-pulse rounded-md bg-brand-primary/20" />
        </div>

        <div
          className={`mt-5 grid gap-4 ${
            isFullWidth ? "sm:grid-cols-2" : "grid-cols-1"
          }`}
        >
          <div className="flex animate-pulse items-center gap-4 rounded-xl border border-border bg-white p-4">
            <div className="size-14 shrink-0 rounded-xl bg-slate-200" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-3 w-44 rounded bg-slate-200" />
              <div className="flex gap-1.5 pt-1">
                <div className="h-4 w-12 rounded-full bg-slate-200" />
                <div className="h-4 w-14 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="h-7 w-20 shrink-0 rounded-lg bg-slate-200" />
          </div>
          {isFullWidth && (
            <div className="flex animate-pulse items-center gap-4 rounded-xl border border-border bg-white p-4">
              <div className="size-14 shrink-0 rounded-xl bg-slate-200" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-3 w-44 rounded bg-slate-200" />
                <div className="flex gap-1.5 pt-1">
                  <div className="h-4 w-12 rounded-full bg-slate-200" />
                  <div className="h-4 w-14 rounded-full bg-slate-200" />
                </div>
              </div>
              <div className="h-7 w-20 shrink-0 rounded-lg bg-slate-200" />
            </div>
          )}
        </div>
      </article>

      {!isFullWidth && (
        <article className="rounded-xl border border-brand-primary-muted bg-brand-primary-light/50 px-8 py-7 sm:px-10">
          <div className="h-7 w-36 animate-pulse rounded-md bg-brand-primary-muted/60" />
          <div className="mt-4 h-3.5 w-64 animate-pulse rounded-md bg-brand-primary-muted/40" />
          <div className="mt-6 flex items-center justify-between">
            <div className="h-3 w-20 animate-pulse rounded-md bg-brand-primary-muted/50" />
            <div className="h-3 w-8 animate-pulse rounded-md bg-brand-primary-muted/50" />
          </div>
          <div className="mt-1 h-1.5 w-full rounded bg-white">
            <div className="h-full w-1/2 animate-pulse bg-brand-primary/40" />
          </div>
          <ul className="mt-7 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="size-4 shrink-0 animate-pulse rounded-md bg-brand-primary-muted/50" />
                <div className="h-3.5 w-48 animate-pulse rounded-md bg-brand-primary-muted/40" />
              </li>
            ))}
          </ul>
          <div className="mt-9 flex justify-center">
            <div className="h-8 w-36 animate-pulse rounded-md bg-brand-primary/30" />
          </div>
        </article>
      )}
    </section>
  );
}

