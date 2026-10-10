import "./globals.css";
import { Poppins } from "next/font/google";
import AuthSessionProvider from "@/src/components/auth/SessionProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Partnerin",
  description: "Platform untuk mencari partner lomba",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-slate-50`}>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
