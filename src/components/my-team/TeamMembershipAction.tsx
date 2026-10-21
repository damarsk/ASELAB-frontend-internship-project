"use client";

import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";

export type JoinRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";

const DEFAULT_ROLE_OPTIONS = [
  "UI/UX Designer",
  "Front-End Developer",
  "Back-End Developer",
  "Full-Stack Developer",
  "Quality Assurance",
  "Product Manager",
  "Anggota Tim",
];

type TeamMembershipActionProps = {
  status: "joined" | "request";
  teamId?: number;
  teamSkills?: string[];
  initialRequestStatus?: JoinRequestStatus | null;
  onRequestSuccess?: () => void;
};

export default function TeamMembershipAction({
  status,
  teamId,
  teamSkills = [],
  initialRequestStatus = null,
  onRequestSuccess,
}: TeamMembershipActionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState<JoinRequestStatus | null>(
    null,
  );

  const roleOptions = useMemo(
    () =>
      Array.from(
        new Set([...teamSkills.filter(Boolean), ...DEFAULT_ROLE_OPTIONS]),
      ),
    [teamSkills],
  );

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const activeRole =
    selectedRole && roleOptions.includes(selectedRole)
      ? selectedRole
      : (roleOptions[0] ?? "UI/UX Designer");

  const [message, setMessage] = useState(
    "Halo, saya tertarik bergabung karena saya memiliki pengalaman di bidang ini.",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestStatus = localStatus ?? initialRequestStatus;
  const requested = requestStatus !== null;
  const buttonLabel =
    requestStatus === "REJECTED"
      ? "Request Rejected"
      : requested
        ? "Request Sent"
        : "Request Join";

  const closeModal = () => {
    if (isSubmitting) return;
    setIsModalOpen(false);
    setErrorMessage(null);
  };

  const handleSendRequest = async () => {
    if (!teamId) {
      setErrorMessage("ID Tim tidak valid.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const fullMessage = message.trim()
        ? `[Role: ${activeRole}] ${message.trim()}`
        : `Tertarik bergabung sebagai ${activeRole}.`;

      const response = await fetch("/api/match/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          teamId: Number(teamId),
          pesan: fullMessage,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const errorText =
          result?.error ??
          result?.message ??
          "Gagal mengirim permintaan bergabung.";

        if (response.status === 409 && errorText.includes("pernah mengirim")) {
          setLocalStatus("PENDING");
        }

        throw new Error(errorText);
      }

      setLocalStatus("PENDING");
      setIsModalOpen(false);
      onRequestSuccess?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gagal mengirim permintaan bergabung.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "joined") {
    return (
      <span className="h-fit rounded-md border border-emerald-200 bg-emerald-50 px-12 py-1.5 text-center text-sm font-medium text-emerald-700">
        Joined
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setErrorMessage(null);
          setIsModalOpen(true);
        }}
        disabled={requested}
        className={`h-fit rounded-md px-6 py-1.5 text-center text-sm font-medium transition-colors disabled:cursor-default ${
          requestStatus === "REJECTED"
            ? "border border-red-200 bg-red-50 text-red-700"
            : "bg-brand-primary text-white hover:bg-brand-primary-hover disabled:bg-emerald-100 disabled:text-emerald-700"
        }`}
      >
        {buttonLabel}
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 px-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <section
            className="w-full max-w-lg rounded-2xl border border-border bg-white p-6 shadow-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-team-title"
          >
            <h2
              id="join-team-title"
              className="text-center text-xl font-bold text-text-primary sm:text-2xl"
            >
              Request to Join
            </h2>
            <p className="mt-3 text-center text-sm font-semibold leading-5 text-text-secondary">
              Semua informasi terkait akan dikirim ke Team Leader.
            </p>

            {errorMessage && (
              <div
                role="alert"
                className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700"
              >
                {errorMessage}
              </div>
            )}

            <label
              htmlFor="join-team-competition"
              className="mt-6 block text-xs font-semibold text-text-primary"
            >
              Role yang ingin diambil
            </label>
            <select
              id="join-team-competition"
              value={activeRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              disabled={isSubmitting}
              className="mt-1.5 w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60"
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <label
              htmlFor="join-team-message"
              className="mt-5 block text-xs font-semibold text-text-primary"
            >
              Pesan
            </label>
            <textarea
              id="join-team-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSubmitting}
              placeholder="Tulis alasan atau keahlianmu yang relevan..."
              className="mt-1.5 w-full resize-none rounded-md border border-border-strong px-3 py-2 text-sm leading-5 text-text-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60"
            />

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className="rounded-md border border-border-strong px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-background-muted disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSendRequest}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover disabled:opacity-60"
              >
                {isSubmitting && (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                )}
                {isSubmitting ? "Mengirim..." : "Kirim Permintaan Bergabung"}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

