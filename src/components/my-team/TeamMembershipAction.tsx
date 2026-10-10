"use client";

import { useState } from "react";

export default function TeamMembershipAction({
  status,
}: {
  status: "joined" | "request";
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requested, setRequested] = useState(false);

  const closeModal = () => setIsModalOpen(false);

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
        onClick={() => setIsModalOpen(true)}
        disabled={requested}
        className="h-fit rounded-md bg-brand-primary px-6 py-1.5 text-center text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-default disabled:bg-emerald-100 disabled:text-emerald-700"
      >
        {requested ? "Request Sent" : "Request Join"}
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
            <label
              htmlFor="join-team-competition"
              className="mt-6 block text-xs font-semibold text-text-primary"
            >
              Role yang ingin diambil
            </label>
            <select
              id="join-team-competition"
              className="mt-1.5 w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
              defaultValue="UI/UX Designer"
            >
              <option>UI/UX Designer</option>
              <option>Front-End Developer</option>
              <option>Back-End Developer</option>
              <option>Quality Assurance</option>
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
              defaultValue="Halo, saya tertarik bergabung karena saya memiliki pengalaman di bidang ini."
              className="mt-1.5 w-full resize-none rounded-md border border-border-strong px-3 py-2 text-sm leading-5 text-text-primary outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
            />
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-md border border-border-strong px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-background-muted"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  setRequested(true);
                  closeModal();
                }}
                className="rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
              >
                Kirim Permintaan Bergabung
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
