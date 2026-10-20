"use client";

import { AlertTriangle, Camera, Plus, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

export default function TeamSettings({
  teamName,
  event,
  description,
  skills: initialSkills,
  whatsappUrl,
  discordUrl,
  memberCount,
  requestCount,
  onSave,
  onDelete,
}: {
  teamName: string;
  event: string;
  description: string;
  skills: string[];
  whatsappUrl?: string | null;
  discordUrl?: string | null;
  memberCount: number;
  requestCount: number;
  onSave: (data: {
    nama: string;
    deskripsi: string;
    kompetisi: string;
    skillDibutuhkan: string[];
    linkGrupWhatsapp: string | null;
    linkChannelDiscord: string | null;
  }) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [skills, setSkills] = useState(initialSkills);
  const [name, setName] = useState(teamName);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [competitionValue, setCompetitionValue] = useState(event);
  const [whatsappValue, setWhatsappValue] = useState(whatsappUrl ?? "");
  const [discordValue, setDiscordValue] = useState(discordUrl ?? "");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!formMessage) return;

    const timeoutId = window.setTimeout(() => {
      setFormMessage(null);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [formMessage]);

  const isDeleteConfirmed = deleteConfirmation === teamName;
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteConfirmation("");
  };

  const removeSkill = (skill: string) =>
    setSkills((current) => current.filter((item) => item !== skill));

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !descriptionValue.trim() || !competitionValue.trim()) {
      setFormError("Nama, deskripsi, dan kompetisi wajib diisi.");
      setFormMessage(null);
      return;
    }

    setIsSaving(true);
    setFormError(null);
    setFormMessage(null);
    try {
      await onSave({
        nama: name.trim(),
        deskripsi: descriptionValue.trim(),
        kompetisi: competitionValue.trim(),
        skillDibutuhkan: skills,
        linkGrupWhatsapp: whatsappValue.trim() || null,
        linkChannelDiscord: discordValue.trim() || null,
      });
      setFormMessage("Informasi tim berhasil diperbarui.");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui informasi tim.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setFormError(null);
    try {
      await onDelete();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Gagal menghapus tim.",
      );
      setIsDeleting(false);
    }
  };

  return (
    <section
      className="mt-5 grid gap-6 lg:grid-cols-[300px_1fr]"
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
              <strong className="block text-sm text-text-primary">{memberCount}</strong>
              Anggota
            </span>
            <span className="border-x border-border">
              <strong className="block text-sm text-brand-primary">{requestCount}</strong>
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
      <div className="space-y-5">
        <form
          className="rounded-xl border border-border bg-white p-6 shadow-sm sm:p-7"
          onSubmit={handleSave}
        >
          <h2 id="settings-heading" className="sr-only">
            Pengaturan tim
          </h2>
          <label className="block text-xs font-bold text-text-primary">
            Nama Tim
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 h-9 w-full rounded-lg border border-border-strong px-3 text-xs font-normal outline-none focus:border-brand-primary"
            />
          </label>
          <label className="mt-5 block text-xs font-bold text-text-primary">
            Deskripsi Tentang Tim
            <textarea
              value={descriptionValue}
              onChange={(event) => setDescriptionValue(event.target.value)}
              className="mt-2 min-h-16 w-full resize-y rounded-lg border border-border-strong px-3 py-2 text-xs font-normal outline-none focus:border-brand-primary"
            />
          </label>
          <label className="mt-5 block text-xs font-bold text-text-primary">
            Kompetisi yang diikuti
            <input
              value={competitionValue}
              onChange={(event) => setCompetitionValue(event.target.value)}
              placeholder="Masukkan nama kompetisi"
              className="mt-2 h-9 w-full rounded-lg border border-border-strong px-3 text-xs font-normal outline-none focus:border-brand-primary"
            />
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
                value={whatsappValue}
                onChange={(event) => setWhatsappValue(event.target.value)}
                placeholder="https://chat.whatsapp.com/..."
                className="mt-2 h-9 w-full rounded-lg border border-border-strong px-3 text-xs font-normal outline-none focus:border-brand-primary"
              />
            </label>
            <label className="text-xs font-bold text-text-primary">
              Link Channel Discord
              <input
                value={discordValue}
                onChange={(event) => setDiscordValue(event.target.value)}
                placeholder="https://discord.gg/..."
                className="mt-2 h-9 w-full rounded-lg border border-border-strong px-3 text-xs font-normal outline-none focus:border-brand-primary"
              />
            </label>
          </div>
          <div className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
            {formError && (
              <p className="mr-auto self-center text-xs text-red-600" role="alert">
                {formError}
              </p>
            )}
            {formMessage && (
              <p
                className="mr-auto self-center text-xs text-brand-primary"
                role="status"
              >
                {formMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-white hover:bg-brand-primary-hover"
            >
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
        <section
          className="rounded-xl border border-red-200 bg-red-50/30 p-5"
          aria-labelledby="delete-team-heading"
        >
          <div className="flex items-start gap-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-red-600 text-white">
              <AlertTriangle className="size-5" />
            </div>
            <div>
              <h2
                id="delete-team-heading"
                className="text-sm font-semibold text-text-primary"
              >
                Hapus tim
              </h2>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Menghapus tim akan menghapus data tim secara permanen.
              </p>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="mt-3 rounded-lg bg-red-700 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-800"
              >
                Hapus tim
              </button>
            </div>
          </div>
        </section>
      </div>
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 px-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDeleteModal();
          }}
        >
          <section
            className="w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-xl sm:p-7"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-team-modal-heading"
          >
            <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="size-6" />
            </div>
            <h2
              id="delete-team-modal-heading"
              className="text-center text-2xl font-bold text-text-primary"
            >
              Hapus Tim?
            </h2>
            <p className="mt-3 text-center text-sm font-semibold text-text-secondary">
              Apakah kamu yakin ingin menghapus {teamName}?
            </p>
            <p className="mt-3 text-center text-sm text-text-secondary">
              Semua informasi terkait tim ini akan dihapus.
            </p>
            <label className="mt-5 block text-sm font-normal text-text-primary">
              Ketik <span className="font-semibold">{teamName}</span> untuk
              konfirmasi.
              <input
                value={deleteConfirmation}
                onChange={(event) => setDeleteConfirmation(event.target.value)}
                className="mt-2 h-10 w-full rounded-lg border border-border-strong px-3 text-sm font-normal outline-none focus:border-brand-primary"
                autoFocus
              />
            </label>
            <div className="mt-6 flex justify-center gap-4">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="rounded-lg bg-background-muted px-5 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-border"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={!isDeleteConfirmed}
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isDeleting ? "Menghapus..." : "Hapus Tim"}
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
