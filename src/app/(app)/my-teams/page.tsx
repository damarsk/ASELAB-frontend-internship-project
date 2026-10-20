"use client";

import Link from "next/link";
import { ArrowRight, Clock3, Plus, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "@/src/components/landing/Footer";
import type { BackendTeamSummary } from "@/src/types/team";

type JoinRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

type JoinRequest = {
  id: number;
  teamId: number;
  status: JoinRequestStatus;
  pesan: string | null;
  createdAt: string;
  team: {
    nama: string;
    kompetisi: string;
  };
};

type JoinRequestsResponse = {
  data?: JoinRequest[];
  error?: string;
  message?: string;
};

type TeamsResponse = {
  data?: BackendTeamSummary[];
  error?: string;
  message?: string;
};

const statusLabels: Record<JoinRequestStatus, string> = {
  PENDING: "Pending",
  ACCEPTED: "Diterima",
  REJECTED: "Ditolak",
};

function TeamListSkeleton({ label }: { label: string }) {
  return (
    <section className="mt-8" aria-label={`${label} sedang dimuat`} aria-busy="true">
      <div className="flex items-center justify-between gap-4">
        <div className="h-6 w-44 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="mt-4 space-y-3">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5 sm:flex-row sm:items-center"
          >
            <div className="size-16 shrink-0 animate-pulse rounded-xl bg-slate-200" />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-5 w-2/5 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="flex gap-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
                <div className="h-6 w-14 animate-pulse rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
              <div className="h-10 w-28 animate-pulse rounded-lg bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function JoinRequestListSkeleton() {
  return (
    <div
      className="mt-4 space-y-3"
      aria-label="Join request sedang dimuat"
      aria-busy="true"
    >
      {[1, 2].map((item) => (
        <div
          key={item}
          className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5 sm:flex-row sm:items-center"
        >
          <div className="size-16 shrink-0 animate-pulse rounded-xl bg-slate-200" />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex gap-2">
              <div className="h-5 w-2/5 animate-pulse rounded bg-slate-200" />
              <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200" />
            </div>
            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-3/5 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="h-10 w-28 shrink-0 animate-pulse rounded-lg bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export default function MyTeamPage() {
  const [myTeams, setMyTeams] = useState<BackendTeamSummary[]>([]);
  const [joinedTeams, setJoinedTeams] = useState<BackendTeamSummary[]>([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);
  const [teamsError, setTeamsError] = useState<string | null>(null);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  const [requestsError, setRequestsError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadTeams = async () => {
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

        if (!myTeamsResponse.ok || !joinedTeamsResponse.ok) {
          throw new Error(
            myTeamsResult?.error ??
              myTeamsResult?.message ??
              joinedTeamsResult?.error ??
              joinedTeamsResult?.message ??
              "Gagal memuat daftar tim.",
          );
        }

        setMyTeams(myTeamsResult?.data ?? []);
        setJoinedTeams(joinedTeamsResult?.data ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setTeamsError(
          error instanceof Error ? error.message : "Gagal memuat daftar tim.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingTeams(false);
        }
      }
    };

    const loadJoinRequests = async () => {
      try {
        const response = await fetch("/api/match/requests", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });
        const result = (await response
          .json()
          .catch(() => null)) as JoinRequestsResponse | null;

        if (!response.ok) {
          throw new Error(
            result?.error ?? result?.message ?? "Gagal memuat join request.",
          );
        }

        setJoinRequests(result?.data ?? []);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setRequestsError(
          error instanceof Error ? error.message : "Gagal memuat join request.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingRequests(false);
        }
      }
    };

    void loadTeams();
    void loadJoinRequests();

    return () => controller.abort();
  }, []);

  return (
    <>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Tim Saya
            </h1>
            <p className="mt-2 text-sm text-text-secondary sm:text-base">
              Pilih tim yang ingin kamu kelola dan lanjutkan perjalanan
              kompetisimu.
            </p>
          </div>
          <Link
            href="/my-teams/create"
            className="flex items-center gap-2 self-start rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover sm:self-auto"
          >
            <Plus className="size-4" aria-hidden="true" /> Buat Tim Baru
          </Link>
        </div>
        {teamsError ? (
          <p
            className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
            role="alert"
          >
            {teamsError}
          </p>
        ) : isLoadingTeams ? (
          <>
            <TeamListSkeleton label="Tim yang kamu pimpin" />
            <TeamListSkeleton label="Tim yang kamu ikuti" />
          </>
        ) : myTeams.length > 0 ? (
          <section className="mt-8" aria-labelledby="my-teams-heading">
            <div className="flex items-center justify-between gap-4">
              <h2
                id="my-teams-heading"
                className="text-lg font-semibold text-text-primary"
              >
                Tim yang kamu pimpin
              </h2>
              <span className="text-sm text-text-muted">
                {myTeams.length} tim
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {myTeams.map((team) => (
                <article
                  key={team.id}
                  className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-success-light text-2xl">
                    👩🏻‍💼
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-text-primary">
                      {team.nama}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {team.kompetisi}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {team.skillDibutuhkan.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-success-light px-2.5 py-1 text-[11px] text-brand-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <span className="flex items-center gap-1 text-xs text-text-secondary">
                      <UsersRound className="size-3.5" aria-hidden="true" />
                      {team.jumlahAnggota}/{team.kuota} Anggota
                    </span>
                    <Link
                      href={`/my-teams/${team.id}`}
                      className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover"
                    >
                      Lihat Tim{" "}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-8 flex min-h-85 flex-col items-center justify-center rounded-xl border border-border bg-white px-6 py-12 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-success-light text-brand-primary">
              <UsersRound
                className="size-10"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-text-primary">
              Kamu belum memimpin tim
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-text-secondary">
              Buat tim untuk kompetisi yang ingin kamu ikuti dan temukan anggota
              dengan skill yang dibutuhkan.
            </p>
            <Link
              href="/my-teams/create"
              className="mt-5 flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-hover"
            >
              <Plus className="size-4" aria-hidden="true" /> Buat Tim Baru
            </Link>
            <p className="mt-4 text-xs text-text-muted">
              Tim yang kamu buat atau ikuti akan muncul di sini.
            </p>
          </section>
        )}
        {!isLoadingTeams && !teamsError && (
          <section className="mt-10" aria-labelledby="joined-teams-heading">
            <div className="flex items-center justify-between gap-4">
              <h2
                id="joined-teams-heading"
                className="text-lg font-semibold text-text-primary"
              >
                Tim yang kamu ikuti
              </h2>
              <span className="text-sm text-text-muted">
                {joinedTeams.length} tim
              </span>
            </div>
            {joinedTeams.length > 0 ? (
              <div className="mt-4 space-y-3">
                {joinedTeams.map((team) => (
                  <article
                    key={team.id}
                    className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
                  >
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-2xl">
                      👥
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-text-primary">
                        {team.nama}
                      </h3>
                      <p className="mt-1 text-sm text-text-muted">
                        {team.kompetisi}
                      </p>
                      <p className="mt-2 text-xs text-text-secondary">
                        Ketua: {team.leader?.nama ?? "Belum tersedia"}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <UsersRound className="size-3.5" aria-hidden="true" />
                        {team.jumlahAnggota}/{team.kuota} Anggota
                      </span>
                      <Link
                        href={`/my-teams/${team.id}`}
                        className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover"
                      >
                        Lihat Tim{" "}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed border-border-strong bg-white px-5 py-12 text-center text-sm text-text-secondary">
                Belum mengikuti tim.
              </p>
            )}
          </section>
        )}
        <section className="mt-10" aria-labelledby="team-requests-heading">
          <div className="flex items-center justify-between gap-4">
            <h2
              id="team-requests-heading"
              className="text-lg font-semibold text-text-primary"
            >
              {isLoadingRequests ? (
                <span
                  className="block h-6 w-24 animate-pulse rounded bg-slate-200"
                  aria-hidden="true"
                />
              ) : (
                "Request"
              )}
            </h2>
            {isLoadingRequests ? (
              <span className="h-4 w-20 animate-pulse rounded bg-slate-200" />
            ) : (
              <span className="text-sm text-text-muted">
                {joinRequests.length} request
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-text-secondary" aria-live="polite">
            {isLoadingRequests ? (
              <span
                className="block h-5 w-80 max-w-full animate-pulse rounded bg-slate-200"
                aria-hidden="true"
              />
            ) : (
              "Pantau permintaan bergabung ke tim yang kamu pilih."
            )}
          </p>
          {requestsError ? (
            <p
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
              role="alert"
            >
              {requestsError}
            </p>
          ) : isLoadingRequests ? (
            <JoinRequestListSkeleton />
          ) : joinRequests.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-border-strong bg-white px-5 py-12 text-center text-sm text-text-secondary">
              Belum ada permintaan bergabung ke tim.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {joinRequests.map((request) => (
                <article
                  key={request.id}
                  className="flex flex-col gap-5 rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md sm:flex-row sm:items-center"
                >
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-success-light text-2xl">
                    👩🏻‍💼
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-text-primary">
                        {request.team.nama}
                      </h3>
                      <span
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          request.status === "PENDING"
                            ? "bg-warning-light text-amber-700"
                            : request.status === "ACCEPTED"
                              ? "bg-success-light text-brand-primary"
                              : "bg-red-50 text-red-700"
                        }`}
                      >
                        {request.status === "PENDING" && (
                          <Clock3 className="size-3" aria-hidden="true" />
                        )}
                        {statusLabels[request.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-text-muted">
                      {request.team.kompetisi}
                    </p>
                    {request.pesan && (
                      <p className="mt-3 line-clamp-2 text-xs text-text-secondary">
                        “{request.pesan}”
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <Link
                      href={`/teams/${request.teamId}`}
                      className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover"
                    >
                      Lihat Tim{" "}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
