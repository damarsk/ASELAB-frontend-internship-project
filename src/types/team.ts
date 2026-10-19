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
    } | null;
  };
};

export type BackendTeamDetail = Omit<BackendTeam, "members"> & {
  members: BackendTeamDetailMember[];
};
