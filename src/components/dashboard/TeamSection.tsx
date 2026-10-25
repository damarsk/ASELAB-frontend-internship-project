"use client";

import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import TeamCard from "@/src/components/teams/TeamCard";
import type { BackendTeam } from "@/src/types/team";

export default function TeamSection({ teams }: { teams: BackendTeam[] }) {
  const [search, setSearch] = useState("");
  const query = search.toLowerCase();
  const filteredTeams = teams.filter(
    (team) =>
      team.nama.toLowerCase().includes(query) ||
      team.kompetisi.toLowerCase().includes(query) ||
      team.skillDibutuhkan.some((skill) => skill.toLowerCase().includes(query)),
  );

  return (
    <section aria-labelledby="teams-heading">
      <form
        className="mx-auto flex w-full items-center gap-3 rounded-2xl border border-border-strong bg-white p-3 shadow-sm"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-border px-4">
          <Search
            className="size-5 shrink-0 text-text-secondary"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari tim berdasarkan skill atau kompetisi..."
            aria-label="Cari tim berdasarkan skill atau kompetisi"
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-text-primary outline-none placeholder:text-text-secondary sm:text-base"
          />
        </div>
      </form>

      <div className="mt-14 flex items-end justify-between gap-4">
        <h2
          id="teams-heading"
          className="text-2xl font-bold text-text-primary sm:text-3xl"
        >
          Siap menemukan tim lomba berikutnya?
        </h2>
        <Link href="/teams">
          <button className="hidden shrink-0 items-center gap-2 text-lg font-semibold text-brand-primary hover:text-brand-primary-hover sm:flex">
            Lihat Semua <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        </Link>
      </div>

      {filteredTeams.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-text-secondary">
          Tim yang kamu cari belum tersedia.
        </p>
      )}
    </section>
  );
}
