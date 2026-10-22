import type { ReactNode } from "react";
import { Mail, MoreHorizontal, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import UserAvatar from "@/src/components/ui/UserAvatar";
import type { TeamMember } from "./types";

type MemberActionProps = {
  member: TeamMember;
  isLeader: boolean;
};

function MemberActionDropdown({ member, isLeader }: MemberActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        aria-label={`Opsi untuk ${member.name}`}
        className="text-text-muted hover:text-text-primary"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MoreHorizontal className="size-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-50 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="p-1">
            <Link
              href={`/profile/${member.userId ?? "unknown"}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} strokeWidth={2} />
              Lihat Profil
            </Link>
            {isLeader && (
              <div className="my-1 border-t border-gray-100" />
            )}
            {isLeader && (
              <button
                type="button"
                disabled
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 cursor-not-allowed"
              >
                <LogOut size={16} strokeWidth={2} />
                Keluarkan User
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MembersOverview({
  members,
  quota,
  action,
  showMemberActions = true,
  isLeader = false,
}: {
  members: TeamMember[];
  quota?: number;
  action?: ReactNode;
  showMemberActions?: boolean;
  isLeader?: boolean;
}) {
  return (
    <section className="mt-8" aria-labelledby="members-heading">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-brand-primary">Kolaborasi</p>
          <h2
            id="members-heading"
            className="mt-1 text-2xl font-bold text-text-primary"
          >
            Anggota tim
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            {members.length}
            {typeof quota === "number" ? `/${quota}` : ""} anggota di tim ini
          </p>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <article
            key={`${member.name}-${member.role}-${member.department ?? ""}`}
            className="rounded-2xl border border-border bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <UserAvatar
                name={member.name}
                imageUrl={member.fotoProfilUrl}
                size={48}
                className="rounded-xl"
              />
              {showMemberActions && (
                <MemberActionDropdown
                  member={member}
                  isLeader={isLeader}
                />
              )}
            </div>
            <h3 className="mt-5 font-semibold text-text-primary">
              {member.name}
            </h3>
            {member.department && (
              <p className="mt-1 text-sm text-text-secondary">
                {member.department}
              </p>
            )}
            <p className="mt-1 text-xs font-semibold text-brand-primary">
              {member.role}
            </p>
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-text-muted">
              <Mail className="size-3.5" /> Aktif di tim
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
