"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BriefcaseBusiness,
  Headset,
  House,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoArea from "./LogoArea";

const navitems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/dashboard",
  },
  {
    name: "Home",
    icon: <House />,
    path: "/home",
  },
  {
    name: "About",
    icon: <Users />,
    path: "/about",
  },
  {
    name: "Services",
    icon: <Settings />,
    path: "/services",
  },
  {
    name: "Portfolio",
    icon: <BriefcaseBusiness />,
    path: "/portfolio",
  },
  {
    name: "Contact",
    icon: <Headset />,
    path: "/contact",
  },
];

export default function SidebarComponent() {
  const SIDEBAR_KEYBOARD_SHORTCUT = "b";

  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup className="md:mt-20">
          <SidebarGroupLabel className="mb-6 mt-3 md:hidden">
            <LogoArea classes="font-medium text-3xl text-secondary pl-2" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navitems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    data-active={pathname === item.path}
                  >
                    <Link href={item.path}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              asChild
            >
              <span className="cursor-pointer">
                <LogOut /> <span>Logout</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
