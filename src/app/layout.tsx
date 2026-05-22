import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/modules/interactive-capability/styles/module.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Interactive Capability Module",
  description: "AmalgamRx-inspired enterprise capability explorer",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
