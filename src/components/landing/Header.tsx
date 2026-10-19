"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";

export default function Header() {
  return (
    <nav className="h-20 bg-white shadow">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-8">
        <Link href="/" className="shrink-0">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-brand-primary">
            <Image src="/Frame.svg" alt="" width={36} height={36} />
            Troov
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
