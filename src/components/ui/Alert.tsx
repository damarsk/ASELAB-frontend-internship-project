"use client";

import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

const variantClasses: Record<AlertVariant, string> = {
  primary: "border-blue-300 bg-blue-100 text-blue-900",
  secondary: "border-gray-300 bg-gray-200 text-gray-800",
  success: "border-emerald-300 bg-emerald-100 text-emerald-900",
  danger: "border-red-300 bg-red-100 text-red-900",
  warning: "border-amber-300 bg-amber-100 text-amber-900",
  info: "border-cyan-300 bg-cyan-100 text-cyan-900",
  light: "border-gray-200 bg-gray-50 text-gray-700",
  dark: "border-slate-400 bg-slate-300 text-slate-700",
};

export function Alert({
  children,
  variant = "light",
  autoDismissMs = 5000,
  dismissible = true,
}: {
  children: ReactNode;
  variant?: AlertVariant;
  autoDismissMs?: number;
  dismissible?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (!autoDismissMs) {
      return;
    }

    const fadeTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, autoDismissMs);

    const dismissTimer = window.setTimeout(() => {
      setIsDismissed(true);
    }, autoDismissMs + 300);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(dismissTimer);
    };
  }, [autoDismissMs]);

  const dismiss = () => {
    setIsVisible(false);
    window.setTimeout(() => setIsDismissed(true), 300);
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div
      role="alert"
      className={`flex items-start justify-between gap-4 rounded-md border px-4 py-4 text-sm transition-opacity duration-300 ${variantClasses[variant]} ${isVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <span>{children}</span>

      {dismissible && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="Tutup notifikasi"
          className="shrink-0 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-offset-2"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
