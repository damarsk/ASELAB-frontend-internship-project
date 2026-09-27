type DashboardHeroProps = {
  loading: boolean;
  error: string | null;
  username: string | null;
};

export default function DashboardHero({
  loading,
  error,
  username,
}: DashboardHeroProps) {
  return (
    <section>
      <div className="flex h-64 items-center bg-brand-primary-light py-4">
        <div className="mx-auto w-full max-w-6xl px-8">
          {loading ? (
            <div className="space-y-4">
              <div className="h-10 w-72 animate-pulse rounded-md bg-white/70" />
              <div className="h-10 w-80 animate-pulse rounded-md bg-white/70" />
              <div className="h-10 w-md animate-pulse rounded-md bg-white/70" />
            </div>
          ) : error ? (
            <div>
              <h1 className="mb-2 text-2xl font-medium text-red-500">
                Gagal memuat profil
              </h1>
              <p className="text-sm text-gray-600">{error}</p>
            </div>
          ) : (
            <>
              <h1 className="mb-4 text-4xl font-medium">Halo, {username} 👋</h1>
              <p className="text-4xl font-medium">Temukan Tim yang Cocok</p>
              <p className="text-4xl font-medium text-brand-primary">
                Berdasarkan skill dan minatmu
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
