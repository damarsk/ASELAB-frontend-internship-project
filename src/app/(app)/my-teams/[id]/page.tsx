"use client";

import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import DashHeader from "@/src/components/dashboard/DashHeader";
import Footer from "@/src/components/landing/Footer";
import JoinRequests from "@/src/components/my-team/JoinRequests";
import MembersOverview from "@/src/components/my-team/MembersOverview";
import TeamHero from "@/src/components/my-team/TeamHero";
import TeamGroupLinks from "@/src/components/my-team/TeamGroupLinks";
import TeamTabs, { type TeamTab } from "@/src/components/my-team/TeamTabs";
import TeamSettings from "@/src/components/my-team/TeamSettings";
import { initialRequests, members } from "@/src/components/my-team/data";
import type { RequestStatus } from "@/src/components/my-team/types";
import { teams } from "@/src/data/teams";

export default function MyTeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const team = teams.find((item) => item.id === id);
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

  if (!team) notFound();

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
      <DashHeader />
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <TeamHero
          name={team.name}
          event={team.event}
          skills={[
            "UI/UX",
            "Front-End",
            "System Analyst",
            "Back-End",
            "Quality Assurance",
          ]}
        >
          <TeamGroupLinks />
        </TeamHero>
        <TeamTabs
          activeTab={activeTab}
          pendingCount={pendingCount}
          onChange={setActiveTab}
        />
        {activeTab === "overview" ? (
          <MembersOverview members={members} />
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
          <TeamSettings teamName={team.name} event={team.event} />
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
