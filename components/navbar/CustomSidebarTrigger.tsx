import { useSidebar } from "@/components/ui/sidebar";
import { SidebarIcon } from "lucide-react";

function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar} className="md:hidden">
      <SidebarIcon className="mx-2 h-6 w-6 text-black" />
    </button>
  );
}

export default CustomSidebarTrigger;
