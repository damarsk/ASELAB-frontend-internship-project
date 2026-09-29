type TeamsIntroProps = {
  totalTeams: number;
};

export default function TeamsIntro({ totalTeams }: TeamsIntroProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary">
          Temukan partner lomba
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text-primary sm:text-4xl">
          Explore Tim
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-text-secondary sm:text-base">
          Cari tim yang sedang membuka kesempatan untuk anggota baru.
        </p>
      </div>
      <p className="text-sm text-text-secondary">{totalTeams} tim tersedia</p>
    </div>
  );
}
