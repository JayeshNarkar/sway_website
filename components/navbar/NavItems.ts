import { Home, Info, LucideProps, Mail } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
interface NavItem {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const items: NavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about-us",
    icon: Info,
  },
  {
    title: "Contact Us",
    url: "/contact-us",
    icon: Mail,
  },
];

export default items;
export type { NavItem };
