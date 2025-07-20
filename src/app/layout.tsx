import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruqiyah Shariah & Ramadan Duas",
  description: "Collection of Islamic Duas and Ruqyah with Arabic text, transliteration, and translation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 font-sans">
        {children}
      </body>
    </html>
  );
}
