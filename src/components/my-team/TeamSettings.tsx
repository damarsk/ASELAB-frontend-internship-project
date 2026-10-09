"use client";

import { Camera, Plus, X } from "lucide-react";
import { useState } from "react";

export default function TeamSettings({
  teamName,
  event,
}: {
  teamName: string;
  event: string;
}) {
  const [skills, setSkills] = useState([
    "UI/UX",
    "Front-End",
    "System Analyst",
  ]);

  const removeSkill = (skill: string) =>
    setSkills((current) => current.filter((item) => item !== skill));

  return (
    <section
      className="mt-5 grid gap-5 lg:grid-cols-[265px_1fr]"
      aria-labelledby="settings-heading"
    >
      <aside>
        <div className="rounded-xl border border-border bg-white p-5 text-center shadow-sm">
          <div className="relative mx-auto flex size-16 items-center justify-center rounded-lg bg-slate-900 text-cyan-400 shadow-inner">
            <span className="text-2xl">◈</span>
            <button
              type="button"
              aria-label="Ubah logo tim"
              className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border border-border bg-white text-text-secondary"
            >
              <Camera className="size-3" />
            </button>
          </div>
          <h2 className="mt-3 font-bold text-text-primary">{teamName}</h2>
          <p className="mt-1 text-xs text-text-secondary">{event}</p>
          <div className="mt-5 grid grid-cols-3 border-t border-border pt-4 text-center text-xs text-text-muted">
            <span>
              <strong className="block text-sm text-text-primary">3</strong>
              Anggota
            </span>
            <span className="border-x border-border">
              <strong className="block text-sm text-brand-primary">4</strong>
              Permintaan
            </span>
            <span>
              <strong className="block text-sm text-blue-600">Aktif</strong>
              Status
            </span>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800">
          <p className="font-bold">◉ &nbsp; Tips Pengaturan Tim</p>
          <p className="mt-2 leading-5">
            Pastikan tautan komunikasi (WhatsApp &amp; Discord) valid agar calon
            anggota baru dapat segera berkoordinasi setelah diterima.
          </p>
        </div>
      </aside>
      <form
        className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-7"
        onSubmit={(formEvent) => formEvent.preventDefault()}
      >
        <h2 id="settings-heading" className="sr-only">
          Pengaturan tim
        </h2>
        <label className="block text-xs font-bold text-text-primary">
          Nama Tim
          <input
            defaultValue={teamName}
            className="mt-2 h-9 w-full rounded-lg border border-border-strong px-3 text-xs outline-none focus:border-brand-primary"
          />
        </label>
        <label className="mt-5 block text-xs font-bold text-text-primary">
          Deskripsi Tentang Tim
          <textarea
            defaultValue="Kami sedang membangun solusi platform digital inklusif."
            className="mt-2 min-h-16 w-full resize-y rounded-lg border border-border-strong px-3 py-2 text-xs outline-none focus:border-brand-primary"
          />
        </label>
        <label className="mt-5 block text-xs font-bold text-text-primary">
          Kompetisi yang diikuti
          <select
            defaultValue={event}
            className="mt-2 h-9 w-full rounded-lg border border-border-strong bg-white px-3 text-xs outline-none focus:border-brand-primary"
          >
            <option>{event}</option>
          </select>
        </label>
        <div className="mt-5">
          <p className="text-xs font-bold text-text-primary">
            Skill yang dibutuhkan
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  aria-label={`Hapus ${skill}`}
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
            <button
              type="button"
              className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700"
            >
              <Plus className="size-3" /> Tambah Skill
            </button>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-bold text-text-primary">
            Link Grup Whatsapp
            <input
              placeholder="https whatsapp"
              className="mt-2 h-9 w-full rounded-lg border border-border-strong px-3 text-xs outline-none focus:border-brand-primary"
            />
          </label>
          <label className="text-xs font-bold text-text-primary">
            Link Channel Discord
            <input
              placeholder="https discord"
              className="mt-2 h-9 w-full rounded-lg border border-border-strong px-3 text-xs outline-none focus:border-brand-primary"
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
          <button
            type="button"
            className="rounded-lg bg-background-muted px-4 py-2 text-xs text-text-secondary"
          >
            Batal
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-white hover:bg-brand-primary-hover"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </section>
  );
}
