"use client";

import {
  Check,
  MessageCircle,
  PartyPopper,
  Search,
  Trophy,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type {
  BackendNotification,
  NotificationsResponse,
} from "@/src/types/notification";

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
  group: "Hari ini" | "Kemarin" | "Sebelumnya";
  isRead: boolean;
  icon: "team" | "party" | "message" | "competition" | "search";
};

function getCategory(notification: BackendNotification): NotificationCategory {
  const text = `${notification.title} ${notification.message}`.toLowerCase();
  if (text.includes("kompetisi") || text.includes("lomba")) {
    return "Kompetisi";
  }
  if (
    text.includes("undang") ||
    text.includes("diterima") ||
    text.includes("ditolak") ||
    text.includes("bergabung")
  ) {
    return "Permintaan Tim";
  }
  return "Sistem";
}

function getIcon(category: NotificationCategory): Notification["icon"] {
  if (category === "Kompetisi") return "competition";
  if (category === "Permintaan Tim") return "team";
  return "message";
}

function getGroup(createdAt: string): Notification["group"] {
  const date = new Date(createdAt);
  const today = new Date();
  const dayDifference = Math.floor(
    (new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    ).getTime() -
      new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) /
      86400000,
  );
  if (dayDifference === 0) return "Hari ini";
  if (dayDifference === 1) return "Kemarin";
  return "Sebelumnya";
}

function formatNotificationTime(createdAt: string) {
  const date = new Date(createdAt);
  const diffMinutes = Math.round((date.getTime() - Date.now()) / 60000);
  if (Math.abs(diffMinutes) < 60) {
    return new Intl.RelativeTimeFormat("id", { numeric: "auto" }).format(
      diffMinutes,
      "minute",
    );
  }
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function mapNotification(notification: BackendNotification): Notification {
  const category = getCategory(notification);
  return {
    id: notification.id,
    category,
    title: notification.title,
    description: notification.message,
    time: formatNotificationTime(notification.createdAt),
    group: getGroup(notification.createdAt),
    isRead: notification.isRead,
    icon: getIcon(category),
  };
}

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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  useEffect(() => {
    const controller = new AbortController();

    const loadNotifications = async () => {
      try {
        const response = await fetch("/api/notifications?page=1&limit=100", {
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });
        const result = (await response.json()) as NotificationsResponse;
        if (!response.ok) {
          throw new Error(
            result.error ?? result.message ?? "Gagal memuat notifikasi.",
          );
        }
        setNotifications((result.data ?? []).map(mapNotification));
      } catch (loadError) {
        if (
          loadError instanceof DOMException &&
          loadError.name === "AbortError"
        ) {
          return;
        }
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Gagal memuat notifikasi.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    const handleNotificationsUpdated = () => {
      void loadNotifications();
    };

    window.addEventListener(
      "notifications-updated",
      handleNotificationsUpdated,
    );
    void loadNotifications();

    return () => {
      controller.abort();
      window.removeEventListener(
        "notifications-updated",
        handleNotificationsUpdated,
      );
    };
  }, []);

  const visibleNotifications = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          activeCategory === "Semua" ||
          notification.category === activeCategory,
      ),
    [activeCategory, notifications],
  );

  const markAllAsRead = async () => {
    if (unreadCount === 0) return;
    const response = await fetch("/api/notifications/read-all", {
      method: "PATCH",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Gagal menandai semua notifikasi.");

    setNotifications((current) =>
      current.map((notification) => ({ ...notification, isRead: true })),
    );
    window.dispatchEvent(new Event("notifications-updated"));
  };

  const markAsRead = async (id: number) => {
    const notification = notifications.find((item) => item.id === id);
    if (!notification || notification.isRead) return;

    const response = await fetch(`/api/notifications/${id}/read`, {
      method: "PATCH",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Gagal menandai notifikasi.");

    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, isRead: true } : item,
      ),
    );
    window.dispatchEvent(new Event("notifications-updated"));
  };

  return (
    <>
      <main className="mx-auto min-h-[calc(100vh-5rem)] max-w-7xl px-6 py-8 sm:px-8 sm:py-10">
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
            onClick={() =>
              void markAllAsRead().catch((markError) => {
                setError(
                  markError instanceof Error
                    ? markError.message
                    : "Gagal menandai semua notifikasi.",
                );
              })
            }
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
                      !notification.isRead,
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

        {isLoading ? (
          <p className="mt-7 rounded-xl border border-border bg-white px-6 py-14 text-center text-sm text-text-secondary">
            Memuat notifikasi...
          </p>
        ) : error ? (
          <p
            className="mt-7 rounded-xl border border-red-200 bg-red-50 px-6 py-14 text-center text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        ) : (
          <div className="mt-7 space-y-3">
            {["Hari ini", "Kemarin", "Sebelumnya"].map((group) => {
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
                      const isRead = notification.isRead;

                      return (
                        <article
                          key={notification.id}
                          onClick={() =>
                            void markAsRead(notification.id).catch(
                              (markError) => {
                                setError(
                                  markError instanceof Error
                                    ? markError.message
                                    : "Gagal menandai notifikasi.",
                                );
                              },
                            )
                          }
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
        )}
      </main>
    </>
  );
}
