"use client";
import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import CustomSidebarTrigger from "@/components/navbar/CustomSidebarTrigger";
import Link from "next/link";

function NavbarTransition({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "py-1 bg-white border-b-2 border-gray-600"
            : "py-2 text-white"
        } fixed  top-0 w-full z-50 flex justify-between items-center `}
      >
        <div className="flex justify-center content-center items-center">
          <CustomSidebarTrigger />
          <Link
            className={`${
              isScrolled ? "text-2xl" : " text-3xl"
            } md:mx-2 transition-all duration-300 rounded-full jacquard font-bold text-stone-800`}
            href="/"
          >
            Sway
          </Link>
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}

export default NavbarTransition;
