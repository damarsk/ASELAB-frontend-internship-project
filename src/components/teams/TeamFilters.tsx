"use client";

import { Search } from "lucide-react";

type TeamFiltersProps = {
  search: string;
  skill: string;
  skills: string[];
  onSearchChange: (value: string) => void;
  onSkillChange: (value: string) => void;
};

export default function TeamFilters({
  search,
  skill,
  skills,
  onSearchChange,
  onSkillChange,
}: TeamFiltersProps) {
  return (
    <form
      className="mt-8 flex flex-col gap-3 rounded-2xl border border-border-strong bg-white p-3 shadow-sm sm:flex-row"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-border px-4">
        <Search
          className="size-5 shrink-0 text-text-secondary"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari tim, kompetisi, atau skill..."
          aria-label="Cari tim, kompetisi, atau skill"
          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-text-primary outline-none placeholder:text-text-secondary"
        />
      </div>
      <label className="flex items-center rounded-xl border border-border px-4 sm:w-56">
        <span className="sr-only">Filter berdasarkan skill</span>
        <select
          value={skill}
          onChange={(event) => onSkillChange(event.target.value)}
          className="w-full bg-transparent py-3 text-sm text-text-primary outline-none"
          aria-label="Filter berdasarkan skill"
        >
          <option value="all">Semua skill</option>
          {skills.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
      >
        Cari
      </button>
    </form>
  );
}
