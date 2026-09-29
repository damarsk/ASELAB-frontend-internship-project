import { Check, Clock3, X } from "lucide-react";
import { statusLabels } from "./data";
import type { JoinRequest, RequestStatus } from "./types";

export default function RequestCard({
  request,
  onUpdate,
}: {
  request: JoinRequest;
  onUpdate: (id: number, status: RequestStatus) => void;
}) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        <div
          className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${request.color}`}
        >
          {request.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div>
              <h3 className="font-bold text-text-primary">{request.name}</h3>
              <p className="mt-1 text-sm text-text-secondary">{request.role}</p>
            </div>
            <span
              className={`flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-xs font-medium ${request.status === "pending" ? "bg-warning-light text-amber-700" : request.status === "accepted" ? "bg-success-light text-brand-primary" : "bg-danger-light text-red-600"}`}
            >
              <span className="size-1.5 rounded-full bg-current" />
              {statusLabels[request.status]}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {request.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-background-muted px-2.5 py-1 text-xs text-text-secondary"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-text-secondary">
            “{request.message}”
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-text-muted">
            <Clock3 className="size-3.5" /> {request.time}
          </div>
        </div>
        <div className="flex shrink-0 gap-2 border-t border-border pt-4 lg:w-36 lg:flex-col lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          {request.status === "pending" ? (
            <>
              <button
                type="button"
                onClick={() => onUpdate(request.id, "accepted")}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-primary px-3 py-2.5 text-xs font-semibold text-white hover:bg-brand-primary-hover"
              >
                <Check className="size-4" /> Terima
              </button>
              <button
                type="button"
                onClick={() => onUpdate(request.id, "rejected")}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-strong px-3 py-2.5 text-xs font-semibold text-text-secondary hover:border-red-300 hover:text-red-600"
              >
                <X className="size-4" /> Tolak
              </button>
            </>
          ) : (
            <span className="flex items-center justify-center gap-1.5 py-2 text-xs text-text-muted">
              {request.status === "accepted" ? (
                <>
                  <Check className="size-4 text-brand-primary" /> Sudah diterima
                </>
              ) : (
                <>
                  <X className="size-4 text-red-500" /> Ditolak
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
