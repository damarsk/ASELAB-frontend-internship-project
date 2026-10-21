"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import Footer from "@/src/components/landing/Footer";
import TeamHero from "@/src/components/my-team/TeamHero";
import type { JoinRequestStatus } from "@/src/components/my-team/TeamMembershipAction";
import PublicTeamMembers from "@/src/components/teams/PublicTeamMembers";
import type { BackendTeamDetail } from "@/src/types/team";
import TeamDetailSkeleton from "@/src/components/my-team/TeamDetailSkeleton";

export default function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [team, setTeam] = useState<BackendTeamDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState<
    "joined" | "request"
  >("request");
  const [requestStatus, setRequestStatus] = useState<JoinRequestStatus | null>(
    null,
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadTeamData = async () => {
      try {
        const [teamResponse, profileResponse, requestsResponse] =
          await Promise.all([
            fetch(`/api/teams/${id}`, {
              credentials: "include",
              cache: "no-store",
              signal: controller.signal,
            }),
            fetch("/api/auth/profile", {
              credentials: "include",
              cache: "no-store",
              signal: controller.signal,
            }).catch(() => null),
            fetch("/api/match/requests", {
              credentials: "include",
              cache: "no-store",
              signal: controller.signal,
            }).catch(() => null),
          ]);

        if (!teamResponse.ok) throw new Error("Gagal memuat detail tim");

        const payload: { data?: BackendTeamDetail } = await teamResponse.json();
        const teamData = payload.data ?? null;
        setTeam(teamData);

        const profilePayload = profileResponse?.ok
          ? await profileResponse.json().catch(() => null)
          : null;
        const currentUserId =
          profilePayload?.data?.id ?? profilePayload?.data?.userId;

        const requestsPayload = requestsResponse?.ok
          ? await requestsResponse.json().catch(() => null)
          : null;
        const myRequests: Array<{ teamId: number; status: JoinRequestStatus }> =
          Array.isArray(requestsPayload?.data) ? requestsPayload.data : [];

        if (teamData) {
          const isMemberOrLeader =
            typeof currentUserId === "number" &&
            (teamData.leaderId === currentUserId ||
              teamData.members.some(
                (member) => member.userId === currentUserId,
              ));

          const existingRequest = myRequests.find(
            (req) => req.teamId === Number(id),
          );

          if (isMemberOrLeader || existingRequest?.status === "ACCEPTED") {
            setMembershipStatus("joined");
          } else {
            setMembershipStatus("request");
            setRequestStatus(existingRequest?.status ?? null);
          }
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setTeam(null);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    void loadTeamData();
    return () => controller.abort();
  }, [id]);

  if (!loading && !team) notFound();

  const handleRequestSuccess = () => {
    setRequestStatus("PENDING");
    setToastMessage("Permintaan bergabung berhasil dikirim ke Team Leader!");
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <Link
          href="/teams"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-brand-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke Cari Tim
        </Link>

        {toastMessage && (
          <div
            role="status"
            className="mb-5 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
          >
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-emerald-700 hover:text-emerald-900"
              aria-label="Tutup notifikasi"
            >
              &times;
            </button>
          </div>
        )}

        {loading ? (
          <TeamDetailSkeleton />
        ) : (
          team && (
            <>
              <TeamHero
                teamId={Number(id)}
                name={team.nama}
                event={team.kompetisi}
                description={team.deskripsi}
                leaderName={
                  team.members.find(
                    (member) =>
                      member.role === "LEADER" ||
                      member.userId === team.leaderId,
                  )?.user.nama ?? team.leader?.nama
                }
                skills={team.skillDibutuhkan}
                membershipStatus={membershipStatus}
                initialRequestStatus={requestStatus}
                onRequestSuccess={handleRequestSuccess}
              />
              <PublicTeamMembers
                members={team.members.map((member) => ({
                  name: member.user.nama,
                  department: member.user.profile?.jurusan ?? undefined,
                  role:
                    member.role === "LEADER" ? "Team Leader" : "Anggota Tim",
                  initials: member.user.nama
                    .split(/\s+/)
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase(),
                  color: "bg-sky-100 text-sky-700",
                  fotoProfilUrl: member.user.profile?.fotoProfilUrl ?? null,
                }))}
              />
            </>
          )
        )}
      </main>
      <Footer />
    </>
  );
}
