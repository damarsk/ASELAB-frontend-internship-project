"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ImagePlus, Plus, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import Footer from "@/src/components/landing/Footer";

const suggestedSkills = [
  "UI/UX Designer",
  "Front-end Developer",
  "Back-end Developer",
  "Data Analyst",
  "Presentation",
];

const inputClassName =
  "mt-2 w-full rounded-lg border border-border-strong bg-white px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-light";

type BlacklistUser = {
  id: number;
  nama: string;
};

const mockUsers: BlacklistUser[] = [
  { id: 1, nama: "Alya Putri" },
  { id: 2, nama: "Bagas Pratama" },
  { id: 3, nama: "Citra Lestari" },
  { id: 4, nama: "Dimas Saputra" },
  { id: 5, nama: "Elvina Sari" },
];

export default function CreateTeamPage() {
  const [teamName, setTeamName] = useState("");
  const [competition, setCompetition] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState("5");
  const [skills, setSkills] = useState<string[]>(["UI/UX Designer"]);
  const [newSkill, setNewSkill] = useState("");
  const [logoName, setLogoName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blacklistQuery, setBlacklistQuery] = useState("");
  const [blacklistedUsers, setBlacklistedUsers] = useState<BlacklistUser[]>([]);
  const [isBlacklistDropdownOpen, setIsBlacklistDropdownOpen] = useState(false);
  const blacklistSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        blacklistSearchRef.current &&
        !blacklistSearchRef.current.contains(target)
      ) {
        setIsBlacklistDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsBlacklistDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleSkill = (skill: string) => {
    setSkills((currentSkills) =>
      currentSkills.includes(skill)
        ? currentSkills.filter((currentSkill) => currentSkill !== skill)
        : [...currentSkills, skill],
    );
  };

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !skills.includes(skill)) {
      setSkills((currentSkills) => [...currentSkills, skill]);
      setNewSkill("");
    }
  };

  const blacklistSuggestions = mockUsers.filter(
    (user) =>
      !blacklistedUsers.some((selectedUser) => selectedUser.id === user.id) &&
      user.nama.toLowerCase().includes(blacklistQuery.trim().toLowerCase()),
  );

  const selectBlacklistUser = (user: BlacklistUser) => {
    setBlacklistedUsers((currentUsers) => [...currentUsers, user]);
    setBlacklistQuery("");
    setIsBlacklistDropdownOpen(false);
  };

  const removeBlacklistUser = (userId: number) => {
    setBlacklistedUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (skills.length === 0) {
      setFormError("Pilih setidaknya satu skill yang dibutuhkan.");
      setIsSubmitted(false);
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          nama: teamName.trim(),
          deskripsi: description.trim(),
          kompetisi: competition.trim(),
          skillDibutuhkan: skills,
          kuota: Number(maxMembers),
          logo: logoName || null,
        }),
      });
      const result = (await response.json().catch(() => null)) as {
        message?: string;
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(
          result?.error ?? result?.message ?? "Tim gagal dibuat.",
        );
      }

      setIsSubmitted(true);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Tim gagal dibuat.",
      );
      setIsSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href="/my-teams"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary-hover"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke Tim Saya
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">
            Tim Baru
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Buat tim untuk kompetisimu
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
            Lengkapi informasi tim agar calon anggota dapat memahami tujuan dan
            skill yang sedang kamu cari.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-text-primary">
                Nama Tim <span className="text-red-500">*</span>
              </span>
              <input
                required
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
                className={inputClassName}
                placeholder="Contoh: Byteforce"
              />
            </label>

            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-text-primary">
                Kompetisi <span className="text-red-500">*</span>
              </span>
              <input
                required
                type="text"
                value={competition}
                onChange={(event) => setCompetition(event.target.value)}
                className={inputClassName}
                placeholder="Contoh: GEMASTIK XVIII 2026"
              />
            </label>

            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-text-primary">
                Deskripsi Tim <span className="text-red-500">*</span>
              </span>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className={`${inputClassName} resize-y`}
                placeholder="Ceritakan fokus tim, target kompetisi, atau tipe anggota yang ingin kamu ajak."
              />
            </label>

            <label>
              <span className="text-sm font-semibold text-text-primary">
                Maksimal Anggota <span className="text-red-500">*</span>
              </span>
              <input
                required
                type="number"
                min="2"
                max="10"
                value={maxMembers}
                onChange={(event) => setMaxMembers(event.target.value)}
                className={inputClassName}
              />
            </label>

            <div>
              <span className="text-sm font-semibold text-text-primary">
                Logo Tim{" "}
                <span className="font-normal text-text-muted">(opsional)</span>
              </span>
              <label className="mt-2 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border-strong px-4 py-3 text-sm text-text-secondary transition hover:border-brand-primary hover:bg-brand-primary-light">
                <ImagePlus
                  className="size-5 text-brand-primary"
                  aria-hidden="true"
                />
                <span className="min-w-0 truncate">
                  {logoName || "Unggah gambar logo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) =>
                    setLogoName(event.target.files?.[0]?.name ?? "")
                  }
                />
              </label>
            </div>
          </div>

          <fieldset className="mt-6 border-t border-border pt-6">
            <legend className="text-sm font-semibold text-text-primary">
              Skill yang Dibutuhkan <span className="text-red-500">*</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedSkills.map((skill) => {
                const isSelected = skills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary-light text-brand-primary"
                        : "border-border text-text-secondary hover:border-brand-primary hover:text-brand-primary"
                    }`}
                    aria-pressed={isSelected}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
            {skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-full bg-success-light px-3 py-1.5 text-xs font-medium text-brand-primary"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className="rounded-full hover:bg-brand-primary-muted"
                      aria-label={`Hapus skill ${skill}`}
                    >
                      <X className="size-3.5" aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="mt-3 flex gap-2">
              <input
                value={newSkill}
                onChange={(event) => setNewSkill(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
                className="min-w-0 flex-1 rounded-lg border border-border-strong px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-light"
                placeholder="Tambah skill lain"
              />
              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border-strong px-3 py-2 text-sm font-medium text-text-secondary transition hover:border-brand-primary hover:text-brand-primary"
              >
                <Plus className="size-4" aria-hidden="true" /> Tambah
              </button>
            </div>
          </fieldset>

          <fieldset className="mt-6 border-t border-border pt-6">
            <legend className="text-sm font-semibold text-text-primary">
              Blacklist User{" "}
              <span className="font-normal text-text-muted">(opsional)</span>
            </legend>
            <p className="mt-1 text-xs text-text-secondary">
              Cari berdasarkan nama untuk memilih user yang tidak dapat
              mengajukan permintaan bergabung ke tim ini.
            </p>
            <div ref={blacklistSearchRef} className="relative mt-3">
              <input
                value={blacklistQuery}
                onFocus={() => setIsBlacklistDropdownOpen(true)}
                onChange={(event) => {
                  setBlacklistQuery(event.target.value);
                  setIsBlacklistDropdownOpen(true);
                }}
                className="w-full rounded-lg border border-border-strong bg-white px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-light"
                placeholder="Ketik nama user..."
                aria-label="Cari user untuk blacklist"
                aria-controls="blacklist-user-options"
              />
              {isBlacklistDropdownOpen && (
                <div
                  id="blacklist-user-options"
                  className="absolute inset-x-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-lg border border-border bg-white py-1 shadow-lg"
                  role="listbox"
                >
                  {blacklistSuggestions.length > 0 ? (
                    blacklistSuggestions.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => selectBlacklistUser(user)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-brand-primary-light"
                        role="option"
                        aria-selected="false"
                      >
                        <span className="font-medium text-text-primary">
                          {user.nama}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="px-4 py-3 text-sm text-text-secondary">
                      User tidak ditemukan.
                    </p>
                  )}
                </div>
              )}
            </div>
            {blacklistedUsers.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {blacklistedUsers.map((user) => (
                  <span
                    key={user.id}
                    className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700"
                  >
                    {user.nama}
                    <button
                      type="button"
                      onClick={() => removeBlacklistUser(user.id)}
                      className="rounded-full text-red-500 hover:text-red-800"
                      aria-label={`Hapus ${user.nama} dari blacklist`}
                    >
                      <X className="size-3.5" aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </fieldset>

          {formError && (
            <p
              className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700"
              role="alert"
            >
              {formError}
            </p>
          )}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/my-teams"
              className="inline-flex items-center justify-center rounded-lg border border-border-strong px-5 py-3 text-sm font-semibold text-text-secondary transition hover:border-brand-primary hover:text-brand-primary"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Membuat Tim..." : "Buat Tim"}
            </button>
          </div>
        </form>
      </main>
      {isSubmitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 px-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsSubmitted(false);
          }}
        >
          <section
            className="w-full max-w-md rounded-2xl border border-border bg-white p-6 text-center shadow-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-created-title"
          >
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success-light text-brand-primary">
              <CheckCircle2 className="size-7" aria-hidden="true" />
            </div>
            <h2
              id="team-created-title"
              className="mt-4 text-2xl font-bold text-text-primary"
            >
              Tim berhasil dibuat!
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-text-secondary">
              Kamu sekarang menjadi Team Leader dari {teamName || "tim ini"}.
            </p>
            <Link
              href="/my-teams"
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
            >
              Lihat Tim
            </Link>
          </section>
        </div>
      )}
      <Footer />
    </>
  );
}
