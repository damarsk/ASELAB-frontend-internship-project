export type Competition = {
  id: string;
  name: string;
  category: string;
  detail: string;
  prize: string;
  logo: string;
  logoClassName: string;
  deadline: string;
};

export const competitions: Competition[] = [
  {
    id: "gemastik-xviii-2026",
    name: "GEMASTIK XVIII 2026",
    category: "UX Design & Software Development",
    detail: "Ajang prestisius IT mahasiswa se-Indonesia.",
    prize: "Rp 50.000.000",
    logo: "GEMASTIK",
    logoClassName: "border-[10px] border-cyan-800 text-red-600",
    deadline: "30 September 2026",
  },
  {
    id: "hackathon-fintech-indonesia",
    name: "Hackathon FinTech Indonesia",
    category: "Web3, Micro-lending, & AI Fraud Prevention",
    detail: "Kompetisi teknologi untuk inklusi finansial UMKM.",
    prize: "Rp 100.000.000",
    logo: "HACKATHON",
    logoClassName: "border border-text-secondary text-text-secondary",
    deadline: "15 Oktober 2026",
  },
  {
    id: "national-cyber-security-2026",
    name: "National Cyber Security Championship",
    category: "Capture the Flag (CTF Jeopardy)",
    detail: "Reverse Engineering dan Web Penetration Testing.",
    prize: "Rp 35.000.000",
    logo: "5TH\nEDITION",
    logoClassName: "border-4 border-black text-black",
    deadline: "20 Oktober 2026",
  },
  {
    id: "ui-ux-design-competition-2026",
    name: "UI/UX Design Competition 2026",
    category: "UI/UX Design",
    detail: "Rancang pengalaman digital untuk kebutuhan masa depan.",
    prize: "Rp 25.000.000",
    logo: "UI/UX\nDESIGN",
    logoClassName: "border-4 border-brand-primary text-brand-primary",
    deadline: "5 November 2026",
  },
  {
    id: "data-innovation-challenge-2026",
    name: "Data Innovation Challenge 2026",
    category: "Data & Artificial Intelligence",
    detail: "Gunakan data untuk menyelesaikan masalah nyata.",
    prize: "Rp 45.000.000",
    logo: "DATA\nLAB",
    logoClassName: "border-4 border-slate-700 text-slate-700",
    deadline: "12 November 2026",
  },
  {
    id: "startup-pitch-indonesia-2026",
    name: "Startup Pitch Indonesia 2026",
    category: "Business & Entrepreneurship",
    detail: "Bangun solusi dan presentasikan ide terbaikmu.",
    prize: "Rp 75.000.000",
    logo: "STARTUP\nPITCH",
    logoClassName: "border-4 border-amber-500 text-amber-600",
    deadline: "25 November 2026",
  },
];
