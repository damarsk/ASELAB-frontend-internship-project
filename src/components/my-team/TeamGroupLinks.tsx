"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TeamGroupLinks({
  whatsappUrl,
  discordUrl,
}: {
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
