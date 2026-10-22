"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import Footer from "@/src/components/landing/Footer";
import MembersOverview from "@/src/components/my-team/MembersOverview";
import TabNav, { type TabItem } from "@/src/components/my-team/TabNav";
import TeamHero from "@/src/components/my-team/TeamHero";
import type { JoinRequestStatus } from "@/src/components/my-team/TeamMembershipAction";
import type { TeamMember } from "@/src/components/my-team/types";
import {
  fetchMemberProfiles,
  mapTeamMembers,
} from "@/src/lib/team-members";
import type { BackendTeamDetail } from "@/src/types/team";
import TeamDetailSkeleton from "@/src/components/my-team/TeamDetailSkeleton";

type PublicProfile = {
  fotoProfilUrl?: string | null;
};

type PublicTeamTab = "overview";

const publicTabs: ReadonlyArray<TabItem<PublicTeamTab>> = [
  { id: "overview", label: "Overview" },
];

export default function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [team, setTeam] = useState<BackendTeamDetail | null>(null);
  const [memberProfiles, setMemberProfiles] = useState<Map<number, PublicProfile>>(
    new Map(),
  );
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

        // Enrich members with profile photos (not included in team detail).
        if (teamData) {
          const profileMap = await fetchMemberProfiles(
            teamData.members,
            controller.signal,
          );
          setMemberProfiles(profileMap);
        }

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

  const teamMembers: TeamMember[] = mapTeamMembers(
    team?.members ?? [],
    memberProfiles,
  );

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
              <TabNav
                tabs={publicTabs}
                activeTab="overview"
                onChange={() => {}}
              />
              <MembersOverview
                members={teamMembers}
                quota={team.kuota}
                showMemberActions={false}
              />
            </>
          )
        )}
      </main>
      <Footer />
    </>
  );
}
