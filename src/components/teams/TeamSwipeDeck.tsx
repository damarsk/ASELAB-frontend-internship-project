"use client";

import { Heart, Info, RotateCcw, Users, X } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import type { Team } from "@/src/components/dashboard/TeamSection";

type TeamSwipeDeckProps = {
  teams: Team[];
};

function SwipeCard({
  team,
  isFront,
  stackIndex,
  onRemove,
}: {
  team: Team;
  isFront: boolean;
  stackIndex: number;
  onRemove: (teamName: string) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-180, 180], [-14, 14]);
  const likeOpacity = useTransform(x, [25, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -25], [1, 0]);

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
        if (Math.abs(info.offset.x) > 90) onRemove(team.name);
      }}
    >
      <motion.span
        className="pointer-events-none absolute left-5 bottom-5 rounded-lg border-2 border-brand-primary px-3 py-1 text-sm font-bold uppercase text-brand-primary"
        style={{ opacity: likeOpacity, rotate: -10 }}
      >
        Suka
      </motion.span>
      <motion.span
        className="pointer-events-none absolute right-5 bottom-5 rounded-lg border-2 border-danger px-3 py-1 text-sm font-bold uppercase text-danger"
        style={{ opacity: passOpacity, rotate: 10 }}
      >
        Lewati
      </motion.span>

      <div className="flex items-start justify-between gap-3">
        <div className="flex size-16 items-center justify-center rounded-full bg-success-light text-3xl">
          👩🏻‍💼
        </div>
        <span className="flex items-center gap-1 pt-1 text-xs text-text-secondary">
          <Users className="size-3.5" aria-hidden="true" />
          2/4 Anggota
        </span>
      </div>
      <h2 className="mt-5 text-xl font-bold text-text-primary">{team.name}</h2>
      <p className="mt-1 text-sm text-text-muted">{team.event}</p>
      <p className="mt-6 text-xs font-medium text-text-secondary">
        Skill Dibutuhkan
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {team.skills.map((skill) => (
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
          <span>{team.match}%</span>
        </div>
        <div
          className="h-1.5 bg-border"
          role="progressbar"
          aria-valuenow={team.match}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-brand-primary"
            style={{ width: `${team.match}%` }}
          />
        </div>
        {isFront && (
          <div className="mt-5 flex justify-center gap-4">
            <button
              type="button"
              aria-label={`Suka ${team.name}`}
              onClick={() => onRemove(team.name)}
              className="flex size-12 items-center justify-center rounded-full bg-success-light text-brand-primary transition-transform hover:scale-105"
            >
              <Heart className="size-5 fill-current" aria-hidden="true" />
            </button>
            <Link
              href={`/teams/${team.id}`}
              className="flex size-12 items-center justify-center rounded-full border border-text-muted bg-background-white text-text-secondary transition-transform hover:scale-105"
            >
              <Info className="size-6 text-text-muted" aria-hidden="true" />
            </Link>
            <button
              type="button"
              aria-label={`Lewati ${team.name}`}
              onClick={() => onRemove(team.name)}
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

  const removeCard = (teamName: string) => {
    setCards((current) => current.filter((team) => team.name !== teamName));
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
            key={team.name}
            team={team}
            isFront={index === cards.length - 1}
            stackIndex={index}
            onRemove={removeCard}
          />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-text-secondary">
        Geser kartu ke kiri untuk melewati, atau ke kanan untuk menyukai
      </p>
    </div>
  );
}
