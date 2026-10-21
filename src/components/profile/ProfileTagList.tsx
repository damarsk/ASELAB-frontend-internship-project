export default function ProfileTagList({
  items,
  emptyLabel = "Belum ada data.",
  tone = "primary",
}: {
  items: string[];
  emptyLabel?: string;
  tone?: "primary" | "neutral";
}) {
  if (items.length === 0) {
    return <p className="text-sm text-text-muted">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={
            tone === "primary"
              ? "rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
              : "rounded-full border border-border bg-background-muted px-3 py-1.5 text-xs font-medium text-text-secondary"
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}
