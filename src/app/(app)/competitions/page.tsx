"use client";

import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
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
    <article className="flex min-h-0 flex-col border border-border bg-white px-4 py-5 text-center transition-shadow hover:shadow-md sm:px-5">
      <CompetitionPlaceholder competition={competition} />
      <h2 className="mt-5 min-h-10 text-xs font-bold leading-5 text-text-primary sm:text-sm">
        {competition.name}
      </h2>
      <p className="mt-2 min-h-10 text-[10px] leading-3.5 text-text-secondary sm:text-[11px]">
        Kategori {competition.category}, {competition.detail}
      </p>
      <p className="mt-3 text-[9px] text-text-secondary">Total Hadiah</p>
      <p className="mt-1 text-xl font-medium text-text-secondary sm:text-2xl">
        {competition.prize}
      </p>
      <p className="mt-1 text-[10px] text-text-muted">
        Deadline: {competition.deadline}
      </p>
      <button
        type="button"
        className="mx-auto mt-3 inline-flex items-center gap-1 rounded-md bg-brand-primary px-3 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-brand-primary-hover sm:px-4 sm:text-xs"
      >
        Daftar Kompetisi <ArrowRight className="size-3.5" aria-hidden="true" />
      </button>
    </article>
  );
}

export default function CompetitionsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [draftCategory, setDraftCategory] = useState("all");
  const [competitionLevel, setCompetitionLevel] = useState("all");
  const [registrationFee, setRegistrationFee] = useState("all");
  const [deadline, setDeadline] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const applyFilters = () => {
    setCategory(draftCategory);
    setPage(1);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setDraftCategory("all");
    setCategory("all");
    setCompetitionLevel("all");
    setRegistrationFee("all");
    setDeadline("all");
    setPage(1);
  };

  return (
    <>
      <DashHeader />
      <main className="bg-white">
        <section className="flex h-64 items-center bg-brand-primary-light py-4">
          <div className="mx-auto w-full max-w-6xl px-8">
            <h1 className="mb-4 text-4xl font-medium text-text-primary">
              Find Your Perfect Competition
            </h1>
            <p className="text-4xl font-medium text-text-primary">
              Temukan kompetisi yang sesuai
            </p>
            <p className="text-4xl font-medium text-brand-primary/55">
              dengan skill dan minatmu.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-8 py-10 lg:py-16">
          <form
            className="flex flex-col gap-3 md:flex-row md:items-center"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-border-strong bg-white px-5 py-2 shadow-sm">
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
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-text-primary outline-none placeholder:text-text-secondary sm:text-base"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setDraftCategory(category);
                setIsFilterOpen(true);
              }}
              className="flex items-center justify-center rounded-lg bg-brand-primary px-8 py-4 text-base font-medium text-white transition-colors hover:bg-brand-primary-hover md:w-auto"
            >
              <SlidersHorizontal className="mr-1 size-5" aria-hidden="true" />
              Filter
            </button>
          </form>

          {visibleCompetitions.length > 0 ? (
            <section
              className="mt-14"
              aria-labelledby="competition-list-heading"
            >
              <div className="flex items-end justify-between gap-4">
                <h2
                  id="competition-list-heading"
                  className="text-2xl font-bold text-text-primary sm:text-3xl"
                >
                  Rekomendasi Untukmu!
                </h2>
                <span className="hidden shrink-0 text-lg font-semibold text-brand-primary sm:block">
                  Lihat Semua →
                </span>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
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
                    aria-current={
                      pageNumber === currentPage ? "page" : undefined
                    }
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
        </div>
      </main>
      {isFilterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsFilterOpen(false);
          }}
        >
          <section
            className="w-full max-w-sm rounded-2xl border-2 border-border bg-white p-5 shadow-xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-dialog-title"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2
                id="filter-dialog-title"
                className="text-2xl font-bold text-text-primary"
              >
                Filter Kompetisi
              </h2>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="rounded-full p-1 text-text-secondary hover:bg-background-muted hover:text-text-primary"
                aria-label="Tutup filter"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-text-secondary">
                Kategori
                <select
                  value={draftCategory}
                  onChange={(event) => setDraftCategory(event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm text-text-secondary outline-none focus:border-brand-primary"
                >
                  <option value="all">Semua</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-xs font-medium text-text-secondary">
                Tingkat Kompetisi
                <select
                  value={competitionLevel}
                  onChange={(event) => setCompetitionLevel(event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm text-text-secondary outline-none focus:border-brand-primary"
                >
                  <option value="all">Semua</option>
                  <option value="national">Nasional</option>
                  <option value="international">Internasional</option>
                </select>
              </label>

              <label className="block text-xs font-medium text-text-secondary">
                Biaya Pendaftaran
                <select
                  value={registrationFee}
                  onChange={(event) => setRegistrationFee(event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm text-text-secondary outline-none focus:border-brand-primary"
                >
                  <option value="all">Semua</option>
                  <option value="free">Gratis</option>
                  <option value="paid">Berbayar</option>
                </select>
              </label>

              <label className="block text-xs font-medium text-text-secondary">
                Deadline
                <select
                  value={deadline}
                  onChange={(event) => setDeadline(event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm text-text-secondary outline-none focus:border-brand-primary"
                >
                  <option value="all">Semua</option>
                  <option value="this-month">Bulan ini</option>
                  <option value="next-month">Bulan depan</option>
                </select>
              </label>
            </div>

            <div className="mt-5 flex justify-center gap-5">
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-md bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="rounded-md bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover"
              >
                Terapkan
              </button>
            </div>
          </section>
        </div>
      )}
      <Footer />
    </>
  );
}
