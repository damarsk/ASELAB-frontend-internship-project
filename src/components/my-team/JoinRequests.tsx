import { Search, Users } from "lucide-react";
import { statusLabels } from "./data";
import type { JoinRequest, RequestStatus } from "./types";
import RequestCard from "./RequestCard";

export default function JoinRequests({
  requests,
  search,
  activeFilter,
  onSearchChange,
  onFilterChange,
  onUpdate,
}: {
  requests: JoinRequest[];
  search: string;
  activeFilter: "all" | RequestStatus;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: "all" | RequestStatus) => void;
  onUpdate: (id: number, status: RequestStatus) => void;
}) {
  return (
    <section className="mt-8" aria-labelledby="requests-heading">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-brand-primary">
            Kelola pengguna
          </p>
          <h2
            id="requests-heading"
            className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl"
          >
            Join requests
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Tinjau permintaan dari orang yang ingin bergabung dengan tim kamu.
          </p>
        </div>
        <div className="relative w-full lg:max-w-xs">
          <Search
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Cari nama atau skill"
            aria-label="Cari join request"
            className="w-full rounded-lg border border-border-strong bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand-primary"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
          Filter
        </span>
        {(["all", "pending", "accepted", "rejected"] as const).map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeFilter === filter ? "bg-brand-primary text-white" : "bg-brand-primary-light text-brand-primary hover:bg-brand-primary-muted"}`}
          >
            {filter === "all" ? "Semua" : statusLabels[filter]}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {requests.length ? (
          requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
            <Users className="mx-auto size-8 text-text-muted" />
            <p className="mt-3 font-semibold text-text-primary">
              Tidak ada request ditemukan
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Coba ubah filter atau kata kunci pencarian.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
