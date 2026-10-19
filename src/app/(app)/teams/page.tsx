"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "@/src/components/landing/Footer";
import TeamFilters from "@/src/components/teams/TeamFilters";
import TeamCardSkeleton from "@/src/components/teams/TeamCardSkeleton";
import TeamGridView from "@/src/components/teams/TeamGridView";
import TeamModeToggle from "@/src/components/teams/TeamModeToggle";
import TeamSwipeDeck from "@/src/components/teams/TeamSwipeDeck";
import TeamsIntro from "@/src/components/teams/TeamsIntro";
import type { BackendTeam } from "@/src/types/team";

const teamsPerPage = 6;

type TeamsResponse = {
  data?: BackendTeam[];
  message?: string;
};

export default function TeamsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [skill, setSkill] = useState("all");
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<"grid" | "swipe">("grid");
  const [teams, setTeams] = useState<BackendTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const skills = useMemo(
    () =>
      Array.from(new Set(teams.flatMap((team) => team.skillDibutuhkan))).sort(),
    [teams],
  );
  const categories = useMemo(
    () => Array.from(new Set(teams.map((team) => team.kompetisi))).sort(),
    [teams],
  );

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (search.trim()) params.set("keyword", search.trim());
    if (category !== "all") params.set("kategori", category);
    if (skill !== "all") params.set("skill", skill);

    const loadTeams = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = params.toString();
        const response = await fetch(`/api/teams${query ? `?${query}` : ""}`, {
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });
        const payload: TeamsResponse = await response.json();

        if (!response.ok) {
          throw new Error(payload.message ?? "Gagal memuat daftar tim");
        }

        setTeams(payload.data ?? []);
      } catch (fetchError) {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }

        setTeams([]);
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal memuat daftar tim",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    void loadTeams();
    return () => controller.abort();
  }, [category, search, skill]);

  const totalPages = Math.max(1, Math.ceil(teams.length / teamsPerPage));
  const currentPage = Math.min(page, totalPages);
  const visibleTeams = teams.slice(
    (currentPage - 1) * teamsPerPage,
    currentPage * teamsPerPage,
  );
  const resetPage = () => setPage(1);

  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:py-14">
        <TeamsIntro totalTeams={teams.length} />
        <TeamFilters
          search={search}
          category={category}
          skill={skill}
          categories={categories}
          skills={skills}
          onSearchChange={(value) => {
            setSearch(value);
            resetPage();
          }}
          onCategoryChange={(value) => {
            setCategory(value);
            resetPage();
          }}
          onSkillChange={(value) => {
            setSkill(value);
            resetPage();
          }}
        />

        <TeamModeToggle mode={mode} onModeChange={setMode} />

        {loading ? (
          <div
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Memuat daftar tim"
            aria-busy="true"
          >
            {Array.from({ length: teamsPerPage }, (_, index) => (
              <TeamCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <p className="mt-16 text-center text-danger">{error}</p>
        ) : mode === "swipe" ? (
          teams.length > 0 ? (
            <TeamSwipeDeck
              key={`${search}-${category}-${skill}`}
              teams={teams}
            />
          ) : (
            <p className="mt-16 text-center text-text-secondary">
              Tim yang kamu cari belum tersedia.
            </p>
          )
        ) : (
          <TeamGridView
            teams={visibleTeams}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
