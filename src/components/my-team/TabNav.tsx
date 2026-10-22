export type TabItem<T extends string> = {
  id: T;
  label: string;
  badge?: number | string;
};

export default function TabNav<T extends string>({
  tabs,
  activeTab,
  onChange,
  ariaLabel = "Navigasi tim",
}: {
  tabs: ReadonlyArray<TabItem<T>>;
  activeTab: T;
  onChange: (tab: T) => void;
  ariaLabel?: string;
}) {
  return (
    <nav
      className="mt-8 flex gap-7 overflow-x-auto border-b border-border"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-current={isActive ? "page" : undefined}
            className={`relative whitespace-nowrap pb-4 text-sm font-semibold transition-colors ${
              isActive
                ? "text-brand-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
            {tab.badge !== undefined && tab.badge !== null && (
              <span className="ml-1 rounded-full bg-brand-primary-light px-2 py-0.5 text-xs">
                {tab.badge}
              </span>
            )}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-primary" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
