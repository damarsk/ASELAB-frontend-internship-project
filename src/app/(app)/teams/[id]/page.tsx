"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import Footer from "@/src/components/landing/Footer";
import TeamHero from "@/src/components/my-team/TeamHero";
import PublicTeamMembers from "@/src/components/teams/PublicTeamMembers";
import type { BackendTeam } from "@/src/types/team";

export default function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [team, setTeam] = useState<BackendTeam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadTeam = async () => {
      try {
        const response = await fetch("/api/teams", {
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Gagal memuat detail tim");

        const payload: { data?: BackendTeam[] } = await response.json();
        setTeam(payload.data?.find((item) => String(item.id) === id) ?? null);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setTeam(null);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    void loadTeam();
    return () => controller.abort();
  }, [id]);

  if (!loading && !team) notFound();

  return (
    <>
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <Link
          href="/teams"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-brand-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke Cari Tim
        </Link>
        {loading ? (
          <p className="py-16 text-center text-text-secondary">
            Memuat detail tim...
          </p>
        ) : (
          team && (
            <>
              <TeamHero
                name={team.nama}
                event={team.kompetisi}
                description={team.deskripsi}
                leaderName={team.leader?.nama}
                skills={team.skillDibutuhkan}
                membershipStatus="request"
              />
              <PublicTeamMembers
                members={team.members.map((member) => ({
                  name: `Anggota #${member.id}`,
                  role: "Anggota Tim",
                  initials: String(member.id).slice(-2),
                  color: "bg-sky-100 text-sky-700",
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
