import { Heart, LayoutGrid } from "lucide-react";

type TeamMode = "grid" | "swipe";

type TeamModeToggleProps = {
  mode: TeamMode;
  onModeChange: (mode: TeamMode) => void;
};

export default function TeamModeToggle({
  mode,
  onModeChange,
}: TeamModeToggleProps) {
  return (
    <div className="mt-6 flex justify-center">
      <div className="inline-flex rounded-xl border border-border bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => onModeChange("grid")}
          aria-pressed={mode === "grid"}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${mode === "grid" ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-background-muted"}`}
        >
          <LayoutGrid className="size-4" aria-hidden="true" />
          Grid
        </button>
        <button
          type="button"
          onClick={() => onModeChange("swipe")}
          aria-pressed={mode === "swipe"}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${mode === "swipe" ? "bg-brand-primary text-white" : "text-text-secondary hover:bg-background-muted"}`}
        >
          <Heart className="size-4" aria-hidden="true" />
          Swipe
        </button>
      </div>
    </div>
  );
}
