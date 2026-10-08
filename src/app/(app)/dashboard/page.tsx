"use client";

import CompetitionSection, {
  type Competition,
} from "@/src/components/dashboard/CompetitionSection";
import DashboardHero from "@/src/components/dashboard/DashboardHero";
import DashHeader from "@/src/components/dashboard/DashHeader";
import ProfileActions from "@/src/components/dashboard/ProfileActions";
import TeamSection from "@/src/components/dashboard/TeamSection";
import { teams } from "@/src/data/teams";
import Footer from "@/src/components/landing/Footer";
import { useEffect, useState } from "react";

type Profile = Record<string, unknown>;
type ProfileResponse = { data?: Profile };

const competitions: Competition[] = [
  {
    name: "GEMASTIK XVIII 2026",
    category: "UX Design & Software Development",
    detail: "Ajang prestisius IT mahasiswa se-Indonesia.",
    prize: "Rp 50.000.000",
    logo: "GEMASTIK",
    logoClassName: "border-[10px] border-cyan-800 text-red-600",
  },
  {
    name: "Hackathon FinTech Indonesia",
    category: "Web3, Micro-lending, & AI Fraud Prevention",
    detail: "Untuk inklusi finansial UMKM.",
    prize: "Rp 100.000.000",
    logo: "HACKATHON",
    logoClassName: "border border-text-secondary text-text-secondary",
  },
  {
    name: "National Cyber Security Championship",
    category: "Capture the Flag (CTF Jeopardy)",
    detail: "Reverse Engineering, dan Web Penetration Testing.",
    prize: "Rp 35.000.000",
    logo: "5TH\nEDITION",
    logoClassName: "border-4 border-black text-black",
  },
];

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/auth/profile", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Gagal memuat profil");
        const data: ProfileResponse = await response.json();
        const profileData = data.data ?? null;
        setProfile(profileData);
        setUsername(
          typeof profileData?.nama === "string" ? profileData.nama : null,
        );
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal memuat profil",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <DashHeader />
      <DashboardHero loading={loading} error={error} username={username} />
      <main className="mx-auto max-w-6xl px-8 py-10 lg:py-16">
        <TeamSection teams={teams.slice(0, 3)} />
        <CompetitionSection competitions={competitions} />
        <ProfileActions profile={profile} loading={loading} />
      </main>
      <Footer />
    </>
  );
}
