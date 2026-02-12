import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import RouteLoadingOverlay from "@/components/common/RouteLoadingOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "포켓몬 도감 | PokeBook",
  description: "포켓몬을 간단하고 빠르게 찾아보는 도감",
  keywords: ["포켓몬", "도감", "Pokemon"],
  openGraph: {
    title: "포켓몬 도감 | PokeBook",
    description: "간단하고 빠른 포켓몬 도감",
    locale: "ko_KR",
    type: "website",
  },
  icons: { icon: "/monsterball.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <RouteLoadingOverlay />
        <Toaster richColors position="top-center" />
        <div id="overlay-root"></div>
      </body>
    </html>
  );
}
