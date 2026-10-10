"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <footer className="w-full border-t border-border bg-background-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤝</span>
            <span className="text-xl font-bold">
              <span className="text-brand-primary">Partner</span>
              <span className="text-foreground"> In</span>
            </span>
          </div>
          <p className="text-sm text-text-muted">
            © 2026 PartnerIn. All Right Reserved
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-base font-medium text-text-secondary transition-colors hover:text-brand-primary"
              >
                Home
              </Link>
              <Link
                href="/teams"
                className="text-base font-medium text-text-secondary transition-colors hover:text-brand-primary"
              >
                Cari Tim
              </Link>
              <Link
                href="/competitions"
                className="text-base font-medium text-text-secondary transition-colors hover:text-brand-primary"
              >
                Kompetisi
              </Link>
              <Link
                href="/my-teams"
                className="text-base font-medium text-text-secondary transition-colors hover:text-brand-primary"
              >
                Tim Saya
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="text-base font-medium text-text-secondary transition-colors hover:text-brand-primary"
              >
                Beranda
              </Link>
              <Link
                href="/#cara-kerja"
                className="text-base font-medium text-text-secondary transition-colors hover:text-brand-primary"
              >
                Cara Kerja
              </Link>
            </>
          )}
          <Link
            href="/terms"
            className="text-base font-medium text-text-secondary transition-colors hover:text-brand-primary"
          >
            Syarat &amp; Ketentuan
          </Link>
          <Link
            href="/privacy"
            className="text-base font-medium text-text-secondary transition-colors hover:text-brand-primary"
          >
            Kebijakan Privasi
          </Link>
        </nav>
      </div>
    </footer>
  );
}
