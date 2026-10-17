export type BackendTeam = {
  id: number;
  nama: string;
  deskripsi: string;
  kompetisi: string;
  skillDibutuhkan: string[];
  leaderId: number;
  createdAt: string;
  updatedAt: string;
  kuota: number;
  leader?: {
    nama: string;
  } | null;
  members: Array<{
    id: number;
  }>;
};
