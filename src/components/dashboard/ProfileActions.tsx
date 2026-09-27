import { ArrowRight, Check, UserRound, UsersRound, X } from "lucide-react";

export default function ProfileActions() {
  return (
    <section className="mx-auto grid max-w-6xl gap-8 pt-10 lg:grid-cols-2 lg:pt-14">
      <article className="border border-brand-primary-muted bg-brand-primary-light/50 px-8 py-7 text-center sm:px-10">
        <div className="flex items-center gap-3 text-left">
          <div className="flex size-9 items-center justify-center bg-white">
            <UsersRound className="size-6 text-black" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">
              Tim Saya
            </h2>
            <p className="text-base text-text-secondary">
              Status Partisipasi Kompetisi
            </p>
          </div>
        </div>
        <div className="mt-5 flex min-h-37.5 flex-col items-center justify-center bg-brand-primary-muted/40 px-4">
          <UserRound className="size-9 text-text-primary" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-semibold text-text-primary">
            Mulai Perjalanan Kemenanganmu!
          </h3>
          <p className="mt-2 max-w-md text-xs leading-4 text-text-primary">
            Belum punya tim untuk kompetisi terdekat? Buat timmu sendiri dan
            rekrut talenta terbaik kampus!
          </p>
        </div>
        <button className="mt-9 inline-flex items-center rounded-md bg-brand-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-primary-hover">
          + Buat Tim Baru
        </button>
      </article>
      <article className="border border-brand-primary-muted bg-brand-primary-light/50 px-8 py-7 sm:px-10">
        <h2 className="text-2xl font-semibold text-text-primary">
          Lengkapi Profil
        </h2>
        <p className="mt-4 text-xs text-text-primary">
          Profil lengkap meningkatkan peluangmu diajak bergabung hingga 3x
          lipat!
        </p>
        <div className="mt-6 flex items-center justify-between text-[10px] text-text-primary">
          <span>Kelengkapan Data Portofolio</span>
          <span>87%</span>
        </div>
        <div className="mt-1 h-1.5 w-full bg-white">
          <div className="h-full w-[87%] bg-brand-primary" />
        </div>
        <ul className="mt-7 space-y-3 text-xs text-text-primary">
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>Portofolio GitHub &amp; Proyek Unggulan terpasang</span>
          </li>
          <li className="flex items-start gap-3">
            <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>Pengalaman lomba &amp; spesialisasi frontend tercatat</span>
          </li>
          <li className="flex items-start gap-3">
            <X className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>Belum verifikasi Kartu Tanda Mahasiswa (KTM) / Kampus</span>
          </li>
        </ul>
        <div className="mt-9 flex justify-center">
          <button className="inline-flex items-center gap-1 rounded-md bg-brand-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-primary-hover">
            Lengkapi Sekarang{" "}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </article>
    </section>
  );
}
