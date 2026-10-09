export type TeamTab = "overview" | "requests" | "settings";

export default function TeamTabs({
  activeTab,
  pendingCount,
  onChange,
}: {
  activeTab: TeamTab;
  pendingCount: number;
  onChange: (tab: TeamTab) => void;
}) {
  return (
    <nav
      className="mt-8 flex gap-7 overflow-x-auto border-b border-border"
      aria-label="Navigasi tim"
    >
      {(["overview", "requests", "settings"] as const).map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`relative whitespace-nowrap pb-4 text-sm font-semibold transition-colors ${activeTab === tab ? "text-brand-primary" : "text-text-secondary hover:text-text-primary"}`}
        >
          {tab === "overview" ? (
            "Overview"
          ) : tab === "requests" ? (
            <>
              Join Requests{" "}
              <span className="ml-1 rounded-full bg-brand-primary-light px-2 py-0.5 text-xs">
                {pendingCount}
              </span>
            </>
          ) : (
            "Settings"
          )}
          {activeTab === tab && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-primary" />
          )}
        </button>
      ))}
    </nav>
  );
}
