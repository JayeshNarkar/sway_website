"use client";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { WebsiteLaunch } from "@prisma/client/edge";
import { Button } from "@/components/ui/button";

export default function SiteLaunchCountdown({
  launchDate,
}: {
  launchDate: WebsiteLaunch | null;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!launchDate?.launchAt) return;
    const updateCountdown = () => {
      const now = new Date();
      const launchTime = new Date(launchDate.launchAt);
      const diff = launchTime.getTime() - now.getTime();
      if (diff <= 0) {
        window.location.reload();
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [launchDate]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-15 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 pointer-events-none" />

      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center relative">
          <div>
            <Image
              src="/logo.png"
              alt="Sway Logo"
              width={80}
              height={40}
              className="relative grayscale contrast-125 bg-gray-200 rounded-full p-2 border-2 border-gray-500"
            />
          </div>
          <div className="ml-3 flex flex-col items-start">
            <span className="jacquard text-3xl tracking-tight">SWAY</span>
            <span className="share-tech-mono text-xs text-gray-400 -mt-1">
              CULT
            </span>
          </div>
        </div>
        <Button
          variant={"outline"}
          onClick={() => signIn("google")}
          className="bg-white hover:bg-gray-100 text-black border-2 border-yellow-400 hover:border-yellow-300 rounded-none px-4 py-2 share-tech-mono uppercase tracking-wider shadow-[4px_4px_0_0_#FF0000] hover:shadow-[3px_3px_0_0_#FF0000] transition-all"
        >
          <Image src="/Google.png" alt="Google Logo" width={16} height={16} />
        </Button>
      </header>

      <main
        className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 pb-4"
        style={{
          height: "calc(100dvh - 166.3px)",
        }}
      >
        <div className="text-center mb-8 md:mb-12 relative">
          <h1 className="share-tech-mono text-7xl md:text-9xl text-white mb-4 relative inline-block">
            <span className="relative z-10 iceberg">SWAY</span>
          </h1>
          <p className="share-tech-mono text-yellow-300 tracking-widest mb-6 text-sm md:text-base">
            OUR URBAN REVOLUTION BEGINS IN
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-6 w-full max-w-md md:max-w-2xl">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div className="bg-black/70 border-2 border-white/20 rounded-sm p-3 md:p-4 relative overflow-hidden">
                <div className="absolute inset-0 border-t-2 border-red-500/50 animate-pulse"></div>
                <div className="iceberg text-2xl md:text-6xl text-white mb-1">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="share-tech-mono text-xs text-yellow-300 uppercase tracking-[0.2em]whitespace-nowrap">
                  {unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-6 text-center share-tech-mono text-xs text-white/30 relative z-10 border-t border-white/10">
        © {new Date().getFullYear()} SWAY CULT. ALL SYSTEMS OPERATIONAL.
      </footer>
    </div>
  );
}
