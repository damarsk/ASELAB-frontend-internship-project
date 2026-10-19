"use client";

import { usePathname } from "next/navigation";
import DashHeader from "@/src/components/dashboard/DashHeader";

const publicAuthPaths = ["/login", "/register"];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicAuthPage = publicAuthPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  return (
    <>
      {!isPublicAuthPage && <DashHeader />}
      {children}
    </>
  );
}
