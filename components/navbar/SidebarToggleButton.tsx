"use client";

import { SidebarIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export default function SidebarToggleButton({
  isScrolled,
}: {
  isScrolled: boolean;
}) {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar} className="md:hidden">
      <SidebarIcon
        className={`mx-2 ${
          isScrolled ? "h-8 w-8" : "h-10 w-10"
        } text-black transition-all duration-300`}
      />
    </button>
  );
}
