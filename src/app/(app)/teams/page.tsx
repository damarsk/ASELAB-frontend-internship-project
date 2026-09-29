"use client";

import { useMemo, useState } from "react";
import DashHeader from "@/src/components/dashboard/DashHeader";
import Footer from "@/src/components/landing/Footer";
import TeamFilters from "@/src/components/teams/TeamFilters";
import TeamGridView from "@/src/components/teams/TeamGridView";
import TeamModeToggle from "@/src/components/teams/TeamModeToggle";
import TeamSwipeDeck from "@/src/components/teams/TeamSwipeDeck";
import TeamsIntro from "@/src/components/teams/TeamsIntro";
import { teams } from "@/src/data/teams";

const teamsPerPage = 6;

export default function TeamsPage() {
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("all");
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState<"grid" | "swipe">("grid");

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

  const resetPage = () => setPage(1);

  return (
    <>
      <DashHeader />
      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:py-14">
        <TeamsIntro totalTeams={filteredTeams.length} />
        <TeamFilters
          search={search}
          skill={skill}
          skills={skills}
          onSearchChange={(value) => {
            setSearch(value);
            resetPage();
          }}
          onSkillChange={(value) => {
            setSkill(value);
            resetPage();
          }}
        />

        <TeamModeToggle mode={mode} onModeChange={setMode} />

        {mode === "swipe" ? (
          filteredTeams.length > 0 ? (
            <TeamSwipeDeck key={`${search}-${skill}`} teams={filteredTeams} />
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
