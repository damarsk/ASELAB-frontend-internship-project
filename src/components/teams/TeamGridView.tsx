import TeamCard from "@/src/components/teams/TeamCard";
import TeamPagination from "@/src/components/teams/TeamPagination";
import type { Team } from "@/src/components/dashboard/TeamSection";

type TeamGridViewProps = {
  teams: Team[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function TeamGridView({
  teams,
  currentPage,
  totalPages,
  onPageChange,
}: TeamGridViewProps) {
  if (teams.length === 0) {
    return (
      <p className="mt-16 text-center text-text-secondary">
        Tim yang kamu cari belum tersedia.
      </p>
    );
  }

  return (
    <>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.name} team={team} />
        ))}
      </div>
      <TeamPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
