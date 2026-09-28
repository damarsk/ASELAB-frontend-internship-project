"use client";

import Link from "next/link";
import { Bell, CircleUserRound, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

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

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = status === "authenticated";

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

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <nav className="h-20 bg-white shadow">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-8">
        <Link href="/" className="shrink-0">
          <h1 className="text-2xl font-bold text-brand-primary">
            🤝 Partner<span className="text-black">In</span>
          </h1>
        </Link>

        <div className="flex items-center gap-10">
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

        <div className="flex items-center gap-6">
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              onClick={handleNotificationToggle}
              className="relative text-text-primary transition-colors hover:text-brand-primary"
              aria-label="Notifikasi"
              aria-expanded={isNotificationOpen}
            >
              <Bell size={28} strokeWidth={2} />

              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                3
              </span>
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                  <h2 className="font-semibold text-text-primary">
                    Notifikasi
                  </h2>

                  <button
                    type="button"
                    className="text-xs font-medium text-brand-primary hover:underline"
                  >
                    Tandai semua
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  <div className="flex cursor-pointer gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50">
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-primary" />

                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        Permintaan bergabung dengan tim
                      </p>
                      <p className="mt-1 text-xs text-text-secondary">
                        Andi mengirim permintaan untuk bergabung ke tim kamu.
                      </p>
                      <p className="mt-2 text-[11px] text-gray-400">
                        5 menit yang lalu
                      </p>
                    </div>
                  </div>

                  <div className="flex cursor-pointer gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50">
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-primary" />

                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        Kompetisi baru tersedia
                      </p>
                      <p className="mt-1 text-xs text-text-secondary">
                        Ada kompetisi baru yang mungkin sesuai dengan profil
                        kamu.
                      </p>
                      <p className="mt-2 text-[11px] text-gray-400">
                        1 jam yang lalu
                      </p>
                    </div>
                  </div>

                  <div className="flex cursor-pointer gap-3 px-4 py-3 transition-colors hover:bg-gray-50">
                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-primary" />

                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        Profil berhasil diperbarui
                      </p>
                      <p className="mt-1 text-xs text-text-secondary">
                        Informasi profil kamu berhasil disimpan.
                      </p>
                      <p className="mt-2 text-[11px] text-gray-400">Kemarin</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/notifikasi"
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
              className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-brand-primary text-white transition-opacity hover:opacity-90"
              aria-label="Profile"
              aria-expanded={isProfileOpen}
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <CircleUserRound size={25} strokeWidth={2} />
              )}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
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
                    href="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-gray-50"
                  >
                    <Settings size={18} strokeWidth={2} />
                    Settings
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
