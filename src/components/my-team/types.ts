export type RequestStatus = "pending" | "accepted" | "rejected";

export type JoinRequest = {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  skills: string[];
  message: string;
  status: RequestStatus;
  time: string;
};

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  color: string;
};
