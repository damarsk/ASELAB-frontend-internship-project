"use client";

import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";
import DashHeader from "@/src/components/dashboard/DashHeader";
import Footer from "@/src/components/landing/Footer";
import JoinRequests from "@/src/components/my-team/JoinRequests";
import MembersOverview from "@/src/components/my-team/MembersOverview";
import TeamHero from "@/src/components/my-team/TeamHero";
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
        />
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
            onUpdate={updateRequest}
          />
        ) : (
          <TeamSettings teamName={team.name} event={team.event} />
        )}
      </main>
      <Footer />
    </>
  );
}
