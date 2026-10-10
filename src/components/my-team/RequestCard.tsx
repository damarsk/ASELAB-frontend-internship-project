import { ArrowRight, Check, Clock3, X } from "lucide-react";
import { statusLabels } from "./data";
import type { JoinRequest, RequestStatus } from "./types";

export default function RequestCard({
  request,
  onRequestAction,
}: {
  request: JoinRequest;
  onRequestAction: (id: number, status: RequestStatus) => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start">
          <div className="flex shrink-0 flex-col items-start gap-4 sm:w-28">
            <div
              className={`flex size-24 items-center justify-center rounded-full text-lg font-bold ring-4 ring-background-muted ${request.color}`}
            >
              {request.initials}
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-1 rounded-lg bg-sky-400 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-500"
            >
              Lihat Profil <ArrowRight className="size-3.5" />
            </button>
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <div>
                <h3 className="font-bold text-text-primary">{request.name}</h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {request.role}
                </p>
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
            <p className="mt-4 h-12 line-clamp-2 overflow-hidden text-sm leading-6 text-text-secondary">
              “{request.message}”
            </p>
            <div className="mt-auto flex w-full gap-3 pt-5">
              {request.status === "pending" ? (
                <>
                  <button
                    type="button"
                    onClick={() => onRequestAction(request.id, "accepted")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-primary px-3 py-2 text-sm font-semibold text-white hover:bg-brand-primary-hover"
                  >
                    Terima Permintaan
                  </button>
                  <button
                    type="button"
                    onClick={() => onRequestAction(request.id, "rejected")}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-600"
                  >
                    Tolak Permintaan
                  </button>
                </>
              ) : (
                <span className="flex items-center justify-center gap-1.5 py-2 text-xs text-text-muted">
                  {request.status === "accepted" ? (
                    <>
                      <Check className="size-4 text-brand-primary" /> Sudah
                      diterima
                    </>
                  ) : (
                    <>
                      <X className="size-4 text-red-500" /> Ditolak
                    </>
                  )}
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-text-muted">
              <Clock3 className="size-3.5" /> {request.time}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
