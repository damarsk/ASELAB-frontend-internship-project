"use client";

import { Info, RotateCcw, Users, X } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BackendTeam } from "@/src/types/team";

type TeamSwipeDeckProps = {
  teams: BackendTeam[];
};

function SwipeCard({
  team,
  isFront,
  stackIndex,
  onRemove,
}: {
  team: BackendTeam;
  isFront: boolean;
  stackIndex: number;
  onRemove: (teamId: number) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 180], [-14, 14]);
  const joinOpacity = useTransform(x, [-120, -25], [1, 0]);
  const skipOpacity = useTransform(x, [25, 120], [0, 1]);

  return (
    <motion.article
      className="absolute flex h-105 w-[min(88vw,24rem)] origin-bottom touch-none select-none flex-col rounded-2xl border border-border bg-white p-6 shadow-lg"
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : stackIndex % 2 === 0 ? 2 : -2,
        zIndex: stackIndex,
        pointerEvents: isFront ? "auto" : "none",
      }}
      animate={{
        scale: isFront ? 1 : 1 - Math.min(stackIndex * 0.02, 0.06),
        y: isFront ? 0 : -stackIndex * 5,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      dragSnapToOrigin
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 90) onRemove(team.id);
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-brand-primary/25"
        style={{ opacity: joinOpacity }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-danger/25"
        style={{ opacity: skipOpacity }}
      />
      <motion.span
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-6xl font-black uppercase text-brand-primary"
        style={{ opacity: joinOpacity }}
      >
        Join
      </motion.span>
      <motion.span
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-6xl font-black uppercase text-danger"
        style={{ opacity: skipOpacity }}
      >
        Skip
      </motion.span>

      <div className="flex items-start justify-between gap-3">
        <div className="flex size-16 items-center justify-center rounded-full bg-success-light text-3xl">
          👩🏻‍💼
        </div>
        <span className="flex items-center gap-1 pt-1 text-xs text-text-secondary">
          <Users className="size-3.5" aria-hidden="true" />
          {team.members.length}/{team.kuota} Anggota
        </span>
      </div>
      <h2 className="mt-5 text-xl font-bold text-text-primary">{team.nama}</h2>
      <p className="mt-1 text-sm text-text-muted">{team.kompetisi}</p>
      <p className="mt-3 line-clamp-2 text-sm text-text-secondary">
        {team.deskripsi}
      </p>
      <p className="mt-6 text-xs font-medium text-text-secondary">
        Skill Dibutuhkan
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {team.skillDibutuhkan.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-success-light px-3 py-1 text-xs text-brand-primary"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-auto">
        <div className="mb-1 flex justify-between text-xs text-text-secondary">
          <span>Kecocokan</span>
          <span>0%</span>
        </div>
        <div
          className="h-1.5 bg-border"
          role="progressbar"
          aria-label="Persentase kecocokan"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full bg-brand-primary" style={{ width: "0%" }} />
        </div>
        {isFront && (
          <div className="mt-5 flex justify-center gap-4">
            <button
              type="button"
              aria-label={`Gabung ${team.nama}`}
              onClick={() => onRemove(team.id)}
              className="flex size-12 items-center justify-center rounded-full bg-success-light text-brand-primary transition-transform hover:scale-105"
            >
              <Image
                src="/join-request.svg"
                alt=""
                width={40}
                height={40}
                className="brightness-0 saturate-100 filter-[invert(41%)_sepia(93%)_saturate(1352%)_hue-rotate(101deg)_brightness(91%)_contrast(85%)]"
                aria-hidden="true"
              />
            </button>
            <Link
              href={`/teams/${team.id}`}
              className="flex size-12 items-center justify-center rounded-full border border-text-muted bg-background-white text-text-secondary transition-transform hover:scale-105"
            >
              <Info className="size-6 text-text-muted" aria-hidden="true" />
            </Link>
            <button
              type="button"
              aria-label={`Lewati ${team.nama}`}
              onClick={() => onRemove(team.id)}
              className="flex size-12 items-center justify-center rounded-full border border-danger bg-danger-light text-danger transition-transform hover:scale-105"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function TeamSwipeDeck({
  teams: filteredTeams,
}: TeamSwipeDeckProps) {
  const [cards, setCards] = useState(filteredTeams);

  const removeCard = (teamId: number) => {
    setCards((current) => current.filter((team) => team.id !== teamId));
  };

  if (cards.length === 0) {
    return (
      <div className="mt-8 flex min-h-105 flex-col items-center justify-center rounded-2xl border border-border bg-white px-6 text-center shadow-sm">
        <div className="flex size-14 items-center justify-center rounded-full bg-success-light text-brand-primary">
          <RotateCcw className="size-6" aria-hidden="true" />
        </div>
        <h2 className="mt-4 text-lg font-bold text-text-primary">
          Semua tim sudah kamu lihat
        </h2>
        <p className="mt-2 max-w-sm text-sm text-text-secondary">
          Mulai lagi untuk melihat daftar tim dari awal.
        </p>
        <button
          type="button"
          onClick={() => setCards(filteredTeams)}
          className="mt-5 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
        >
          Mulai Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="relative grid h-112 w-full max-w-md place-items-center">
        {cards.map((team, index) => (
          <SwipeCard
            key={team.id}
            team={team}
            isFront={index === cards.length - 1}
            stackIndex={index}
            onRemove={removeCard}
          />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-text-secondary">
        Geser kartu ke kiri untuk join, atau ke kanan untuk skip
      </p>
    </div>
  );
}
