"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ImagePlus, Plus, X } from "lucide-react";
import { FormEvent, useState } from "react";
import DashHeader from "@/src/components/dashboard/DashHeader";
import Footer from "@/src/components/landing/Footer";

const competitionOptions = [
  "UI/UX Design Competition 2026",
  "NusaHack 2026",
  "DataHack 2026",
  "GEMASTIK XVIII 2026",
];

const suggestedSkills = [
  "UI/UX Designer",
  "Front-end Developer",
  "Back-end Developer",
  "Data Analyst",
  "Presentation",
];

const inputClassName =
  "mt-2 w-full rounded-lg border border-border-strong bg-white px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-light";

export default function CreateTeamPage() {
  const [teamName, setTeamName] = useState("");
  const [competition, setCompetition] = useState(competitionOptions[0]);
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState("5");
  const [skills, setSkills] = useState<string[]>(["UI/UX Designer"]);
  const [newSkill, setNewSkill] = useState("");
  const [logoName, setLogoName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (skills.length === 0) {
      setFormError("Pilih setidaknya satu skill yang dibutuhkan.");
      setIsSubmitted(false);
      return;
    }
    setFormError("");
    setIsSubmitted(true);
  };

  return (
    <>
      <DashHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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
              <select
                required
                value={competition}
                onChange={(event) => setCompetition(event.target.value)}
                className={inputClassName}
              >
                {competitionOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
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
              className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-primary-hover"
            >
              Buat Tim
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
