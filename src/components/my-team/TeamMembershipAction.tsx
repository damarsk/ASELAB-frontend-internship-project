"use client";

import { useState } from "react";

export default function TeamMembershipAction({
  status,
}: {
  status: "joined" | "request";
}) {
  const [requested, setRequested] = useState(false);

  if (status === "joined") {
    return (
      <span className="h-fit rounded-md border border-emerald-200 bg-emerald-50 px-12 py-1.5 text-center text-sm font-medium text-emerald-700">
        Joined
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setRequested(true)}
      disabled={requested}
      className="h-fit rounded-md bg-brand-primary px-6 py-1.5 text-center text-sm font-medium text-white transition-colors hover:bg-brand-primary-hover disabled:cursor-default disabled:bg-emerald-100 disabled:text-emerald-700"
    >
      {requested ? "Request Sent" : "Request Join"}
    </button>
  );
}
