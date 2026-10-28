import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const editorial = localFont({
  src: [
    { path: "../public/fonts/bodoni-regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/bodoni-bold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-editorial",
  display: "swap",
});
const handwriting = localFont({
  src: "../public/fonts/la-belle-aurore.ttf",
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "noch ein glas — Weinbar & kleine Teller",
  description: "Wein, kleine Teller und ein Platz für dich. Ein Weinbar-Konzept für lange Abende.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${editorial.variable} ${handwriting.variable}`}>
      <body>{children}</body>
    </html>
  );
}
