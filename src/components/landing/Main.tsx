import Link from "next/link";

export default function Main() {
  return (
    <main className="min-h-[calc(100vh-5rem)]">
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
              href="#cara-kerja"
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

      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl">
              Temukan Tim yang Tepat,{" "}
              <span className="text-brand-primary">
                Raih Lebih Banyak Peluang
              </span>
            </h2>
            <p className="mt-4 text-base text-text-secondary">
              Temukan tim berdasarkan skill, minat, dan lomba.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-light">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Temukan Tim
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Jelajahi tim yang mencari anggota
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-light">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Cocokkan Skill
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Temukan tim yang sesuai skillmu
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-light">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Bergabung &amp; berkolaborasi
              </h3>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                Kirim permintaan bergabung &amp; mulai bersama
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20" id="cara-kerja">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl">
              Cara Kerja
            </h2>
            <p className="mt-4 text-base text-text-secondary">
              Mulai perjalananmu dalam 4 langkah sederhana
            </p>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-6 sm:flex-row sm:justify-center sm:gap-4">
            <div className="w-full rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="text-3xl font-bold text-text-primary">1</div>
              <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-light">
                <span className="text-xl">👥</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Buat Profil
              </h3>
            </div>

            <span className="hidden text-2xl text-text-muted sm:block">→</span>

            <div className="w-full rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="text-3xl font-bold text-text-primary">2</div>
              <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-light">
                <span className="text-xl">🔍</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Temukan Tim
              </h3>
            </div>

            <span className="hidden text-2xl text-text-muted sm:block">→</span>

            <div className="w-full rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="text-3xl font-bold text-text-primary">3</div>
              <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-light">
                <span className="text-xl">+</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Join Request
              </h3>
            </div>

            <span className="hidden text-2xl text-text-muted sm:block">→</span>

            <div className="w-full rounded-xl border border-border bg-background-white p-8 text-center shadow-sm">
              <div className="text-3xl font-bold text-text-primary">4</div>
              <div className="mx-auto my-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary-light">
                <span className="text-xl">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Kolaborasi
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-secondary">
              Tim yang sesuai skill mu
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-background-muted">
                <span className="text-3xl">👩‍💼</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-4">
                Nebula Team
              </h3>
              <p className="mt-1 text-sm text-text-secondary">NusaHack 2026</p>
              <p className="mt-2 text-sm text-text-primary">
                👥 <span className="font-medium">2/4 Anggota</span>
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                Skill Dibutuhkan
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 mb-4">
                <span className="rounded-full bg-brand-primary-light px-3 py-1 text-xs font-medium text-brand-primary">
                  UI/UX
                </span>
                <span className="rounded-full bg-brand-primary-light px-3 py-1 text-xs font-medium text-brand-primary">
                  Front-End
                </span>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-text-primary">
                    Kecocokan
                  </span>
                  <span className="font-medium text-text-primary">92%</span>
                </div>
                <div className="h-2 w-full bg-background-muted">
                  <div className="h-full w-[92%] bg-brand-primary" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
                >
                  Lihat Tim →
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-background-muted">
                <span className="text-3xl">👩‍💼</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-4">
                Pixel Squad
              </h3>
              <p className="mt-1 text-sm text-text-secondary">DataHack 2026</p>
              <p className="mt-2 text-sm text-text-primary">
                👥 <span className="font-medium">2/4 Anggota</span>
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                Skill Dibutuhkan
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 mb-4">
                <span className="rounded-full bg-brand-primary-light px-3 py-1 text-xs font-medium text-brand-primary">
                  Back-End
                </span>
                <span className="rounded-full bg-brand-primary-light px-3 py-1 text-xs font-medium text-brand-primary">
                  Front-End
                </span>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-text-primary">
                    Kecocokan
                  </span>
                  <span className="font-medium text-text-primary">87%</span>
                </div>
                <div className="h-2 w-full bg-background-muted">
                  <div className="h-full w-[87%] bg-brand-primary" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
                >
                  Lihat Tim →
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-background-muted">
                <span className="text-3xl">👩‍💼</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-4">
                InnovateX
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                Java Business 2026
              </p>
              <p className="mt-2 text-sm text-text-primary">
                👥 <span className="font-medium">2/4 Anggota</span>
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                Skill Dibutuhkan
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 mb-4">
                <span className="rounded-full bg-brand-primary-light px-3 py-1 text-xs font-medium text-brand-primary">
                  Data
                </span>
                <span className="rounded-full bg-brand-primary-light px-3 py-1 text-xs font-medium text-brand-primary">
                  Business
                </span>
              </div>
              <div className="mt-4">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-text-primary">
                    Kecocokan
                  </span>
                  <span className="font-medium text-text-primary">84%</span>
                </div>
                <div className="h-2 w-full bg-background-muted">
                  <div className="h-full w-[84%] bg-brand-primary" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-hover"
                >
                  Lihat Tim →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-brand-primary-light py-20">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl">
            Siap Menemukan Tim Lombamu?
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary">
            Lengkapi profil, temukan tim yang cocok,
            <br />
            dan mulai perjalanan kompetisimu.
          </p>
          <div className="mt-10">
            <Link
              href="/register"
              className="inline-flex h-14 items-center justify-center rounded-lg bg-brand-primary px-8 font-semibold text-white transition-all duration-200 hover:bg-brand-primary-hover hover:shadow-lg"
            >
              Daftar Sekarang →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
