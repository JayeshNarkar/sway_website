import NavItems from "@/components/navbar/NavItems";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogIn, ShieldCheck, LogOut, Package } from "lucide-react";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const [navItems, setNavItems] = useState(NavItems);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      if (session?.user) {
        const updatedNavItems = [...navItems];
        if (session.user.isAdmin) {
          if (!updatedNavItems.some((item) => item.url === "/admin")) {
            updatedNavItems.splice(2, 0, {
              title: "Admin",
              url: "/admin",
              icon: ShieldCheck,
            });
          }
        }
        if (!updatedNavItems.some((item) => item.url === "/your-orders")) {
          updatedNavItems.splice(2, 0, {
            title: "Your Orders",
            url: "/your-orders",
            icon: Package,
          });
        }
        if (!updatedNavItems.some((item) => item.url === "/logout")) {
          updatedNavItems.push({
            title: "Logout",
            url: "/logout",
            icon: LogOut,
          });
        }
        setNavItems(updatedNavItems);
      } else {
        const updatedNavItems = [...navItems];
        if (!updatedNavItems.some((item) => item.url === "/login")) {
          updatedNavItems.push({ title: "Login", url: "/login", icon: LogIn });
        }
        setNavItems(updatedNavItems);
      }
    }

    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg">Sway Cult</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
