import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomNavBar from "@/components/navbar/CustomNavBar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cleanupTempOrders } from "@/lib/cleanupTempOrders";
import { prisma } from "@/lib/prisma";
import { checkIfLaunched } from "@/components/site-related/check-if-release";
import SiteLaunchCountdown from "@/components/site-related/SiteLaunchCountdown";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sway Cult",
  description:
    "Discover Sway Clothing, your go-to destination for trendy Y2K, anime, and gym-aesthetic-inspired apparel in Mumbai. Explore our unique collection of stylish t-shirts and designed clothing that blends nostalgia, pop culture, and modern fitness vibes. Shop now for the latest fashion trends and express your individuality with Sway",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await cleanupTempOrders();

  const launchDate = await prisma.websiteLaunch.findUnique({
    where: {
      id: 1,
    },
  });

  const isLaunched = await checkIfLaunched(launchDate);

  if (isLaunched) {
    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"anonymous"}
          />
          {/*  eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Iceberg&family=Jacquard+24&family=Share+Tech+Mono&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col space-mono`}
        >
          <CustomNavBar />
          {children}
          <SpeedInsights />
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={"anonymous"}
          />
          {/*  eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Iceberg&family=Jacquard+24&family=Share+Tech+Mono&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col space-mono`}
        >
          <SiteLaunchCountdown launchDate={launchDate} />
        </body>
      </html>
    );
  }
}
