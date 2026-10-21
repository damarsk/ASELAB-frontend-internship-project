"use client";

import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  HelpCircle,
  Layers,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import CompetitionPlaceholder from "@/src/components/competitions/CompetitionPlaceholder";
import Footer from "@/src/components/landing/Footer";
import type { Competition } from "@/src/types/competition";

type CompetitionsResponse = {
  data?: Competition[];
  pagination?: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
  message?: string;
  error?: string;
};

const longDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatLongDate(value: string | null | undefined) {
  if (!value) return "Belum ditentukan";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Belum ditentukan";
  return longDateFormatter.format(date);
}

function formatShortDate(value: string | null | undefined) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return shortDateFormatter.format(date);
}

function getDaysLeft(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function isFreeFee(value: string | null | undefined) {
  if (!value) return false;
  return value.trim().toLowerCase() === "gratis";
}

function splitPoints(value: string | null | undefined) {
  if (!value) return [];
  return value
    .split(/\r?\n|(?<=\.)\s{2,}|\s*\|\s*/)
    .map((item) => item.trim().replace(/[.;]$/, ""))
    .filter((item) => item.length > 0);
}

async function fetchCompetitionById(id: number, signal: AbortSignal) {
  const firstResponse = await fetch("/api/competitions?page=1&limit=100", {
    credentials: "include",
    cache: "no-store",
    signal,
  });

  if (!firstResponse.ok) throw new Error("Gagal memuat detail kompetisi");

  const firstPayload: CompetitionsResponse = await firstResponse.json();
  const firstData = Array.isArray(firstPayload.data) ? firstPayload.data : [];
  const direct = firstData.find((item) => Number(item.id) === id);
  if (direct) return direct;

  const totalPages = firstPayload.pagination?.totalPages ?? 1;
  for (let page = 2; page <= totalPages; page += 1) {
    const response = await fetch(`/api/competitions?page=${page}&limit=100`, {
      credentials: "include",
      cache: "no-store",
      signal,
    });
    if (!response.ok) continue;
    const payload: CompetitionsResponse = await response.json();
    const data = Array.isArray(payload.data) ? payload.data : [];
    const match = data.find((item) => Number(item.id) === id);
    if (match) return match;
  }

  return null;
}

function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold sm:text-xs ${className}`}
    >
      {children}
    </span>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-border bg-white p-5 sm:p-7 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 text-base font-bold text-text-primary sm:text-lg">
      <span className="flex size-7 items-center justify-center rounded-md bg-brand-primary-light text-brand-primary">
        <Icon className="size-4" aria-hidden />
      </span>
      {children}
    </h2>
  );
}

function CompetitionDetailSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="h-56 rounded-2xl bg-[#0b3d2c]/20" />
      <div className="mt-4 h-14 rounded-xl bg-white" />
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <div className="h-56 rounded-2xl bg-white" />
          <div className="h-40 rounded-2xl bg-white" />
          <div className="h-40 rounded-2xl bg-white" />
        </div>
        <div className="space-y-5">
          <div className="h-56 rounded-2xl bg-white" />
          <div className="h-32 rounded-2xl bg-white" />
        </div>
      </div>
    </div>
  );
}

const sections = [
  { id: "deskripsi", label: "Deskripsi" },
  { id: "syarat", label: "Syarat & Ketentuan" },
  { id: "hadiah", label: "Hadiah & Benefit" },
  { id: "faq", label: "FAQ" },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-3.5 text-left text-xs font-semibold text-text-primary transition-colors hover:text-brand-primary sm:text-sm"
      >
        {question}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={`size-4 shrink-0 text-text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <p className="pb-4 pr-8 text-xs leading-5 text-text-secondary sm:text-sm">
          {answer}
        </p>
      )}
    </div>
  );
}

