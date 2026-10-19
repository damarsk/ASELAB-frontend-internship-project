"use client";

import CompetitionSection from "@/src/components/dashboard/CompetitionSection";
import DashboardHero from "@/src/components/dashboard/DashboardHero";
import ProfileActions from "@/src/components/dashboard/ProfileActions";
import TeamSection from "@/src/components/dashboard/TeamSection";
import TeamCardSkeleton from "@/src/components/teams/TeamCardSkeleton";
import CompetitionCardSkeleton from "@/src/components/competitions/CompetitionCardSkeleton";
import Footer from "@/src/components/landing/Footer";
import type { Competition } from "@/src/types/competition";
import type { BackendTeam } from "@/src/types/team";
import { useEffect, useState } from "react";

type Profile = Record<string, unknown>;
type ProfileResponse = { data?: Profile };
type TeamsResponse = { data?: BackendTeam[]; message?: string };
type CompetitionsResponse = {
  data?: Competition[];
  message?: string;
  error?: string;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [teams, setTeams] = useState<BackendTeam[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/auth/profile", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Gagal memuat profil");
        const data: ProfileResponse = await response.json();
        const profileData = data.data ?? null;
        setProfile(profileData);
        setUsername(
          typeof profileData?.nama === "string" ? profileData.nama : null,
        );
      } catch (fetchError) {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }
        setProfileError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal memuat profil",
        );
      } finally {
        if (!controller.signal.aborted) setProfileLoading(false);
      }
    };

    const fetchDashboardContent = async () => {
      try {
        const [teamsResponse, competitionsResponse] = await Promise.all([
          fetch("/api/teams", {
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          }),
          fetch("/api/competitions?page=1&limit=3", {
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          }),
        ]);
        const teamsPayload: TeamsResponse = await teamsResponse.json();
        const competitionsPayload: CompetitionsResponse =
          await competitionsResponse.json();

        if (!teamsResponse.ok) {
          throw new Error(teamsPayload.message ?? "Gagal memuat data tim");
        }
        if (!competitionsResponse.ok) {
          throw new Error(
            competitionsPayload.error ??
              competitionsPayload.message ??
              "Gagal memuat data kompetisi",
          );
        }

        setTeams((teamsPayload.data ?? []).slice(0, 3));
        setCompetitions((competitionsPayload.data ?? []).slice(0, 3));
      } catch (fetchError) {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }
        setContentError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal memuat data dashboard",
        );
        setTeams([]);
        setCompetitions([]);
      } finally {
        if (!controller.signal.aborted) setContentLoading(false);
      }
    };

    void fetchProfile();
    void fetchDashboardContent();
    return () => controller.abort();
  }, []);

  return (
    <>
      <DashboardHero
        loading={profileLoading}
        error={profileError}
        username={username}
      />
      <main className="mx-auto max-w-6xl px-8 py-10 lg:py-16">
        {contentLoading ? (
          <>
            <section
              className="grid gap-6 md:grid-cols-3"
              aria-label="Memuat rekomendasi tim"
              aria-busy="true"
            >
              {Array.from({ length: 3 }, (_, index) => (
                <TeamCardSkeleton key={index} />
              ))}
            </section>
            <section
              className="mt-24 grid gap-6 md:grid-cols-3"
              aria-label="Memuat kompetisi"
              aria-busy="true"
            >
              {Array.from({ length: 3 }, (_, index) => (
                <CompetitionCardSkeleton key={index} />
              ))}
            </section>
          </>
        ) : contentError ? (
          <p className="py-16 text-center text-danger" role="alert">
            {contentError}
          </p>
        ) : (
          <>
            <TeamSection teams={teams} />
            <CompetitionSection competitions={competitions} />
          </>
        )}
        <ProfileActions profile={profile} loading={profileLoading} />
      </main>
      <Footer />
    </>
  );
}
