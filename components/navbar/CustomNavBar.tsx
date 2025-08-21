import NavbarTransition from "@/components/navbar/NavbarTransition";
import UserStatus from "@/components/navbar/UserStatus";
import NavLinks from "@/components/navbar/NavLinks";

function CustomNavBar() {
  return (
    <NavbarTransition>
      <NavLinks />
      <div className="flex items-center">
        <UserStatus />
      </div>
    </NavbarTransition>
  );
}

export default CustomNavBar;
