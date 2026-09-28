"use client";

import { ArrowRight, Search, Users } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export type Team = {
  name: string;
  event: string;
  skills: string[];
  match: number;
};

export default function TeamSection({ teams }: { teams: Team[] }) {
  const [search, setSearch] = useState("");
  const query = search.toLowerCase();
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(query) ||
      team.event.toLowerCase().includes(query) ||
      team.skills.some((skill) => skill.toLowerCase().includes(query)),
  );

  return (
    <section aria-labelledby="teams-heading">
      <form
        className="mx-auto flex w-full items-center gap-3 rounded-full border border-border-strong bg-white px-5 py-2 shadow-sm"
        onSubmit={(event) => event.preventDefault()}
      >
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
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-text-primary outline-none placeholder:text-text-secondary sm:text-base"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover"
        >
          Cari
        </button>
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
            <article
              key={team.name}
              className="flex min-h-85.5 flex-col items-center border border-border bg-white px-4 py-5 transition-shadow hover:shadow-md"
            >
              <div className="flex size-20 items-center justify-center rounded-full bg-background-muted text-4xl">
                👩🏻‍💼
              </div>
              <h3 className="mt-5 text-base font-bold text-text-primary">
                {team.name}
              </h3>
              <p className="mt-5 text-sm text-text-muted">{team.event}</p>
              <p className="mt-2 flex items-center gap-1 text-xs text-text-secondary">
                <Users className="size-3.5" aria-hidden="true" /> 2/4 Anggota
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                Skill Dibutuhkan
              </p>
              <div className="mt-3 flex gap-2">
                {team.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-success-light px-2.5 py-1 text-[11px] text-brand-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 w-full">
                <div className="mb-1 flex justify-between text-[11px] text-text-primary">
                  <span>Kecocokan</span>
                  <span>{team.match}%</span>
                </div>
                <div className="mb-6 h-1.5 w-full bg-border">
                  <div
                    className="h-full bg-brand-primary"
                    style={{ width: `${team.match}%` }}
                  />
                </div>
              </div>
              <button className="mt-auto flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover">
                Lihat Tim <ArrowRight className="size-4" aria-hidden="true" />
              </button>
            </article>
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
