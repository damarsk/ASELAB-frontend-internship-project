import Link from "next/link";

export default function Footer() {
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
        </nav>
      </div>
    </footer>
  );
}
