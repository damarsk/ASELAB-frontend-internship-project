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
  kecocokan?: string;
  jumlahAnggotaTeks?: string;
  leader?: {
    nama: string;
  } | null;
  members: Array<{
    id: number;
    role?: "LEADER" | "MEMBER";
    joinedAt?: string;
    user?: {
      id: number;
      nama: string;
      profile: {
        jurusan: string | null;
        fotoProfilUrl: string | null;
      } | null;
    };
  }>;
};

export type BackendTeamSummary = Omit<BackendTeam, "members"> & {
  peranSaya: "LEADER" | "MEMBER";
  jumlahAnggota: number;
  sisaKuota: number;
  members: BackendTeam["members"];
};

export type BackendTeamDetailMember = {
  id: number;
  teamId: number;
  userId: number;
  role: "LEADER" | "MEMBER";
  joinedAt: string;
  user: {
    nama: string;
    profile: {
      jurusan: string | null;
      skill: string[];
      fotoProfilUrl?: string | null;
    } | null;
  };
};

export type BackendTeamDetail = Omit<BackendTeam, "members"> & {
  members: BackendTeamDetailMember[];
};
