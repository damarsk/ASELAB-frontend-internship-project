import Link from "next/link";
import {
  Handshake,
  Search,
  Target,
  UserPlus,
  UserRound,
  UsersRound,
} from "lucide-react";
import TeamCard from "@/src/components/teams/TeamCard";
import type { BackendTeam } from "@/src/types/team";

const landingTeams: Array<{ team: BackendTeam; kecocokan: string }> = [
  {
    team: {
      id: 1,
      nama: "Nebula Team",
      deskripsi: "Tim yang mencari partner untuk membangun solusi digital.",
      kompetisi: "NusaHack 2026",
      skillDibutuhkan: ["UI/UX", "Front-End"],
      leaderId: 1,
      createdAt: "",
      updatedAt: "",
      kuota: 4,
      kecocokan: "92%",
      members: [{ id: 1 }, { id: 2 }],
    },
    kecocokan: "92%",
  },
  {
    team: {
      id: 2,
      nama: "Pixel Squad",
      deskripsi: "Berkolaborasi membuat produk teknologi yang berdampak.",
      kompetisi: "DataHack 2026",
      skillDibutuhkan: ["Back-End", "Front-End"],
      leaderId: 2,
      createdAt: "",
      updatedAt: "",
      kuota: 4,
      kecocokan: "87%",
      members: [{ id: 1 }, { id: 2 }],
    },
    kecocokan: "87%",
  },
  {
    team: {
      id: 3,
      nama: "InnovateX",
      deskripsi: "Membangun inovasi bisnis melalui teknologi dan data.",
      kompetisi: "Java Business 2026",
      skillDibutuhkan: ["Data", "Business"],
      leaderId: 3,
      createdAt: "",
      updatedAt: "",
      kuota: 4,
      kecocokan: "84%",
      members: [{ id: 1 }, { id: 2 }],
    },
    kecocokan: "84%",
  },
];

const heroTeam: BackendTeam = {
  id: 0,
  nama: "Vertex Team",
  deskripsi: "Tim yang mencari partner untuk membangun solusi digital.",
  kompetisi: "NusaHack 2026",
  skillDibutuhkan: ["UI/UX", "Front-End", "Back-End"],
  leaderId: 0,
  createdAt: "",
  updatedAt: "",
  kuota: 6,
  kecocokan: "92%",
  members: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
};

export default function Main() {
  return (
    <main className="min-h-[calc(100vh-5rem)]">
      <div className="bg-brand-primary-light">
        <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-16 px-8 py-16 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-12 flex items-center gap-2 text-lg font-semibold text-brand-primary">
              <span className="text-xl">✦</span>
              <span>Temukan Tim Impianmu</span>
            </div>

            <h2 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-6xl">
              Temukan
              <span className="block text-brand-primary">Partner Lomba</span>
              yang Tepat
              <span className="block">untukmu.</span>
            </h2>

            <p className="mt-12 max-w-lg text-lg leading-7 text-text-secondary">
              Temukan mahasiswa dengan skill dan minat yang saling melengkapi
              untuk membangun tim lomba yang lebih solid.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex h-14 items-center justify-center rounded-lg bg-brand-primary px-8 font-semibold text-white transition-all duration-200 hover:bg-brand-primary-hover hover:shadow-lg"
              >
                Cari Partner →
              </a>

              <a
                href="#cara-kerja"
                className="inline-flex h-14 items-center justify-center rounded-lg border border-border bg-white px-8 font-semibold text-text-primary transition-all duration-200 hover:border-brand-primary hover:text-brand-primary"
              >
                Pelajari Cara Kerja
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute -top-12 right-72 z-10 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-lg">
              92% <span className="text-brand-primary">Cocok!!</span>
            </div>

            <div className="w-full max-w-sm">
              <TeamCard team={heroTeam} kecocokan="92%" href="/dashboard" />
            </div>

            <div className="absolute -bottom-10 right-0 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-lg">
              <span className="text-text-primary">1 Posisi Tersedia</span>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl">
              Temukan Tim yang Tepat,{" "}
              <span className="text-brand-primary">
                Raih Lebih Banyak Peluang
              </span>
            </h2>
            <p className="mt-4 text-base text-text-secondary">
              Temukan tim berdasarkan skill, minat, dan lomba.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-light">
                <UsersRound
                  className="size-7 text-brand-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Temukan Tim
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Jelajahi tim yang mencari anggota
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-light">
                <Target
                  className="size-7 text-brand-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Cocokkan Skill
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Temukan tim yang sesuai skillmu
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-light">
                <Handshake
                  className="size-7 text-brand-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Bergabung &amp; berkolaborasi
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Kirim permintaan bergabung &amp; mulai bersama
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20" id="cara-kerja">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl">
              Cara Kerja
            </h2>
            <p className="mt-4 text-base text-text-secondary">
              Mulai perjalananmu dalam 4 langkah sederhana
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-6 sm:flex-row sm:justify-center sm:gap-4">
            <div className="w-full rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="text-3xl font-bold text-text-primary">1</div>
              <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-light">
                <UserRound
                  className="size-6 text-brand-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Buat Profil
              </h3>
            </div>

            <span className="hidden text-2xl text-text-muted sm:block">→</span>

            <div className="w-full rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="text-3xl font-bold text-text-primary">2</div>
              <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-light">
                <Search
                  className="size-6 text-brand-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Temukan Tim
              </h3>
            </div>

            <span className="hidden text-2xl text-text-muted sm:block">→</span>

            <div className="w-full rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="text-3xl font-bold text-text-primary">3</div>
              <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-light">
                <UserPlus
                  className="size-6 text-brand-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Join Request
              </h3>
            </div>

            <span className="hidden text-2xl text-text-muted sm:block">→</span>

            <div className="w-full rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="text-3xl font-bold text-text-primary">4</div>
              <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-light">
                <Handshake
                  className="size-6 text-brand-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Kolaborasi
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-secondary">
              Cari Tim Yang Sesuai Skillmu
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {landingTeams.map(({ team, kecocokan }) => (
              <TeamCard
                key={team.id}
                team={team}
                kecocokan={kecocokan}
                href="/dashboard"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-brand-primary-light py-20">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl">
            Siap Menemukan Tim Lombamu?
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary">
            Lengkapi profil, temukan tim yang cocok,
            <br />
            dan mulai perjalanan kompetisimu.
          </p>
          <div className="mt-10">
            <Link
              href="/register"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-brand-primary px-8 font-semibold text-white transition-all duration-200 hover:bg-brand-primary-hover hover:shadow-lg"
            >
              Daftar Sekarang →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
