import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { headers } from "next/headers";
import envConfig from "@/config/env.confg";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Only this async metadata export now
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const domain = headersList.get("host") || "default-domain.com";
 

  const res = await fetch(`${envConfig.baseApi}/client/${domain}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return {
    title: data?.data?.name || "A Place to Share My Work and Story",
    description: data?.data?.bio || "Highlight my skills, experiences, and creative projects with a personal portfolio website.",
  };
}

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
