export type CompetitionStatus =
  | "AKTIF"
  | "KEDALUWARSA"
  | "TANGGAL_BELUM_DIKETAHUI";

export type Competition = {
  id: number;
  namaLomba: string;
  penyelenggara: string;
  kategori: string;
  deadline: string | null;
  infoPendaftaran: string | null;
  ketentuan?: string | null;
  biayaPendaftaran?: string | null;
  hadiah?: string | null;
  tingkatLomba?: string | null;
  peserta?: number | null;
  sourceUrl?: string | null;
  registrationUrl?: string | null;
  gambarUrl?: string | null;
  statusLomba?: CompetitionStatus;
  createdAt?: string;
  updatedAt?: string;
};
