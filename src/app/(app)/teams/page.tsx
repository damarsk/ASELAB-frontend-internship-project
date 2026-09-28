"use client";

import { ArrowLeft, ArrowRight, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import DashHeader from "@/src/components/dashboard/DashHeader";
import Footer from "@/src/components/landing/Footer";
import { teams } from "@/src/data/teams";

const teamsPerPage = 6;

export default function TeamsPage() {
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("all");
  const [page, setPage] = useState(1);

  const skills = useMemo(
    () => Array.from(new Set(teams.flatMap((team) => team.skills))).sort(),
    [],
  );

  const filteredTeams = useMemo(() => {
    const query = search.trim().toLowerCase();

    return teams.filter((team) => {
      const matchesSearch =
        !query ||
        team.name.toLowerCase().includes(query) ||
        team.event.toLowerCase().includes(query) ||
        team.skills.some((teamSkill) =>
          teamSkill.toLowerCase().includes(query),
        );
      const matchesSkill = skill === "all" || team.skills.includes(skill);

      return matchesSearch && matchesSkill;
    });
  }, [search, skill]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTeams.length / teamsPerPage),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleTeams = filteredTeams.slice(
    (currentPage - 1) * teamsPerPage,
    currentPage * teamsPerPage,
  );

  return (
    <>
      <DashHeader />
      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">
              Temukan partner lomba
            </p>
            <h1 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
              Explore Tim
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-text-secondary sm:text-base">
              Cari tim yang sedang membuka kesempatan untuk anggota baru.
            </p>
          </div>
          <p className="text-sm text-text-secondary">
            {filteredTeams.length} tim tersedia
          </p>
        </div>

        <form
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-border-strong bg-white p-3 shadow-sm sm:flex-row"
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
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Cari tim, kompetisi, atau skill..."
              aria-label="Cari tim, kompetisi, atau skill"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-text-primary outline-none placeholder:text-text-secondary"
            />
          </div>
          <label className="flex items-center rounded-xl border border-border px-4 sm:w-56">
            <span className="sr-only">Filter berdasarkan skill</span>
            <select
              value={skill}
              onChange={(event) => {
                setSkill(event.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent py-3 text-sm text-text-primary outline-none"
              aria-label="Filter berdasarkan skill"
            >
              <option value="all">Semua skill</option>
              {skills.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
          >
            Cari
          </button>
        </form>

        {visibleTeams.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTeams.map((team) => (
              <article
                key={team.name}
                className="flex min-h-72 flex-col rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-success-light text-2xl">
                    👩🏻‍💼
                  </div>
                  <span className="flex items-center gap-1 pt-1 text-xs text-text-secondary">
                    <Users className="size-3.5" aria-hidden="true" />
                    2/4 Anggota
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-bold text-text-primary">
                  {team.name}
                </h2>
                <p className="mt-1 text-sm text-text-muted">{team.event}</p>
                <p className="mt-5 text-xs font-medium text-text-secondary">
                  Skill Dibutuhkan
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {team.skills.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-success-light px-3 py-1 text-xs text-brand-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-5">
                  <div className="mb-1 flex justify-between text-xs text-text-secondary">
                    <span>Kecocokan</span>
                    <span>{team.match}%</span>
                  </div>
                  <div className="h-1.5 bg-border">
                    <div
                      className="h-full bg-brand-primary"
                      style={{ width: `${team.match}%` }}
                    />
                  </div>
                  <button className="mt-5 flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover">
                    Lihat Tim{" "}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-text-secondary">
            Tim yang kamu cari belum tersedia.
          </p>
        )}

        {totalPages > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-2"
            aria-label="Pagination tim"
          >
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="flex size-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary disabled:opacity-40"
              aria-label="Halaman sebelumnya"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                  className={`size-10 rounded-lg text-sm font-medium transition-colors ${
                    pageNumber === currentPage
                      ? "bg-brand-primary text-white"
                      : "border border-border text-text-secondary hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {pageNumber}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={currentPage === totalPages}
              className="flex size-10 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary disabled:opacity-40"
              aria-label="Halaman berikutnya"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </nav>
        )}
      </main>
      <Footer />
    </>
  );
}
