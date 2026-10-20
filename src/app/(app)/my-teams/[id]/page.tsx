"use client";

import { use, useEffect, useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import Footer from "@/src/components/landing/Footer";
import JoinRequests from "@/src/components/my-team/JoinRequests";
import MembersOverview from "@/src/components/my-team/MembersOverview";
import TeamHero from "@/src/components/my-team/TeamHero";
import TeamGroupLinks from "@/src/components/my-team/TeamGroupLinks";
import TeamTabs, { type TeamTab } from "@/src/components/my-team/TeamTabs";
import TeamSettings from "@/src/components/my-team/TeamSettings";
import { initialRequests } from "@/src/components/my-team/data";
import type { RequestStatus, TeamMember } from "@/src/components/my-team/types";
import type { BackendTeamDetail } from "@/src/types/team";

type TeamResponse = {
  data?: BackendTeamDetail;
  error?: string;
  message?: string;
};

export default function MyTeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [team, setTeam] = useState<BackendTeamDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TeamTab>("overview");
  const [activeFilter, setActiveFilter] = useState<"all" | RequestStatus>(
    "all",
  );
  const [search, setSearch] = useState("");
  const [requests, setRequests] = useState(initialRequests);
  const [confirmation, setConfirmation] = useState<{
    requestId: number;
    status: RequestStatus;
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadTeam = async () => {
      try {
        const response = await fetch(`/api/teams/${id}`, {
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });
        const result = (await response.json().catch(() => null)) as
          | TeamResponse
          | null;

        if (!response.ok) {
          throw new Error(
            result?.error ?? result?.message ?? "Gagal memuat detail tim.",
          );
        }

        if (!result?.data) {
          throw new Error("Data detail tim tidak tersedia.");
        }

        setTeam(result.data);
      } catch (loadError) {
        if (
          loadError instanceof DOMException &&
          loadError.name === "AbortError"
        ) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Gagal memuat detail tim.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadTeam();

    return () => controller.abort();
  }, [id]);

  const filteredRequests = useMemo(() => {
    const query = search.trim().toLowerCase();
    return requests.filter((request) => {
      const matchesFilter =
        activeFilter === "all" || request.status === activeFilter;
      const matchesSearch =
        !query ||
        `${request.name} ${request.role} ${request.skills.join(" ")}`
          .toLowerCase()
          .includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, requests, search]);

  if (isLoading) {
    return (
      <>
        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
          <p className="rounded-xl border border-border bg-white px-5 py-8 text-center text-sm text-text-secondary">
            Memuat detail tim...
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !team) {
    return (
      <>
        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
          <p
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700"
            role="alert"
          >
            {error ?? "Tim tidak ditemukan."}
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const teamMembers: TeamMember[] = team.members.map((member, index) => {
    const name = member.user.nama;
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    const colors = [
      "bg-emerald-100 text-emerald-700",
      "bg-sky-100 text-sky-700",
      "bg-amber-100 text-amber-700",
      "bg-lime-100 text-lime-700",
    ];

    return {
      name,
      department: member.user.profile?.jurusan ?? undefined,
      role: member.role === "LEADER" ? "Team Leader" : "Anggota Tim",
      initials,
      color: colors[index % colors.length],
    };
  });

  const pendingCount = requests.filter(
    (request) => request.status === "pending",
  ).length;
  const updateRequest = (requestId: number, status: RequestStatus) => {
    setRequests((current) =>
      current.map((request) =>
        request.id === requestId ? { ...request, status } : request,
      ),
    );
  };
  const selectedRequest = confirmation
    ? requests.find((request) => request.id === confirmation.requestId)
    : null;
  const confirmRequestUpdate = () => {
    if (!confirmation) return;
    updateRequest(confirmation.requestId, confirmation.status);
    setConfirmation(null);
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <TeamHero
          name={team.nama}
          event={team.kompetisi}
          skills={team.skillDibutuhkan}
          description={team.deskripsi}
          leaderName={team.leader?.nama}
        >
          <TeamGroupLinks />
        </TeamHero>
        <TeamTabs
          activeTab={activeTab}
          pendingCount={pendingCount}
          onChange={setActiveTab}
        />
        {activeTab === "overview" ? (
          <MembersOverview members={teamMembers} />
        ) : activeTab === "requests" ? (
          <JoinRequests
            requests={filteredRequests}
            search={search}
            activeFilter={activeFilter}
            onSearchChange={setSearch}
            onFilterChange={setActiveFilter}
            onRequestAction={(requestId, status) =>
              setConfirmation({ requestId, status })
            }
          />
        ) : (
          <TeamSettings teamName={team.nama} event={team.kompetisi} />
        )}
      </main>
      {confirmation && selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 px-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setConfirmation(null);
          }}
        >
          <section
            className="w-full max-w-md rounded-2xl border border-border bg-white p-6 text-center shadow-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-confirmation-title"
          >
            <div
              className={`mx-auto flex size-12 items-center justify-center rounded-full ${confirmation.status === "accepted" ? "bg-success-light text-brand-primary" : "bg-danger-light text-red-500"}`}
            >
              {confirmation.status === "accepted" ? (
                <Check className="size-6" />
              ) : (
                <X className="size-6" />
              )}
            </div>
            <h2
              id="request-confirmation-title"
              className="mt-4 text-xl font-bold text-text-primary sm:text-2xl"
            >
              {confirmation.status === "accepted"
                ? "Terima join request?"
                : "Tolak join request?"}
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-text-secondary">
              {confirmation.status === "accepted"
                ? `${selectedRequest.name} akan ditambahkan sebagai ${selectedRequest.role} di tim kamu.`
                : `Apakah kamu yakin ingin menolak permintaan dari ${selectedRequest.name}?`}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfirmation(null)}
                className="rounded-lg border border-border-strong px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-background-muted"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmRequestUpdate}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors ${confirmation.status === "accepted" ? "bg-brand-primary hover:bg-brand-primary-hover" : "bg-red-500 hover:bg-red-600"}`}
              >
                {confirmation.status === "accepted"
                  ? "Terima Request"
                  : "Tolak Request"}
              </button>
            </div>
          </section>
        </div>
      )}
      <Footer />
    </>
  );
}
