"use client";

import Link from "next/link";
import Button from "../ui/Button";

export default function Header() {
  return (
    <nav className="h-20 bg-white shadow">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-8">
        <Link href="/" className="shrink-0">
          <h1 className="text-2xl font-bold text-brand-primary">
            🤝 Partner<span className="text-black">In</span>
          </h1>
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-medium text-text-secondary transition-colors duration-200 hover:text-brand-primary"
          >
            Beranda
          </Link>

          <Link
            href="/#cara-kerja"
            className="font-medium text-text-secondary transition-colors duration-200 hover:text-brand-primary"
          >
            Cara Kerja
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>

          <Link href="/register">
            <Button variant="solid">Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
