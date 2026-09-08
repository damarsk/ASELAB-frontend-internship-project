import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
