"use client";

import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  Download,
  FileText,
  GraduationCap,
  Loader2,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Footer from "@/src/components/landing/Footer";
import ProfileAvatar from "@/src/components/profile/ProfileAvatar";
import ProfileTagList from "@/src/components/profile/ProfileTagList";
import {
  mapPublicProfile,
  type PublicProfile,
  type PublicProfileResponse,
} from "@/src/types/profile";

type BackendJoinRequest = {
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  user: { id: number };
};

type SectionCardProps = {
  title: string;
  description?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

function SectionCard({ title, description, icon, children }: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
        <div>
          <h2 className="font-semibold text-text-primary">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-text-secondary">{description}</p>
          )}
        </div>
        <span className="shrink-0 text-brand-primary">{icon}</span>
      </div>
      <div className="px-6 py-6 sm:px-8">{children}</div>
    </section>
  );
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-6 text-text-muted">{children}</p>;
}

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const profileId = Number(id);

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isValidId = Number.isSafeInteger(profileId) && profileId > 0;
  // setIsLoading hanya dipanggil dari callback async; id tidak valid
  // dianggap langsung selesai (tanpa setState di body effect).
  const [isLoading, setIsLoading] = useState(isValidId);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isDownloadingCv, setIsDownloadingCv] = useState(false);
  const [cvError, setCvError] = useState<string | null>(null);
  // CV hanya untuk pemilik akun atau leader yang sedang meninjau Join Request.
  const [canViewCv, setCanViewCv] = useState(false);

  useEffect(() => {
    if (!isValidId) return;

    const controller = new AbortController();

    const load = async () => {
      try {
        const [profileResponse, meResponse, requestsResponse] =
          await Promise.all([
            fetch(`/api/user/${profileId}/profile`, {
              credentials: "include",
              cache: "no-store",
              signal: controller.signal,
            }),
            fetch("/api/auth/profile", {
              credentials: "include",
              cache: "no-store",
              signal: controller.signal,
            }).catch(() => null),
            fetch("/api/teams/my-teams/join-requests", {
              credentials: "include",
              cache: "no-store",
              signal: controller.signal,
            }).catch(() => null),
          ]);

        const payload = (await profileResponse
          .json()
          .catch(() => null)) as PublicProfileResponse | null;

        if (!profileResponse.ok) {
          throw new Error(
            payload?.error ??
              payload?.message ??
              "Gagal memuat profil pengguna.",
          );
        }

        setProfile(mapPublicProfile(payload, profileId));

        const mePayload = meResponse?.ok
          ? ((await meResponse.json().catch(() => null)) as {
              data?: { id?: number };
            } | null)
          : null;

        const myId =
          typeof mePayload?.data?.id === "number" ? mePayload.data.id : null;
        setCurrentUserId(myId);

        // Backend hanya mengizinkan CV untuk pemilik atau leader dengan
        // Join Request PENDING; UI membatasi tombolnya agar tidak 403.
        if (myId !== null) {
          if (myId === profileId) {
            setCanViewCv(true);
          } else if (requestsResponse?.ok) {
            const requestsPayload = (await requestsResponse
              .json()
              .catch(() => null)) as { data?: BackendJoinRequest[] } | null;
            setCanViewCv(
              (requestsPayload?.data ?? []).some(
                (request) =>
                  request.user?.id === profileId &&
                  request.status === "PENDING",
              ),
            );
          }
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Gagal memuat profil.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void load();

    return () => controller.abort();
  }, [isValidId, profileId]);

  const isOwner = currentUserId !== null && currentUserId === profileId;

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/my-teams");
  };

  const handleDownloadCv = async () => {
    setCvError(null);
    setIsDownloadingCv(true);

    try {
      const response = await fetch(`/api/user/${profileId}/cv`, {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 403) {
          setCanViewCv(false);
          throw new Error(
            "CV hanya dapat diakses oleh Team Leader yang sedang meninjau permintaan bergabung.",
          );
        }

        const payload = (await response.json().catch(() => null)) as {
          error?: string;
          message?: string;
        } | null;

        throw new Error(
          payload?.error ?? payload?.message ?? "CV gagal diunduh.",
        );
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `CV-${profile?.nama ?? profileId}.pdf`.replace(
        /\s+/g,
        "-",
      );
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      setCvError(error instanceof Error ? error.message : "CV gagal diunduh.");
    } finally {
      setIsDownloadingCv(false);
    }
  };

  if (!isLoading && !errorMessage && !profile) notFound();

  if (isLoading) {
    return (
      <>
        <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
          <div className="h-40 animate-pulse rounded-2xl border border-border bg-white" />
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="h-72 animate-pulse rounded-2xl border border-border bg-white" />
            <div className="h-72 animate-pulse rounded-2xl border border-border bg-white lg:col-span-2" />
          </div>
          <p className="mt-6 text-center text-sm text-text-secondary">
            Memuat profil...
          </p>
        </main>
        <Footer />
      </>
    );
  }

  if (errorMessage || !profile) {
    return (
      <>
        <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <UserRound className="mx-auto size-9 text-red-400" />
            <h1 className="mt-4 text-xl font-bold text-text-primary">
              Profil tidak dapat ditampilkan
            </h1>
            <p className="mt-2 text-sm text-red-700">
              {errorMessage ?? "Profil pengguna tidak ditemukan."}
            </p>
            <button
              type="button"
              onClick={goBack}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
            >
              <ArrowLeft className="size-4" /> Kembali
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <button
          type="button"
          onClick={goBack}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-brand-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali
        </button>

        <header className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
          <div className="h-24 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 sm:h-28" />
          <div className="flex flex-col gap-6 px-6 pb-7 sm:flex-row sm:items-end sm:px-8">
            <div className="-mt-14 sm:-mt-16">
              <ProfileAvatar
                name={profile.nama}
                imageUrl={profile.fotoProfilUrl}
                size={128}
              />
            </div>
            <div className="min-w-0 flex-1 sm:pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-2xl font-bold text-text-primary sm:text-3xl">
                  {profile.nama}
                </h1>
                {isOwner && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-primary-light px-2.5 py-1 text-xs font-semibold text-brand-primary">
                    Profil kamu
                  </span>
                )}
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-text-secondary">
                <GraduationCap className="size-4 shrink-0" aria-hidden="true" />
                {profile.jurusan ?? "Jurusan belum diisi"}
              </p>
              {profile.skill.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.skill.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                    >
                      {skill}
                    </span>
                  ))}
                  {profile.skill.length > 4 && (
                    <span className="rounded-full bg-background-muted px-3 py-1 text-xs font-semibold text-text-secondary">
                      +{profile.skill.length - 4} lainnya
                    </span>
                  )}
                </div>
              )}
            </div>
            {isOwner && (
              <Link
                href="/profile"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border-strong px-4 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-background-muted"
              >
                <BadgeCheck className="size-4" /> Edit Profil
              </Link>
            )}
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6">
            <SectionCard
              title="Keahlian"
              description="Skill yang dikuasai"
              icon={<Sparkles className="size-5" />}
            >
              <ProfileTagList
                items={profile.skill}
                emptyLabel="Belum menambahkan keahlian."
              />
            </SectionCard>

            <SectionCard
              title="Minat"
              description="Bidang yang ingin digeluti"
              icon={<UserRound className="size-5" />}
            >
              <ProfileTagList
                items={profile.minat}
                tone="neutral"
                emptyLabel="Belum menambahkan minat."
              />
            </SectionCard>

            {canViewCv && (
              <SectionCard
                title="CV"
                description="Dokumen pendukung"
                icon={<FileText className="size-5" />}
              >
                {!profile.cvUploaded ? (
                  <EmptyText>Pengguna ini belum mengunggah CV.</EmptyText>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-background-muted px-4 py-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                        <FileText className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-text-primary">
                          CV-{profile.nama.replace(/\s+/g, "-")}.pdf
                        </span>
                        <span className="mt-0.5 block text-xs text-text-muted">
                          Dokumen PDF
                        </span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleDownloadCv()}
                      disabled={isDownloadingCv}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isDownloadingCv ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Download className="size-4" />
                      )}
                      {isDownloadingCv ? "Mengunduh..." : "Download CV"}
                    </button>
                    {cvError && (
                      <p
                        className="text-xs font-medium text-red-600"
                        role="alert"
                      >
                        {cvError}
                      </p>
                    )}
                  </div>
                )}
              </SectionCard>
            )}
          </div>

          <div className="space-y-6 lg:col-span-2">
            <SectionCard
              title="Tentang"
              description="Ringkasan singkat tentang pengguna ini"
              icon={<UserRound className="size-5" />}
            >
              {profile.tentang ? (
                <p className="whitespace-pre-line text-sm leading-7 text-text-secondary">
                  {profile.tentang}
                </p>
              ) : (
                <EmptyText>
                  Pengguna ini belum menulis deskripsi diri.
                </EmptyText>
              )}
            </SectionCard>

            <SectionCard
              title="Pengalaman lomba"
              description="Rekam jejak kompetisi"
              icon={<Briefcase className="size-5" />}
            >
              {profile.pengalamanLomba ? (
                <p className="whitespace-pre-line text-sm leading-7 text-text-secondary">
                  {profile.pengalamanLomba}
                </p>
              ) : (
                <EmptyText>
                  Pengguna ini belum menambahkan pengalaman lomba.
                </EmptyText>
              )}
            </SectionCard>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
