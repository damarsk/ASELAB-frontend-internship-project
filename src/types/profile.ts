export type PublicProfile = {
  userId: number;
  nama: string;
  jurusan: string | null;
  skill: string[];
  minat: string[];
  tentang: string | null;
  pengalamanLomba: string | null;
  fotoProfilUrl: string | null;
  cvUploaded: boolean;
};

export type PublicProfileResponse = {
  data?: {
    nama?: string;
    profile?: {
      userId?: number;
      jurusan?: string | null;
      skill?: unknown;
      minat?: unknown;
      tentang?: string | null;
      pengalamanLomba?: string | null;
      fotoProfilUrl?: string | null;
      cvUploaded?: boolean;
    } | null;
  } | null;
  error?: string;
  message?: string;
};

/** Backend menyimpan skill/minat sebagai Json, bentuknya bisa array atau string. */
export function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

export function mapPublicProfile(
  payload: PublicProfileResponse | null,
  fallbackUserId: number,
): PublicProfile | null {
  const profile = payload?.data?.profile;
  const nama = payload?.data?.nama;

  if (!profile || typeof nama !== "string" || !nama.trim()) {
    return null;
  }

  return {
    userId: profile.userId ?? fallbackUserId,
    nama,
    jurusan: profile.jurusan ?? null,
    skill: toStringArray(profile.skill),
    minat: toStringArray(profile.minat),
    tentang: profile.tentang ?? null,
    pengalamanLomba: profile.pengalamanLomba ?? null,
    fotoProfilUrl: profile.fotoProfilUrl ?? null,
    cvUploaded: Boolean(profile.cvUploaded),
  };
}
