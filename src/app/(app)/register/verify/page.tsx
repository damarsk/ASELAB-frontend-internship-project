"use client";

import VerifyOTP from "@/src/components/auth/VerifyOTP";
import { Suspense } from "react";

export default function VerificationPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <VerifyOTP />
      </Suspense>
    </main>
  );
}
