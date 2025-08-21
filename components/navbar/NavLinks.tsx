import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavItems from "@/components/navbar/NavItems";
import authOptions from "@/lib/authOptions";
import { Info, LogIn, Package } from "lucide-react";
import { getServerSession } from "next-auth";
import AnimatedTextUnderline from "@/components/ui/animated-text-underline";

async function NavLinks() {
  const session = await getServerSession(authOptions);
  if (session) {
    const filteredNavItems = NavItems.filter((item) => item.url !== "/login");
    if (session.user.isAdmin) {
      if (!filteredNavItems.some((item) => item.url === "/admin")) {
        filteredNavItems.push({ title: "Admin", url: "/admin", icon: Info });
      }
    }
    if (!filteredNavItems.some((item) => item.url === "/your-orders")) {
      filteredNavItems.splice(2, 0, {
        title: "Your Orders",
        url: "/your-orders",
        icon: Package,
      });
    }
    if (!filteredNavItems.some((item) => item.url === "/logout")) {
      filteredNavItems.push({ title: "logout", url: "/logout", icon: Info });
    }
    NavItems.length = 0;
    NavItems.push(...filteredNavItems);
  } else {
    const filteredNavItems = NavItems.filter(
      (item) => item.url !== "/admin" && item.url !== "/logout"
    );
    if (!filteredNavItems.some((item) => item.url === "/login")) {
      filteredNavItems.push({ title: "Login", url: "/login", icon: LogIn });
    }
    NavItems.length = 0;
    NavItems.push(...filteredNavItems);
  }

  return (
    <div className="hidden md:block">
      {NavItems.map((item) => (
        <Link key={item.title} href={item.url}>
          <Button
            variant={"link"}
            className="font-semibold hover:no-underline text-gray-800"
          >
            <AnimatedTextUnderline text={item.title} />
          </Button>
        </Link>
      ))}
    </div>
  );
}

export default NavLinks;
