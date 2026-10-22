import TabNav, { type TabItem } from "./TabNav";

export type TeamTab = "overview" | "requests" | "settings";

export default function TeamTabs({
  activeTab,
  pendingCount,
  isLeader,
  onChange,
}: {
  activeTab: TeamTab;
  pendingCount: number;
  isLeader: boolean;
  onChange: (tab: TeamTab) => void;
}) {
  // Hanya Team Leader yang boleh mengelola join request dan pengaturan tim.
  const tabs: ReadonlyArray<TabItem<TeamTab>> = isLeader
    ? [
        { id: "overview", label: "Overview" },
        { id: "requests", label: "Join Requests", badge: pendingCount },
        { id: "settings", label: "Settings" },
      ]
    : [{ id: "overview", label: "Overview" }];

  return <TabNav tabs={tabs} activeTab={activeTab} onChange={onChange} />;
}
