"use client";

import DashHeader from "@/src/components/dashboard/DashHeader";
import Footer from "@/src/components/landing/Footer";
import Image from "next/image";
import {
  Check,
  FileText,
  ImagePlus,
  LockKeyhole,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

const initialSkills = ["UI/UX Design", "Figma", "Frontend"];
const initialInterests = ["Hackathon", "Product Design"];

function TagList({
  items,
  onRemove,
}: {
  items: string[];
  onRemove: (item: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 rounded-full border border-green-100 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700"
        >
          {item}
          <button
            type="button"
            onClick={() => onRemove(item)}
            className="rounded-full p-0.5 text-green-600 transition hover:bg-green-100 hover:text-green-800"
            aria-label={`Hapus ${item}`}
          >
            <X size={13} />
          </button>
        </span>
      ))}
    </div>
  );
}

function TagInput({
  value,
  onChange,
  onAdd,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  placeholder: string;
}) {
  return (
    <div className="mt-3 flex gap-2">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onAdd();
          }
        }}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
      />
      <button
        type="button"
        onClick={onAdd}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-green-500 hover:text-green-700"
      >
        <Plus size={16} /> Tambah
      </button>
    </div>
  );
}

export default function ProfilePage() {
  const [skills, setSkills] = useState(initialSkills);
  const [interests, setInterests] = useState(initialInterests);
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [saved, setSaved] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  const addTag = (
    value: string,
    current: string[],
    update: (items: string[]) => void,
    clear: (value: string) => void,
  ) => {
    const tag = value.trim();
    if (tag && !current.includes(tag)) {
      update([...current, tag]);
      clear("");
    }
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handleCvChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setCv(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordSubmit = async () => {
    setPasswordMessage("");
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError("Password saat ini wajib diisi.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password baru minimal 8 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi password tidak cocok.");
      return;
    }

    setIsChangingPassword(true);
    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(result?.message ?? "Password gagal diubah.");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password berhasil diubah.");
    } catch (error) {
      setPasswordError(
        error instanceof Error ? error.message : "Password gagal diubah.",
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <>
      <DashHeader />
      <main className="min-h-screen bg-slate-50 px-5 py-8 sm:px-8 lg:py-12">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-green-600">
              Profil kamu
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Tampilkan versi terbaikmu.
            </h1>
            <p className="mt-3 text-base leading-7 text-slate-500">
              Lengkapi profil agar partner yang tepat lebih mudah menemukan dan
              mengenalmu.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-12">
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-4 lg:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    Foto profil
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    JPG atau PNG, maksimal 2 MB
                  </p>
                </div>
                <ImagePlus size={20} className="text-green-600" />
              </div>

              <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-7">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-green-100 text-4xl font-bold text-green-700 ring-8 ring-green-50">
                  {photo ? (
                    <Image
                      src={photo}
                      alt="Preview foto profil"
                      width={112}
                      height={112}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "AR"
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <Upload size={16} /> Ubah foto
                </button>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-600">Kelengkapan profil</span>
                  <span className="text-green-700">60%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-3/5 rounded-full bg-green-500" />
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-400">
                  Profil yang lengkap meningkatkan peluangmu menemukan partner
                  yang cocok.
                </p>
              </div>
            </aside>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-8">
              <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                <h2 className="font-semibold text-slate-950">
                  Informasi dasar
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Ceritakan sedikit tentang dirimu.
                </p>
              </div>
              <div className="space-y-7 px-6 py-6 sm:px-8 sm:py-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Nama lengkap
                    <input
                      required
                      name="name"
                      placeholder="Contoh: Aulia Rahma"
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Jurusan
                    <input
                      required
                      name="major"
                      placeholder="Contoh: Sistem Informasi"
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Skill
                    </label>
                    <div className="mt-3">
                      <TagList
                        items={skills}
                        onRemove={(item) =>
                          setSkills(skills.filter((skill) => skill !== item))
                        }
                      />
                    </div>
                    <TagInput
                      value={newSkill}
                      onChange={setNewSkill}
                      onAdd={() =>
                        addTag(newSkill, skills, setSkills, setNewSkill)
                      }
                      placeholder="Tambah skill"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Minat
                    </label>
                    <div className="mt-3">
                      <TagList
                        items={interests}
                        onRemove={(item) =>
                          setInterests(
                            interests.filter((interest) => interest !== item),
                          )
                        }
                      />
                    </div>
                    <TagInput
                      value={newInterest}
                      onChange={setNewInterest}
                      onAdd={() =>
                        addTag(
                          newInterest,
                          interests,
                          setInterests,
                          setNewInterest,
                        )
                      }
                      placeholder="Tambah minat"
                    />
                  </div>
                </div>

                <label className="block text-sm font-medium text-slate-700">
                  Tentang kamu
                  <textarea
                    name="about"
                    rows={5}
                    placeholder="Tulis ringkasan singkat tentang dirimu, keahlian, dan hal yang ingin kamu capai..."
                    className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-3.5 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Pengalaman lomba
                  <textarea
                    name="experience"
                    rows={4}
                    placeholder="Ceritakan pengalaman lomba atau proyek yang pernah kamu ikuti..."
                    className="mt-2 w-full resize-y rounded-lg border border-slate-200 px-3.5 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </label>

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    CV terbaru
                  </p>
                  <button
                    type="button"
                    onClick={() => cvInputRef.current?.click()}
                    className="mt-2 flex w-full items-center gap-4 rounded-xl border border-dashed border-slate-300 px-4 py-4 text-left transition hover:border-green-500 hover:bg-green-50/40"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                      <FileText size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-slate-800">
                        {cv ? cv.name : "Upload CV kamu"}
                      </span>
                      <span className="mt-1 block text-xs text-slate-400">
                        PDF, DOC, atau DOCX hingga 5 MB
                      </span>
                    </span>
                    {cv ? (
                      <Check size={20} className="shrink-0 text-green-600" />
                    ) : (
                      <Upload size={18} className="shrink-0 text-slate-400" />
                    )}
                  </button>
                  <input
                    ref={cvInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCvChange}
                    className="hidden"
                  />
                  {cv && (
                    <button
                      type="button"
                      onClick={() => setCv(null)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={13} /> Hapus CV
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <span
                  className={`flex items-center gap-2 text-sm font-medium ${saved ? "text-green-600" : "text-transparent"}`}
                  aria-live="polite"
                >
                  <Check size={16} /> Profil berhasil disimpan
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
                >
                  Simpan profil
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-8 lg:col-start-5">
              <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-slate-950">
                      Ganti password
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Perbarui password akunmu secara berkala untuk menjaga
                      keamanan akun.
                    </p>
                  </div>
                  <LockKeyhole size={20} className="shrink-0 text-green-600" />
                </div>
              </div>
              <div className="space-y-5 px-6 py-6 sm:px-8 sm:py-8">
                <label className="block text-sm font-medium text-slate-700">
                  Password saat ini
                  <input
                    required
                    type="password"
                    placeholder="Masukkan password saat ini"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    autoComplete="current-password"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Password baru
                    <input
                      required
                      minLength={8}
                      type="password"
                      placeholder="Minimal 8 karakter"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      autoComplete="new-password"
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-700">
                    Konfirmasi password baru
                    <input
                      required
                      minLength={8}
                      type="password"
                      placeholder="Ulangi password baru"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      autoComplete="new-password"
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </label>
                </div>
                {(passwordMessage || passwordError) && (
                  <p
                    className={`text-sm font-medium ${passwordError ? "text-red-600" : "text-green-600"}`}
                    aria-live="polite"
                  >
                    {passwordError || passwordMessage}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => void handlePasswordSubmit()}
                    disabled={isChangingPassword}
                    className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isChangingPassword ? "Menyimpan..." : "Ganti password"}
                  </button>
                </div>
              </div>
            </section>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
