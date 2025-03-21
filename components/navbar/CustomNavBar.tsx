import NavbarTransition from "@/components/navbar/NavbarTransition";
import UserStatus from "@/components/navbar/UserStatus";
import NavLinks from "@/components/navbar/NavLinks";
import { Search } from "lucide-react";

function CustomNavBar() {
  return (
    <NavbarTransition>
      <NavLinks />
      <div className="flex items-center">
        <button>
          <Search className="text-black" />
        </button>
        <UserStatus />
      </div>
    </NavbarTransition>
  );
}

export default CustomNavBar;
