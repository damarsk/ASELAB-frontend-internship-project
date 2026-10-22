"use client";

import Link from "next/link";
import Image from "next/image";
import { resolveProfileImageUrl } from "@/src/lib/profile-image";
import { formatRelativeTime } from "@/src/lib/relative-time";
import { Bell, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type {
  BackendNotification,
  NotificationsResponse,
} from "@/src/types/notification";

type ProfileResponse = {
  data?: {
    profile?: {
      fotoProfilUrl?: string | null;
    } | null;
  } | null;
};

const navItems = [
  {
    href: "/dashboard",
    label: "Home",
    match: (pathname: string) => pathname === "/dashboard",
  },
  {
    href: "/teams",
    label: "Cari Tim",
    match: (pathname: string) =>
      pathname === "/teams" || pathname.startsWith("/teams/"),
  },
  {
    href: "/competitions",
    label: "Kompetisi",
    match: (pathname: string) =>
      pathname === "/competitions" || pathname.startsWith("/competitions/"),
  },
  {
    href: "/my-teams",
    label: "Tim Saya",
    match: (pathname: string) =>
      pathname === "/my-teams" || pathname.startsWith("/my-teams/"),
  },
];

export default function DashHeader() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/unknown.jpg");
  const [notifications, setNotifications] = useState<BackendNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = status === "authenticated";

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const controller = new AbortController();
    const handleProfileImageUpdated = (event: Event) => {
      const imageUrl = (event as CustomEvent<string>).detail;
      if (typeof imageUrl === "string" && imageUrl.trim()) {
        setProfileImage(imageUrl);
      }
    };

    window.addEventListener("profile-image-updated", handleProfileImageUpdated);

    const loadProfileImage = async () => {
      try {
        const response = await fetch("/api/auth/profile", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Gagal memuat foto profil.");
        }

        const result = (await response.json()) as ProfileResponse;
        const imageUrl = result.data?.profile?.fotoProfilUrl;
        setProfileImage(resolveProfileImageUrl(imageUrl));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Gagal memuat foto profil navbar:", error);
        setProfileImage("/unknown.jpg");
      }
    };

    void loadProfileImage();

    return () => {
      controller.abort();
      window.removeEventListener(
        "profile-image-updated",
        handleProfileImageUpdated,
      );
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const controller = new AbortController();
    const loadNotifications = async () => {
      setIsLoadingNotifications(true);
      try {
        const response = await fetch("/api/notifications?page=1&limit=5", {
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

        setNotifications(result.data ?? []);
        setUnreadCount(result.unreadCount ?? 0);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Gagal memuat notifikasi navbar:", error);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoadingNotifications(false);
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
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setIsNotificationOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNotificationOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleNotificationToggle = () => {
    setIsNotificationOpen((prev) => !prev);
    setIsProfileOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen((prev) => !prev);
    setIsNotificationOpen(false);
  };

  const markAllNotificationsAsRead = async () => {
    if (unreadCount === 0) return;

    const response = await fetch("/api/notifications/read-all", {
      method: "PATCH",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Gagal menandai semua notifikasi.");
    }

    setNotifications((current) =>
      current.map((notification) => ({ ...notification, isRead: true })),
    );
    setUnreadCount(0);
    window.dispatchEvent(new Event("notifications-updated"));
  };

  const markNotificationAsRead = async (notification: BackendNotification) => {
    if (notification.isRead) return;

    const response = await fetch(`/api/notifications/${notification.id}/read`, {
      method: "PATCH",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Gagal menandai notifikasi.");
    }

    setNotifications((current) =>
      current.map((item) =>
        item.id === notification.id ? { ...item, isRead: true } : item,
      ),
    );
    setUnreadCount((current) => Math.max(0, current - 1));
    window.dispatchEvent(new Event("notifications-updated"));
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  const displayedProfileImage = isLoggedIn ? profileImage : "/unknown.jpg";

  return (
    <nav className="h-20 bg-white shadow">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-8">
        <Link href="/dashboard" className="shrink-0">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-primary">
            <Image src="/Frame.svg" alt="" width={36} height={36} />
            Troov
          </h1>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {navItems.map((item) => {
            const isActive = item.match(pathname);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-brand-primary"
                    : "text-text-secondary hover:text-brand-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              onClick={handleNotificationToggle}
              className="relative text-text-primary transition-colors hover:text-brand-primary"
              aria-label="Notifikasi"
              aria-expanded={isNotificationOpen}
            >
              <Bell size={21} strokeWidth={2} />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                  <h2 className="font-semibold text-text-primary">
                    Notifikasi
                  </h2>

                  <button
                    type="button"
                    onClick={() =>
                      void markAllNotificationsAsRead().catch((error) => {
                        console.error(
                          "Gagal menandai semua notifikasi:",
                          error,
                        );
                      })
                    }
                    disabled={unreadCount === 0}
                    className="text-xs font-medium text-brand-primary hover:underline disabled:cursor-default disabled:text-text-muted"
                  >
                    Tandai semua
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {isLoadingNotifications ? (
                    <p className="px-4 py-8 text-center text-xs text-text-secondary">
                      Memuat notifikasi...
                    </p>
                  ) : notifications.length === 0 ? (
                    <p className="px-4 py-8 text-center text-xs text-text-secondary">
                      Belum ada notifikasi.
                    </p>
                  ) : (
                    notifications.map((notification) => (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          void markNotificationAsRead(notification).catch(
                            (error) => {
                              console.error(
                                "Gagal menandai notifikasi:",
                                error,
                              );
                            },
                          )
                        }
                        className="flex w-full gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                      >
                        <div
                          className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                            notification.isRead
                              ? "bg-transparent"
                              : "bg-brand-primary"
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-text-primary">
                            {notification.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs text-text-secondary">
                            {notification.message}
                          </p>
                          <p className="mt-2 text-[11px] text-gray-400">
                            {formatRelativeTime(notification.createdAt)}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                <Link
                  href="/notifications"
                  onClick={() => setIsNotificationOpen(false)}
                  className="block border-t border-gray-100 px-4 py-3 text-center text-sm font-medium text-brand-primary transition-colors hover:bg-gray-50"
                >
                  Lihat semua notifikasi
                </Link>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={handleProfileToggle}
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-brand-primary text-white transition-opacity hover:opacity-90"
              aria-label="Profile"
              aria-expanded={isProfileOpen}
            >
              <Image
                src={displayedProfileImage}
                alt={session?.user?.name ?? "Profile"}
                width={36}
                height={36}
                unoptimized
                className="h-full w-full object-cover"
                onError={() => setProfileImage("/unknown.jpg")}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    {session?.user?.name ?? "User"}
                  </p>

                  {session?.user?.email && (
                    <p className="mt-1 truncate text-xs text-text-secondary">
                      {session.user.email}
                    </p>
                  )}
                </div>

                <div className="p-2">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-gray-50"
                  >
                    <User size={18} strokeWidth={2} />
                    Profile
                  </Link>

                  {isLoggedIn && (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut size={18} strokeWidth={2} />
                      Logout
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
