import { ArrowRight, Check, UserRound, UsersRound, X } from "lucide-react";

type Profile = Record<string, unknown>;

type ProfileActionsProps = {
  profile: Profile | null;
  loading: boolean;
};

function hasValue(profile: Profile | null, keys: string[]) {
  if (!profile) return false;

  return keys.some((key) => {
    const value = profile[key];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "boolean") return value;
    return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
  });
}

export default function ProfileActions({
  profile,
  loading,
}: ProfileActionsProps) {
  const checklist = [
    {
      label: "Portofolio GitHub & Proyek Unggulan terpasang",
      complete: hasValue(profile, [
        "github",
        "githubUrl",
        "portofolioGithub",
        "portfolioGithub",
        "proyekUnggulan",
        "projects",
      ]),
    },
    {
      label: "Pengalaman lomba & spesialisasi tercatat",
      complete: hasValue(profile, [
        "pengalamanLomba",
        "competitionExperience",
        "spesialisasi",
        "specialization",
        "skills",
      ]),
    },
    {
      label: "Verifikasi Kartu Tanda Mahasiswa (KTM) / Kampus",
      complete: hasValue(profile, [
        "ktmVerified",
        "isKtmVerified",
        "kampusVerified",
        "isCampusVerified",
      ]),
    },
  ];
  const completedCount = checklist.filter((item) => item.complete).length;
  const completion = Math.round((completedCount / checklist.length) * 100);

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
          <span>Kelengkapan Data</span>
          <span>{loading ? "..." : `${completion}%`}</span>
        </div>
        <div className="mt-1 h-1.5 w-full bg-white">
          <div
            className="h-full bg-brand-primary transition-[width]"
            style={{ width: `${loading ? 0 : completion}%` }}
          />
        </div>
        <ul className="mt-7 space-y-3 text-xs text-text-primary">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              {item.complete ? (
                <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              ) : (
                <X className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              )}
              <span>{item.complete ? item.label : `Belum ${item.label.toLowerCase()}`}</span>
            </li>
          ))}
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
