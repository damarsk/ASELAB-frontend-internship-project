import { ArrowRight, Check, UserRound, UsersRound, X } from "lucide-react";
import Link from "next/link";

type Profile = Record<string, unknown>;

type ProfileActionsProps = {
  profile: Profile | null;
  loading: boolean;
};

function hasProfileValue(profile: Profile | null, key: string) {
  if (!profile) return false;

  const profileData =
    profile.profile && typeof profile.profile === "object"
      ? (profile.profile as Profile)
      : null;
  const value = profile[key] ?? profileData?.[key];

  if (Array.isArray(value)) return value.length > 0;
  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
}

export default function ProfileActions({
  profile,
  loading,
}: ProfileActionsProps) {
  const profileFields = [
    hasProfileValue(profile, "nama"),
    hasProfileValue(profile, "jurusan"),
    hasProfileValue(profile, "skill"),
    hasProfileValue(profile, "minat"),
    hasProfileValue(profile, "tentang"),
    hasProfileValue(profile, "pengalamanLomba"),
    hasProfileValue(profile, "fotoProfilUrl"),
    hasProfileValue(profile, "cvPath"),
  ];
  const completedProfileFields = profileFields.filter(Boolean).length;
  const completion = Math.round(
    (completedProfileFields / profileFields.length) * 100,
  );

  const checklist = [
    {
      label: "Informasi dasar terisi",
      complete:
        hasProfileValue(profile, "nama") && hasProfileValue(profile, "jurusan"),
    },
    {
      label: "Tentang kamu terisi",
      complete: hasProfileValue(profile, "tentang"),
    },
    {
      label: "Skill, minat, dan pengalaman tercatat",
      complete:
        hasProfileValue(profile, "skill") &&
        hasProfileValue(profile, "minat") &&
        hasProfileValue(profile, "pengalamanLomba"),
    },
    {
      label: "Foto profil dan CV terpasang",
      complete:
        hasProfileValue(profile, "fotoProfilUrl") &&
        hasProfileValue(profile, "cvPath"),
    },
  ];

  return (
    <section className="mx-auto grid max-w-7xl gap-8 pt-10 lg:grid-cols-2 lg:pt-14">
      <article className="rounded-xl border border-brand-primary-muted bg-brand-primary-light/50 px-8 py-7 text-center sm:px-10">
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
      <article className="rounded-xl border border-brand-primary-muted bg-brand-primary-light/50 px-8 py-7 sm:px-10">
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
              <span>
                {item.complete
                  ? item.label
                  : `Belum ${item.label.toLowerCase()}`}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-9 flex justify-center">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 rounded-md bg-brand-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-brand-primary-hover"
          >
            Lengkapi Sekarang{" "}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </section>
  );
}
