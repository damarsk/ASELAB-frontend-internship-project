"use client";

import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CompetitionCardSkeleton from "@/src/components/competitions/CompetitionCardSkeleton";
import CompetitionPlaceholder from "@/src/components/competitions/CompetitionPlaceholder";
import Footer from "@/src/components/landing/Footer";
import type { Competition } from "@/src/types/competition";

const competitionsPerPage = 6;

type CompetitionsResponse = {
  data?: Competition[];
  pagination?: {
    page: number;
    totalPages: number;
  };
  message?: string;
  error?: string;
};

function CompetitionCard({ competition }: { competition: Competition }) {
  const deadlineDate = competition.deadline
    ? new Date(competition.deadline)
    : null;
  const deadline =
    deadlineDate && !Number.isNaN(deadlineDate.getTime())
      ? new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(deadlineDate)
      : "Belum ditentukan";

  return (
    <article className="flex min-h-0 flex-col rounded-xl border border-border bg-white px-4 py-5 text-center transition-shadow hover:shadow-md sm:px-5">
      <Link href={`/competitions/${competition.id}`} className="block">
        <CompetitionPlaceholder
          competition={{ name: competition.namaLomba }}
        />
      </Link>
      <h2 className="mt-5 min-h-10 text-xs font-bold leading-5 text-text-primary sm:text-sm">
        <Link
          href={`/competitions/${competition.id}`}
          className="transition-colors hover:text-brand-primary"
        >
          {competition.namaLomba}
        </Link>
      </h2>
      <p className="mt-2 min-h-10 text-[10px] leading-3.5 text-text-secondary sm:text-[11px]">
        Kategori {competition.kategori}, {competition.penyelenggara}
      </p>
      <p className="mt-3 text-[9px] text-text-secondary">Total Hadiah</p>
      <p className="mt-1 text-xl font-medium text-text-secondary sm:text-2xl">
        {competition.hadiah ?? "Tidak tersedia"}
      </p>
      <p className="mt-1 text-[10px] text-text-muted">Deadline: {deadline}</p>
      <Link
        href={`/competitions/${competition.id}`}
        className="mx-auto mt-3 inline-flex items-center gap-1 rounded-md bg-brand-primary px-3 py-1.5 text-[10px] font-medium text-white transition-colors hover:bg-brand-primary-hover sm:px-4 sm:text-xs"
      >
        Lihat Detail <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [draftCategory, setDraftCategory] = useState("all");
  const [competitionLevel, setCompetitionLevel] = useState("all");
  const [draftCompetitionLevel, setDraftCompetitionLevel] = useState("all");
  const [registrationFee, setRegistrationFee] = useState("all");
  const [draftRegistrationFee, setDraftRegistrationFee] = useState("all");
  const [deadline, setDeadline] = useState("all");
  const [draftDeadline, setDraftDeadline] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(competitions.map((item) => item.kategori))).sort(),
    [competitions],
  );

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      page: String(page),
      limit: String(competitionsPerPage),
    });

    if (search.trim()) params.set("keyword", search.trim());
    if (category !== "all") params.set("kategori", category);
    if (competitionLevel !== "all") {
      params.set(
        "tingkatKompetisi",
        competitionLevel === "national" ? "Nasional" : "Internasional",
      );
    }
    if (registrationFee !== "all") {
      params.set(
        "biayaPendaftaran",
        registrationFee === "free" ? "Gratis" : "Berbayar",
      );
    }
    if (deadline !== "all") params.set("deadline", deadline);

    fetch(`/api/competitions?${params.toString()}`, {
      credentials: "include",
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        const result = (await response
          .json()
          .catch(() => null)) as CompetitionsResponse | null;
        if (!response.ok) {
          throw new Error(
            result?.error ?? result?.message ?? "Gagal memuat kompetisi.",
          );
        }
        return result;
      })
      .then((result) => {
        setCompetitions(result?.data ?? []);
        setTotalPages(Math.max(1, result?.pagination?.totalPages ?? 1));
      })
      .catch((fetchError: unknown) => {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal memuat kompetisi.",
        );
        setCompetitions([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [category, competitionLevel, deadline, page, registrationFee, search]);

  const currentPage = Math.min(page, totalPages);

  const updateSearch = (value: string) => {
    setSearch(value);
    setError("");
    setPage(1);
  };

  const applyFilters = () => {
    setCategory(draftCategory);
    setCompetitionLevel(draftCompetitionLevel);
    setRegistrationFee(draftRegistrationFee);
    setDeadline(draftDeadline);
    setError("");
    setPage(1);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setDraftCategory("all");
    setDraftCompetitionLevel("all");
    setDraftRegistrationFee("all");
    setDraftDeadline("all");
    setCategory("all");
    setCompetitionLevel("all");
    setRegistrationFee("all");
    setDeadline("all");
    setError("");
    setPage(1);
  };

  return (
    <>
      <main>
        <section className="flex h-64 items-center bg-brand-primary-light py-4">
          <div className="mx-auto w-full max-w-7xl px-8">
            <h1 className="text-4xl font-medium text-text-primary">
              Find Your Perfect Competition
            </h1>
            <p className="text-4xl font-medium text-text-primary">
              Temukan kompetisi yang sesuai
            </p>
            <p className="text-4xl font-medium text-brand-primary">
              dengan skill dan minatmu.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-8 py-10 lg:py-16">
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
                setDraftCompetitionLevel(competitionLevel);
                setDraftRegistrationFee(registrationFee);
                setDraftDeadline(deadline);
                setIsFilterOpen(true);
              }}
              className="flex items-center justify-center gap-2 rounded-full border border-brand-primary bg-white px-6 py-3 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary-light md:w-auto"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filter
            </button>
          </form>

          {isLoading ? (
            <section className="mt-14" aria-label="Memuat daftar kompetisi">
              <div className="flex items-end justify-between gap-4">
                <div className="h-9 w-64 animate-pulse rounded bg-background-muted sm:h-10" />
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3" aria-busy="true">
                {Array.from({ length: competitionsPerPage }, (_, index) => (
                  <CompetitionCardSkeleton key={index} />
                ))}
              </div>
            </section>
          ) : error ? (
            <div className="min-h-72">
              <p className="mt-16 text-center text-red-600" role="alert">
                {error}
              </p>
            </div>
          ) : competitions.length > 0 ? (
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
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {competitions.map((competition) => (
                  <CompetitionCard
                    key={competition.id}
                    competition={competition}
                  />
                ))}
              </div>
            </section>
          ) : (
            <div className="min-h-72">
              <p className="mt-16 text-center text-text-secondary">
                Kompetisi yang kamu cari belum tersedia.
              </p>
            </div>
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
                  value={draftCompetitionLevel}
                  onChange={(event) =>
                    setDraftCompetitionLevel(event.target.value)
                  }
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
                  value={draftRegistrationFee}
                  onChange={(event) =>
                    setDraftRegistrationFee(event.target.value)
                  }
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
                  value={draftDeadline}
                  onChange={(event) => setDraftDeadline(event.target.value)}
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
