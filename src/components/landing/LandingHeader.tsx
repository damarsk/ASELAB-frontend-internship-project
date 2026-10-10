"use client";

import { useSession } from "next-auth/react";
import Header from "./Header";
import DashHeader from "../dashboard/DashHeader";

export default function LandingHeader() {
  const { status } = useSession();

  if (status === "authenticated") {
    return <DashHeader />;
  }

  return <Header />;
}
