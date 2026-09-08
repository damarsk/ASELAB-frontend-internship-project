export default function Main() {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-background">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl grid-cols-1 items-center gap-16 px-8 py-16 lg:grid-cols-2">
        <div className="max-w-xl">
          <div className="mb-12 flex items-center gap-2 text-lg font-semibold text-brand-primary">
            <span className="text-xl">✦</span>
            <span>Temukan Tim Impianmu</span>
          </div>

          <h2 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-black sm:text-6xl">
            Temukan
            <span className="block text-brand-primary-muted">
              Partner Lomba
            </span>
            yang Tepat
            <span className="block">untukmu.</span>
          </h2>

          <p className="mt-12 max-w-lg text-lg leading-7 text-text-secondary">
            Temukan mahasiswa dengan skill dan minat yang saling melengkapi
            untuk membangun tim lomba yang lebih solid.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-brand-primary px-8 font-semibold text-white transition-all duration-200 hover:bg-brand-primary-hover hover:shadow-lg"
            >
              Cari Partner →
            </a>

            <a
              href="#"
              className="inline-flex h-14 items-center justify-center rounded-lg border border-border bg-white px-8 font-semibold text-text-primary transition-all duration-200 hover:border-brand-primary hover:text-brand-primary"
            >
              Pelajari Cara Kerja
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="absolute -top-12 right-72 z-10 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-lg">
            92% <span className="text-brand-primary">Cocok!!</span>
          </div>

          <div className="w-full max-w-sm border border-border bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-background-muted">
                <div className="text-4xl">👩🏻‍💼</div>
              </div>

              <h3 className="text-lg font-bold text-text-primary">
                Nasgor Gila
              </h3>

              <p className="text-sm text-text-secondary">NusaHack 2026</p>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-sm text-text-primary">
                👥 <span className="font-medium">3/4 Anggota</span>
              </p>

              <p className="text-sm text-text-secondary">Skill Dibutuhkan</p>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-brand-primary-light px-3 py-1 text-xs font-medium text-brand-primary">
                  UI/UX
                </span>
                <span className="rounded-full bg-brand-primary-light px-3 py-1 text-xs font-medium text-brand-primary">
                  Front-End
                </span>
                <span className="rounded-full bg-brand-primary-light px-3 py-1 text-xs font-medium text-brand-primary">
                  Back-End
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-text-primary">Kecocokan</span>
                <span className="font-medium text-text-primary">92%</span>
              </div>

              <div className="h-2 w-full bg-background-muted">
                <div className="h-full w-[92%] bg-brand-primary" />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <a
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
              >
                Lihat Tim →
              </a>
            </div>
          </div>

          <div className="absolute -bottom-10 right-0 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-lg">
            <span className="text-text-primary">1 Posisi Tersedia</span>
          </div>
        </div>
      </section>
    </main>
  );
}
