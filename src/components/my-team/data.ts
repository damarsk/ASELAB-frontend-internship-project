import type { JoinRequest, TeamMember } from "./types";

export const members: TeamMember[] = [
  {
    name: "Damar Putra",
    role: "Team Leader",
    initials: "DP",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Nadia Prameswari",
    role: "UI/UX Designer",
    initials: "NP",
    color: "bg-sky-100 text-sky-700",
  },
  {
    name: "Rizky Ramadhan",
    role: "Back-End Developer",
    initials: "RR",
    color: "bg-amber-100 text-amber-700",
  },
];

export const initialRequests: JoinRequest[] = [
  {
    id: 1,
    name: "Ahmad Aldiansyah",
    role: "UI/UX Designer",
    initials: "AA",
    color: "bg-violet-100 text-violet-700",
    skills: ["Figma", "UI Design", "Prototyping"],
    message:
      "Saya tertarik bergabung karena memiliki pengalaman dalam riset pengguna dan desain produk.",
    status: "pending",
    time: "12 menit lalu",
  },
  {
    id: 2,
    name: "Siti Aulia",
    role: "Front-End Developer",
    initials: "SA",
    color: "bg-rose-100 text-rose-700",
    skills: ["React", "TypeScript", "Tailwind"],
    message:
      "Saya ingin membantu membangun interface yang cepat dan mudah digunakan untuk tim ini.",
    status: "pending",
    time: "1 jam lalu",
  },
  {
    id: 3,
    name: "Bagas Aditya",
    role: "Product Manager",
    initials: "BA",
    color: "bg-orange-100 text-orange-700",
    skills: ["Product", "Research"],
    message:
      "Punya pengalaman mengelola produk digital dan tertarik dengan tema kompetisi ini.",
    status: "accepted",
    time: "Kemarin",
  },
  {
    id: 4,
    name: "Naufal Fikri",
    role: "Data Analyst",
    initials: "NF",
    color: "bg-cyan-100 text-cyan-700",
    skills: ["Python", "Data Analysis"],
    message:
      "Siap berkontribusi pada sisi data dan validasi solusi yang akan dikembangkan.",
    status: "rejected",
    time: "2 hari lalu",
  },
];

export const statusLabels: Record<JoinRequest["status"], string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
};
