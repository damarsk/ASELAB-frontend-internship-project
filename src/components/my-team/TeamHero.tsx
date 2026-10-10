"use client";

import { ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TeamHero({
  name,
  event,
  skills,
  whatsappUrl,
  discordUrl,
}: {
  name: string;
  event: string;
  skills: string[];
  whatsappUrl?: string;
  discordUrl?: string;
}) {
  const [unavailableGroup, setUnavailableGroup] = useState<string | null>(null);

  const openGroup = (url: string | undefined, groupName: string) => {
    if (!url) {
      setUnavailableGroup(groupName);
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex size-18 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-cyan-400 shadow-inner">
            <ShieldCheck className="size-10" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col justify-between gap-3 sm:flex-row">
              <div>
                <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
                  {name}
                </h1>
                <p className="mt-1 text-lg font-semibold text-text-secondary">
                  {event}
                </p>
                <p className="mt-2 text-sm text-text-secondary">
                  Dibuat oleh <strong>Anindya</strong> • Team Leader
                </p>
              </div>
              <span className="h-fit rounded-md border border-emerald-200 bg-emerald-50 px-12 py-1.5 text-center text-sm font-medium text-emerald-700">
                Joined
              </span>
            </div>
            <div className="mt-7 border-t border-border pt-5">
              <h2 className="text-xs font-bold text-text-primary">
                Deskripsi Tim Lomba
              </h2>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-text-secondary">
                Fokus pada pengembangan solusi platform digital inklusif
                berbasis kecerdasan buatan untuk akselerasi UMKM nasional. Kami
                mencari talenta yang berdedikasi dan siap berkolaborasi secara
                intensif menuju babak final kompetisi.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-emerald-500">
                <button
                  type="button"
                  onClick={() => openGroup(whatsappUrl, "WhatsApp")}
                  aria-label="Buka grup WhatsApp"
                >
                  <Image
                    src="/whatsapp.svg"
                    alt="WhatsApp group"
                    width={20}
                    height={20}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => openGroup(discordUrl, "Discord")}
                  aria-label="Buka channel Discord"
                >
                  <Image
                    src="/discord.svg"
                    alt="Discord channel"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {unavailableGroup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 px-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setUnavailableGroup(null);
          }}
        >
          <section
            className="w-full max-w-md rounded-2xl border border-border bg-white p-6 text-center shadow-xl sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="group-unavailable-title"
          >
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-danger-light text-red-500">
              <X className="size-6" />
            </div>
            <h2
              id="group-unavailable-title"
              className="mt-4 text-xl font-bold text-text-primary sm:text-2xl"
            >
              Group {unavailableGroup} tidak tersedia!
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-text-secondary">
              Link group {unavailableGroup} belum tersedia saat ini.
            </p>
            <button
              type="button"
              onClick={() => setUnavailableGroup(null)}
              className="mt-6 w-full rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
            >
              Tutup
            </button>
          </section>
        </div>
      )}
    </>
  );
}
