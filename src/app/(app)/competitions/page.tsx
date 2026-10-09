"use client";

import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import DashHeader from "@/src/components/dashboard/DashHeader";
import CompetitionPlaceholder from "@/src/components/competitions/CompetitionPlaceholder";
import Footer from "@/src/components/landing/Footer";
import { competitions } from "@/src/data/competitions";

const competitionsPerPage = 6;

function CompetitionCard({
  competition,
}: {
  competition: (typeof competitions)[number];
}) {
  return (
    <article className="flex min-h-112 flex-col border border-border bg-white px-6 py-6 text-center transition-shadow hover:shadow-md">
      <CompetitionPlaceholder />
      <h2 className="mt-6 min-h-12 text-base font-bold leading-6 text-text-primary">
        {competition.name}
      </h2>
      <p className="mt-3 min-h-10 text-xs leading-4 text-text-secondary">
        Kategori {competition.category}, {competition.detail}
      </p>
      <p className="mt-4 text-[11px] text-text-secondary">Total Hadiah</p>
      <p className="mt-1 text-2xl font-medium text-text-secondary">
        {competition.prize}
      </p>
      <p className="mt-2 text-xs text-text-muted">
        Deadline: {competition.deadline}
      </p>
      <button
        type="button"
        className="mx-auto mt-auto inline-flex items-center gap-1 rounded-md bg-brand-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-primary-hover"
      >
        Daftar Kompetisi <ArrowRight className="size-3.5" aria-hidden="true" />
      </button>
    </article>
  );
}

export default function CompetitionsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => Array.from(new Set(competitions.map((item) => item.category))).sort(),
    [],
  );

  const filteredCompetitions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return competitions.filter((competition) => {
      const searchableText =
        `${competition.name} ${competition.category} ${competition.detail}`.toLowerCase();
      return (
        (!query || searchableText.includes(query)) &&
        (category === "all" || competition.category === category)
      );
    });
  }, [category, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCompetitions.length / competitionsPerPage),
  );
  const currentPage = Math.min(page, totalPages);
  const visibleCompetitions = filteredCompetitions.slice(
    (currentPage - 1) * competitionsPerPage,
    currentPage * competitionsPerPage,
  );

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateCategory = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  return (
    <>
      <DashHeader />
      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:py-14">
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">
              Temukan peluangmu
            </p>
            <h1 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
              Explore Competition
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-text-secondary sm:text-base">
              Temukan kompetisi yang sesuai dengan skill dan minatmu.
            </p>
          </div>
          <p className="text-sm text-text-secondary">
            {filteredCompetitions.length} kompetisi tersedia
          </p>
        </section>

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
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Cari kompetisi..."
              aria-label="Cari kompetisi"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-text-primary outline-none placeholder:text-text-secondary"
            />
          </div>
          <label className="flex items-center rounded-xl border border-border px-4 sm:w-72">
            <SlidersHorizontal
              className="mr-2 size-4 shrink-0 text-text-secondary"
              aria-hidden="true"
            />
            <span className="sr-only">Filter berdasarkan kategori</span>
            <select
              value={category}
              onChange={(event) => updateCategory(event.target.value)}
              className="w-full bg-transparent py-3 text-sm text-text-primary outline-none"
              aria-label="Filter berdasarkan kategori"
            >
              <option value="all">Semua kategori</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </form>

        {visibleCompetitions.length > 0 ? (
          <section className="mt-10" aria-labelledby="competition-list-heading">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2
                id="competition-list-heading"
                className="text-xl font-bold text-text-primary"
              >
                Semua Kompetisi
              </h2>
              <span className="text-sm text-text-muted">
                Halaman {currentPage} dari {totalPages}
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleCompetitions.map((competition) => (
                <CompetitionCard
                  key={competition.id}
                  competition={competition}
                />
              ))}
            </div>
          </section>
        ) : (
          <p className="mt-16 text-center text-text-secondary">
            Kompetisi yang kamu cari belum tersedia.
          </p>
        )}

        {totalPages > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-2"
            aria-label="Pagination kompetisi"
          >
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
          </nav>
        )}
      </main>
      <Footer />
    </>
  );
}
