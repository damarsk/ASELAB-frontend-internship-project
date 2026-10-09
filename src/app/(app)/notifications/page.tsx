"use client";

import {
  Check,
  MessageCircle,
  PartyPopper,
  Search,
  Trophy,
  UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import DashHeader from "@/src/components/dashboard/DashHeader";

type NotificationCategory =
  | "Permintaan Tim"
  | "Undangan"
  | "Kompetisi"
  | "Sistem";

type Notification = {
  id: number;
  category: NotificationCategory;
  title: string;
  description: string;
  time: string;
  group: "Hari ini" | "Kemarin";
  unread?: boolean;
  icon: "team" | "party" | "message" | "competition" | "search";
};

const notifications: Notification[] = [
  {
    id: 1,
    category: "Undangan",
    title: "Undangan Bergabung Tim",
    description:
      "Tim Hackathon AI Innovate mengundang Anda untuk bergabung sebagai UI/UX Designer pada perlombaan Gemastik XVI.",
    time: "10 menit yang lalu",
    group: "Hari ini",
    unread: true,
    icon: "team",
  },
  {
    id: 2,
    category: "Permintaan Tim",
    title: "Permintaan Disetujui",
    description:
      "Permintaan Anda untuk bergabung dengan tim ByteCraft Web Dev telah diterima oleh Ketua Tim. Anda sekarang dapat mengakses ruang diskusi tim.",
    time: "1 jam yang lalu",
    group: "Hari ini",
    unread: true,
    icon: "party",
  },
  {
    id: 3,
    category: "Sistem",
    title: "Pesan Baru dari Diskusi Tim",
    description:
      'Budi Santoso: "Halo teman-teman, draft submission proposal sudah diunggah di repository, silakan dicek ya!"',
    time: "3 jam yang lalu",
    group: "Hari ini",
    icon: "message",
  },
  {
    id: 4,
    category: "Kompetisi",
    title: "Pengingat Kompetisi",
    description:
      "Pendaftaran untuk gelombang ke-2 National Tech Fest 2025 akan ditutup dalam kurun waktu 3 hari lagi. Pastikan berkas tim Anda sudah lengkap.",
    time: "Kemarin, 14:20",
    group: "Kemarin",
    icon: "competition",
  },
  {
    id: 5,
    category: "Sistem",
    title: "Kunjungan Profil",
    description:
      "Profil keahlian Anda telah dilihat oleh 3 pencari tim yang membutuhkan posisi Frontend Developer.",
    time: "Kemarin, 09:15",
    group: "Kemarin",
    icon: "search",
  },
];

const iconStyles = {
  team: "bg-emerald-50 text-brand-primary",
  party: "bg-blue-50 text-blue-500",
  message: "bg-slate-100 text-slate-400",
  competition: "bg-amber-50 text-amber-500",
  search: "bg-violet-50 text-violet-500",
};

function NotificationIcon({ type }: { type: Notification["icon"] }) {
  const className = "size-5";

  if (type === "team")
    return <UsersRound className={className} aria-hidden="true" />;
  if (type === "party")
    return <PartyPopper className={className} aria-hidden="true" />;
  if (type === "message")
    return <MessageCircle className={className} aria-hidden="true" />;
  if (type === "competition")
    return <Trophy className={className} aria-hidden="true" />;
  return <Search className={className} aria-hidden="true" />;
}

export default function NotificationsPage() {
  const [activeCategory, setActiveCategory] = useState<
    "Semua" | NotificationCategory
  >("Semua");
  const [readIds, setReadIds] = useState<number[]>(
    notifications
      .filter((notification) => !notification.unread)
      .map((notification) => notification.id),
  );

  const unreadCount = notifications.filter(
    (notification) => !readIds.includes(notification.id),
  ).length;
  const visibleNotifications = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          activeCategory === "Semua" ||
          notification.category === activeCategory,
      ),
    [activeCategory],
  );

  const markAllAsRead = () => {
    setReadIds(notifications.map((notification) => notification.id));
  };

  const markAsRead = (id: number) => {
    setReadIds((current) =>
      current.includes(id) ? current : [...current, id],
    );
  };

  return (
    <>
      <DashHeader />
      <main className="mx-auto min-h-[calc(100vh-5rem)] max-w-6xl px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-6 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Notifikasi Anda
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              Tetap terhubung dengan aktivitas tim dan kompetisi terbaru.
            </p>
          </div>
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-2 self-start text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary-hover disabled:cursor-default disabled:text-text-muted sm:self-auto"
          >
            <Check className="size-4" aria-hidden="true" />
            Tandai semua telah dibaca
          </button>
        </div>

        <div
          className="flex gap-1 overflow-x-auto border-b border-border py-4"
          role="tablist"
          aria-label="Filter notifikasi"
        >
          {(
            [
              "Semua",
              "Permintaan Tim",
              "Undangan",
              "Kompetisi",
              "Sistem",
            ] as const
          ).map((category) => {
            const count =
              category === "Semua"
                ? unreadCount
                : notifications.filter(
                    (notification) =>
                      notification.category === category &&
                      !readIds.includes(notification.id),
                  ).length;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-brand-primary text-white"
                    : "text-text-secondary hover:bg-brand-primary-light hover:text-brand-primary"
                }`}
              >
                {category}
                {count > 0 && (
                  <span
                    className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] ${activeCategory === category ? "bg-white/20" : "bg-brand-primary-light text-brand-primary"}`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-7 space-y-3">
          {["Hari ini", "Kemarin"].map((group) => {
            const groupNotifications = visibleNotifications.filter(
              (notification) => notification.group === group,
            );

            if (groupNotifications.length === 0) return null;

            return (
              <section key={group} aria-labelledby={`notifications-${group}`}>
                <h2
                  id={`notifications-${group}`}
                  className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted"
                >
                  {group}
                </h2>
                <div className="space-y-3">
                  {groupNotifications.map((notification) => {
                    const isRead = readIds.includes(notification.id);

                    return (
                      <article
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`group relative flex cursor-pointer gap-4 rounded-xl border bg-white p-4 transition-shadow hover:shadow-md sm:p-5 ${isRead ? "border-border" : "border-brand-primary-muted"}`}
                      >
                        {!isRead && (
                          <span
                            className="absolute left-3 top-7 size-2 rounded-full bg-brand-primary"
                            aria-label="Belum dibaca"
                          />
                        )}
                        <div
                          className={`ml-3 flex size-10 shrink-0 items-center justify-center rounded-full ${iconStyles[notification.icon]}`}
                        >
                          <NotificationIcon type={notification.icon} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <h3 className="text-sm font-bold text-text-primary">
                              {notification.title}
                            </h3>
                            <time className="shrink-0 text-[11px] text-text-muted">
                              {notification.time}
                            </time>
                          </div>
                          <p className="mt-1 max-w-3xl text-xs leading-5 text-text-secondary sm:text-sm">
                            {notification.description}
                          </p>
                          {notification.id === 1 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="rounded-md bg-brand-primary px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-brand-primary-hover"
                              >
                                Terima
                              </button>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className="rounded-md border border-border px-3 py-1.5 text-[11px] font-semibold text-text-secondary hover:border-brand-primary hover:text-brand-primary"
                              >
                                Tolak
                              </button>
                              <button
                                type="button"
                                className="px-1 text-[11px] font-medium text-text-muted hover:text-brand-primary"
                              >
                                Lihat Detail Tim
                              </button>
                            </div>
                          )}
                          {notification.id === 2 && (
                            <button
                              type="button"
                              className="mt-3 text-[11px] font-semibold text-brand-primary hover:underline"
                            >
                              Buka Ruang Tim →
                            </button>
                          )}
                          {notification.id === 4 && (
                            <button
                              type="button"
                              className="mt-3 text-[11px] font-semibold text-text-primary hover:text-brand-primary"
                            >
                              Lihat Timeline Kompetisi →
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
          {visibleNotifications.length === 0 && (
            <div className="rounded-xl border border-dashed border-border-strong bg-white px-6 py-14 text-center text-sm text-text-secondary">
              Belum ada notifikasi di kategori ini.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
