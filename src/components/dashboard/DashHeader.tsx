"use client";

import Link from "next/link";
import { Bell, CircleUserRound } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DashHeader() {
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";

  return (
    <nav className="h-20 bg-white shadow">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-8">
        <Link href="/" className="shrink-0">
          <h1 className="text-2xl font-bold text-brand-primary">
            🤝 Partner<span className="text-black">In</span>
          </h1>
        </Link>
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="font-medium text-brand-primary transition-colors duration-200"
          >
            Home
          </Link>

          <Link
            href="/cari-tim"
            className="font-medium text-text-secondary transition-colors duration-200 hover:text-brand-primary"
          >
            Cari Tim
          </Link>

          <Link
            href="/kompetisi"
            className="font-medium text-text-secondary transition-colors duration-200 hover:text-brand-primary"
          >
            Kompetisi
          </Link>

          <Link
            href="/tim-saya"
            className="font-medium text-text-secondary transition-colors duration-200 hover:text-brand-primary"
          >
            Tim Saya
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            className="text-text-primary transition-colors hover:text-brand-primary"
            aria-label="Notifikasi"
          >
            <Bell size={28} strokeWidth={2} />
          </button>

          <Link
            href="/profile"
            className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-brand-primary text-white transition-opacity hover:opacity-90"
            aria-label="Profile"
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
          </Link>
        </div>
      </div>
    </nav>
  );
}
