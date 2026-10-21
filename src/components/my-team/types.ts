export type RequestStatus = "pending" | "accepted" | "rejected";

export type JoinRequest = {
  id: number;
  userId: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  fotoProfilUrl?: string | null;
  skills: string[];
  message: string;
  status: RequestStatus;
  time: string;
};

export type TeamMember = {
  userId?: number;
  name: string;
  department?: string;
  role: string;
  initials: string;
  color: string;
  fotoProfilUrl?: string | null;
};