export default function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const numericId = Number(id);

  const isInvalidId = !Number.isFinite(numericId);
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [isLoading, setIsLoading] = useState(!isInvalidId);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isInvalidId) return;

    const controller = new AbortController();

    const load = async () => {
      try {
        const data = await fetchCompetitionById(numericId, controller.signal);
        if (controller.signal.aborted) return;
        setCompetition(data);
        setError(data ? "" : "Kompetisi tidak ditemukan");
      } catch (loadError) {
        if (
          loadError instanceof DOMException &&
          loadError.name === "AbortError"
        ) {
          return;
        }
        setError("Gagal memuat detail kompetisi");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void load();
    return () => controller.abort();
  }, [numericId, isInvalidId]);

  const daysLeft = getDaysLeft(competition?.deadline);
  const isFree = isFreeFee(competition?.biayaPendaftaran);
  const requirementPoints = useMemo(
    () => splitPoints(competition?.ketentuan),
    [competition?.ketentuan],
  );
  const registrationPoints = useMemo(
    () => splitPoints(competition?.infoPendaftaran),
    [competition?.infoPendaftaran],
  );
  const isExpired =
    competition?.statusLomba === "KEDALUWARSA" ||
    (typeof daysLeft === "number" && daysLeft < 0);
  const registerUrl = competition?.registrationUrl ?? null;

  const faqs = useMemo(() => {
    if (!competition) return [];

    return [
      {
        question: "Apakah pendaftaran kompetisi ini berbayar?",
        answer: competition.biayaPendaftaran
          ? isFree
            ? "Tidak. Pendaftaran kompetisi ini gratis, tidak ada biaya yang perlu dibayarkan."
            : `Ya. Biaya pendaftaran kompetisi ini sebesar ${competition.biayaPendaftaran} sesuai informasi dari penyelenggara.`
          : "Informasi biaya pendaftaran belum dicantumkan oleh penyelenggara.",
      },
      {
        question: "Kapan batas akhir pendaftaran?",
        answer: competition.deadline
          ? `Pendaftaran ditutup pada ${formatLongDate(competition.deadline)}. Pastikan seluruh dokumen sudah diunggah sebelum tanggal tersebut.`
          : "Penyelenggara belum mencantumkan tanggal batas pendaftaran.",
      },
      {
        question: "Apa saja syarat yang harus dipenuhi peserta?",
        answer: requirementPoints.length
          ? requirementPoints.join(". ") + "."
          : "Penyelenggara belum mencantumkan syarat dan ketentuan peserta.",
      },
      {
        question: "Bagaimana cara mendaftar kompetisi ini?",
        answer: registrationPoints.length
          ? registrationPoints.join(". ") + "."
          : "Alur pendaftaran belum dicantumkan oleh penyelenggara.",
      },
      {
        question: "Belum punya tim, apakah tetap bisa ikut?",
        answer:
          "Bisa. Gunakan fitur Cari Tim di Troov untuk menemukan rekan satu tim yang cocok, lalu daftarkan tim kamu ke penyelenggara.",
      },
    ];
  }, [competition, isFree, requirementPoints, registrationPoints]);

  return (
    <>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
          <Link href="/dashboard" className="hover:text-brand-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/competitions" className="hover:text-brand-primary">
            Kompetisi
          </Link>
          <span>/</span>
          <span className="font-medium text-text-secondary">
            {competition?.namaLomba ?? "Detail Kompetisi"}
          </span>
        </nav>

        <Link
          href="/competitions"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-brand-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke Daftar Kompetisi
        </Link>

        {isLoading ? (
          <CompetitionDetailSkeleton />
        ) : !competition ? (
          <Card className="text-center">
            <HelpCircle
              className="mx-auto size-10 text-text-muted"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-semibold text-text-primary">
              {error || "Kompetisi tidak ditemukan"}
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              Kompetisi mungkin sudah dihapus atau tautannya tidak valid.
            </p>
            <Link
              href="/competitions"
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover"
            >
              Lihat Kompetisi Lain
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Card>
        ) : (
          <>
            <section className="overflow-hidden rounded-2xl bg-[linear-gradient(120deg,#053b28_0%,#0b5b3d_55%,#127a52_100%)] px-5 py-6 text-white sm:px-8 sm:py-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="bg-brand-primary text-white">
                      <Layers className="size-3.5" aria-hidden="true" />
                      {competition.kategori}
                    </Badge>
                    {competition.tingkatLomba && (
                      <Badge className="bg-white/15 text-white ring-1 ring-inset ring-white/30">
                        Tingkat {competition.tingkatLomba}
                      </Badge>
                    )}
                    <Badge className="bg-white/15 text-white ring-1 ring-inset ring-white/30">
                      {competition.biayaPendaftaran
                        ? isFree
                          ? "Gratis (Free)"
                          : competition.biayaPendaftaran
                        : "Biaya belum tersedia"}
                    </Badge>
                    {isExpired && (
                      <Badge className="bg-red-500/90 text-white">
                        Pendaftaran Ditutup
                      </Badge>
                    )}
                  </div>

                  <h1 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                    {competition.namaLomba}
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50/90">
                    {competition.infoPendaftaran ??
                      "Informasi pendaftaran kompetisi ini belum tersedia."}
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white ring-1 ring-inset ring-white/30">
                      {competition.penyelenggara
                        .split(/\s+/)
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <div className="text-xs leading-4">
                      <p className="text-emerald-100/80">Diselenggarakan oleh</p>
                      <p className="font-semibold text-white">
                        {competition.penyelenggara}
                      </p>
                    </div>
                  </div>
                </div>

                <dl className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-4 lg:block lg:space-y-4 lg:border-l lg:border-white/20 lg:pl-8">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-wide text-emerald-100/70">
                      Total Hadiah
                    </dt>
                    <dd className="mt-1 text-lg font-bold leading-6 text-emerald-300 lg:text-2xl">
                      {competition.hadiah ?? "Belum diumumkan"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-wide text-emerald-100/70">
                      Biaya Registrasi
                    </dt>
                    <dd className="mt-1 text-lg font-bold leading-6 text-emerald-300 lg:text-2xl">
                      {competition.biayaPendaftaran
                        ? isFree
                          ? "Gratis (Free)"
                          : competition.biayaPendaftaran
                        : "Belum tersedia"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-wide text-emerald-100/70">
                      Tingkat Lomba
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-white">
                      {competition.tingkatLomba ?? "Belum tersedia"}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <div className="mt-4 grid gap-3 rounded-xl border border-border bg-white px-4 py-3 text-xs text-text-secondary sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border sm:px-0 sm:py-4">
              <p className="flex items-center gap-2 sm:px-5">
                <CalendarClock
                  className="size-4 shrink-0 text-brand-primary"
                  aria-hidden="true"
                />
                <span>
                  Deadline Pendaftaran:{" "}
                  <strong className="font-semibold text-text-primary">
                    {formatLongDate(competition.deadline)}
                  </strong>
                </span>
              </p>
              <p className="flex items-center gap-2 sm:px-5">
                <Layers
                  className="size-4 shrink-0 text-brand-primary"
                  aria-hidden="true"
                />
                <span>
                  Kategori:{" "}
                  <strong className="font-semibold text-text-primary">
                    {competition.kategori}
                  </strong>
                </span>
              </p>
              <p className="flex items-center gap-2 sm:px-5">
                <Trophy
                  className="size-4 shrink-0 text-brand-primary"
                  aria-hidden="true"
                />
                <span>
                  Hadiah:{" "}
                  <strong className="font-semibold text-text-primary">
                    {competition.hadiah ?? "Belum diumumkan"}
                  </strong>
                </span>
              </p>
            </div>

            <div className="mt-5 flex gap-1.5 overflow-x-auto pb-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="shrink-0 rounded-lg border border-border bg-white px-3.5 py-2 text-xs font-semibold text-text-secondary transition-colors hover:border-brand-primary hover:text-brand-primary"
                >
                  {section.label}
                </a>
              ))}
            </div>

            <div className="mt-5 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-5">
                <Card className="scroll-mt-24">
                  <span id="deskripsi" className="block scroll-mt-24" />
                  <SectionTitle icon={ClipboardList}>
                    Tentang Kompetisi
                  </SectionTitle>
                  <p className="mt-3 text-xs leading-6 text-text-secondary sm:text-sm">
                    {competition.namaLomba} merupakan kompetisi{" "}
                    {competition.kategori.toLowerCase()} tingkat{" "}
                    {competition.tingkatLomba?.toLowerCase() ?? "nasional"} yang
                    diselenggarakan oleh {competition.penyelenggara}.
                  </p>
                  {registrationPoints.length > 0 && (
                    <p className="mt-2 text-xs leading-6 text-text-secondary sm:text-sm">
                      {registrationPoints.join(". ")}.
                    </p>
                  )}

                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    <div className="flex items-start gap-2.5 rounded-lg border border-border bg-background px-3 py-2.5">
                      <Award
                        className="mt-0.5 size-4 shrink-0 text-brand-primary"
                        aria-hidden="true"
                      />
                      <div className="text-[11px] leading-4 sm:text-xs">
                        <p className="font-semibold text-text-primary">
                          Biaya Pendaftaran
                        </p>
                        <p className="text-text-secondary">
                          {competition.biayaPendaftaran ?? "Belum tersedia"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 rounded-lg border border-border bg-background px-3 py-2.5">
                      <Trophy
                        className="mt-0.5 size-4 shrink-0 text-brand-primary"
                        aria-hidden="true"
                      />
                      <div className="text-[11px] leading-4 sm:text-xs">
                        <p className="font-semibold text-text-primary">
                          Total Hadiah
                        </p>
                        <p className="text-text-secondary">
                          {competition.hadiah ?? "Belum diumumkan"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {competition.gambarUrl && (
                    <Image
                      src={competition.gambarUrl}
                      alt={`Poster ${competition.namaLomba}`}
                      width={960}
                      height={540}
                      unoptimized
                      className="mt-4 w-full rounded-xl border border-border object-cover"
                    />
                  )}
                </Card>

                <Card className="scroll-mt-24">
                  <span id="syarat" className="block scroll-mt-24" />
                  <SectionTitle icon={CheckCircle2}>
                    Syarat &amp; Ketentuan Peserta
                  </SectionTitle>
                  {requirementPoints.length > 0 ? (
                    <ul className="mt-3 space-y-2.5">
                      {requirementPoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-xs leading-5 text-text-secondary sm:text-sm"
                        >
                          <CheckCircle2
                            className="mt-0.5 size-4 shrink-0 text-brand-primary"
                            aria-hidden="true"
                          />
                          <span>{point}.</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-xs text-text-secondary sm:text-sm">
                      Penyelenggara belum mencantumkan syarat dan ketentuan
                      peserta.
                    </p>
                  )}

                  <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-warning-light px-3.5 py-3">
                    <Users
                      className="mt-0.5 size-4 shrink-0 text-amber-600"
                      aria-hidden="true"
                    />
                    <p className="text-[11px] leading-5 text-amber-800 sm:text-xs">
                      <strong className="font-semibold">
                        Belum punya tim lengkap?
                      </strong>{" "}
                      Kamu bisa mencari rekan tim lewat fitur{" "}
                      <Link
                        href="/teams"
                        className="font-semibold underline underline-offset-2 hover:text-amber-900"
                      >
                        Cari Tim
                      </Link>{" "}
                      Troov dan menyaring kandidat berdasarkan keahlian yang
                      dibutuhkan.
                    </p>
                  </div>
                </Card>

                <Card className="scroll-mt-24">
                  <span id="hadiah" className="block scroll-mt-24" />
                  <SectionTitle icon={Trophy}>
                    Hadiah &amp; Penghargaan
                  </SectionTitle>
                  <div className="mt-4 rounded-xl border border-amber-200 bg-[linear-gradient(135deg,#fffbeb_0%,#fef3c7_100%)] px-5 py-6 text-center">
                    <Trophy
                      className="mx-auto size-8 text-amber-500"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                      Total Hadiah
                    </p>
                    <p className="mt-1 text-xl font-bold text-amber-700 sm:text-2xl">
                      {competition.hadiah ?? "Belum diumumkan"}
                    </p>
                    <p className="mt-1 text-[11px] text-amber-800/80">
                      Rincian pembagian hadiah mengikuti ketentuan penyelenggara.
                    </p>
                  </div>
                  <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-border bg-background px-3.5 py-3">
                    <Award
                      className="mt-0.5 size-4 shrink-0 text-brand-primary"
                      aria-hidden="true"
                    />
                    <p className="text-[11px] leading-5 text-text-secondary sm:text-xs">
                      Peserta umumnya juga memperoleh sertifikat penghargaan
                      dari {competition.penyelenggara}.
                    </p>
                  </div>
                </Card>

                <Card className="scroll-mt-24">
                  <span id="faq" className="block scroll-mt-24" />
                  <SectionTitle icon={HelpCircle}>
                    Pertanyaan yang Sering Diajukan (FAQ)
                  </SectionTitle>
                  <div className="mt-2">
                    {faqs.map((faq) => (
                      <FaqItem
                        key={faq.question}
                        question={faq.question}
                        answer={faq.answer}
                      />
                    ))}
                  </div>
                </Card>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-24">
                <section className="rounded-2xl border border-border bg-white p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-brand-primary-light text-brand-primary">
                        <CalendarClock className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
                          Batas Waktu
                        </p>
                        <p className="text-sm font-bold text-text-primary">
                          {daysLeft === null
                            ? "Belum ditentukan"
                            : isExpired
                              ? "Pendaftaran Ditutup"
                              : `${daysLeft} Hari Lagi Tersisa`}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-md border border-border-strong px-2 py-1 text-[10px] font-semibold text-text-secondary">
                      {formatShortDate(competition.deadline)}
                    </span>
                  </div>

                  <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-text-secondary">Kategori</dt>
                      <dd className="font-semibold text-text-primary">
                        {competition.kategori}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-text-secondary">Tingkat</dt>
                      <dd className="font-semibold text-text-primary">
                        {competition.tingkatLomba ?? "-"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-text-secondary">Biaya Daftar</dt>
                      <dd className="font-semibold text-text-primary">
                        {competition.biayaPendaftaran ?? "-"}
                      </dd>
                    </div>
                  </dl>

                  {registerUrl ? (
                    <a
                      href={registerUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
                    >
                      Daftar Lomba Sekarang
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled
                        className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-brand-primary/50 px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        Daftar Lomba Sekarang
                      </button>
                      <p className="mt-2 text-center text-[10px] leading-4 text-text-muted">
                        Tautan pendaftaran belum tersedia dari penyelenggara.
                      </p>
                    </>
                  )}

                  <Link
                    href="/teams"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary-light"
                  >
                    <Users className="size-4" aria-hidden="true" />
                    Cari Rekan Tim di Sini
                  </Link>
                </section>

                <section className="rounded-2xl border border-border bg-white p-5">
                  <h2 className="flex items-center gap-2 text-xs font-bold text-text-primary">
                    <CalendarDays
                      className="size-4 text-brand-primary"
                      aria-hidden="true"
                    />
                    Informasi Pendaftaran
                  </h2>
                  <dl className="mt-3 divide-y divide-border text-[11px] sm:text-xs">
                    <div className="flex items-center justify-between gap-3 py-2">
                      <dt className="text-text-secondary">Batas Daftar</dt>
                      <dd className="text-right font-semibold text-text-primary">
                        {formatLongDate(competition.deadline)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-2">
                      <dt className="text-text-secondary">Biaya</dt>
                      <dd className="font-semibold text-text-primary">
                        {competition.biayaPendaftaran ?? "-"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3 py-2">
                      <dt className="text-text-secondary">Penyelenggara</dt>
                      <dd className="text-right font-semibold text-text-primary">
                        {competition.penyelenggara}
                      </dd>
                    </div>
                  </dl>
                  {registrationPoints.length > 0 && (
                    <p className="mt-3 rounded-lg border border-border bg-background px-3 py-2.5 text-[11px] leading-5 text-text-secondary">
                      <strong className="font-semibold text-text-primary">
                        Cara mendaftar:{" "}
                      </strong>
                      {registrationPoints.join(". ")}.
                    </p>
                  )}
                  {competition.sourceUrl && (
                    <a
                      href={competition.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-primary hover:underline"
                    >
                      Sumber informasi
                      <ExternalLink className="size-3" aria-hidden="true" />
                    </a>
                  )}
                </section>

                <section className="rounded-2xl border border-border bg-background-muted/60 p-5">
                  <h2 className="flex items-center gap-2 text-xs font-bold text-text-primary">
                    <Users
                      className="size-4 text-brand-primary"
                      aria-hidden="true"
                    />
                    Mencari Anggota Tim
                  </h2>
                  <p className="mt-2 text-[11px] leading-5 text-text-secondary">
                    Temukan rekan tim dengan keahlian yang sesuai untuk
                    kompetisi {competition.kategori} ini.
                  </p>
                  <Link
                    href="/teams"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-[11px] font-semibold text-brand-primary ring-1 ring-inset ring-brand-primary/30 transition-colors hover:bg-brand-primary-light"
                  >
                    Lihat Rekomendasi Tim
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </section>
              </aside>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-border bg-white px-5 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <CompetitionPlaceholder
                  competition={{ name: competition.namaLomba }}
                />
                <div>
                  <p className="text-sm font-bold text-text-primary">
                    Butuh rekan tim untuk {competition.namaLomba}?
                  </p>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    Geser ke kiri untuk langsung mengirim permintaan bergabung
                    ke tim yang cocok.
                  </p>
                </div>
              </div>
              <Link
                href="/teams"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
              >
                Cari Rekan Tim
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
