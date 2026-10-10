"use client";

import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import DashHeader from "@/src/components/dashboard/DashHeader";
import Footer from "@/src/components/landing/Footer";
import TeamHero from "@/src/components/my-team/TeamHero";
import PublicTeamMembers from "@/src/components/teams/PublicTeamMembers";
import { members } from "@/src/components/my-team/data";
import { teams } from "@/src/data/teams";

export default function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const team = teams.find((item) => item.id === id);

  if (!team) notFound();

  return (
    <>
      <DashHeader />
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <Link
          href="/teams"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-brand-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke Cari Tim
        </Link>
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
          membershipStatus="request"
        />
        <PublicTeamMembers members={members} />
      </main>
      <Footer />
    </>
  );
}
