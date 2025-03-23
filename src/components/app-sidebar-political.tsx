/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Home,
  UserCircle,
  ShoppingCart,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";

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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items with nested structure
const menuItems = [
  {
    title: "Dashboard",
    url: "/political/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Content Management",
    icon: UserCircle,
    submenu: [
      {
        title: "All Content",
        url: "/political/content",
      },
      {
        title: "Create Content",
        url: "/political/content/create-content",
      },
    ],
  },
  {
    title: "Banner",
    icon: ShoppingCart,
    submenu: [
      {
        title: "All Banner",
        url: "/political/banner",
      },
      {
        title: "Create Banner",
        url: "/political/banner/create-banner",
      },
    ],
  },
  {
    title: "Biograph",
    icon: ShoppingCart,
    submenu: [
      {
        title: "Biograph",
        url: "/political/biograph",
      },
      {
        title: "Create Biography",
        url: "/political/biograph/create-biograph",
      },
      {
        title: "Update Biography",
        url: "/political/biograph/update-biograph",
      },
    ],
  },
];

export function AppSidebarPolitical() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const isActive = (url: string) => {
    return pathname === url;
  };

  const isMenuActive = (item: any) => {
    if (item.url && isActive(item.url)) return true;
    if (item.submenu) {
      return item.submenu.some((subItem: any) => isActive(subItem.url));
    }
    return false;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">P</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Political Portal</span>
            <span className="text-xs text-muted-foreground">
              Management System
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <Collapsible
                      open={openMenus[item.title] || isMenuActive(item)}
                      onOpenChange={() => toggleMenu(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={isMenuActive(item)}
                          className="justify-between"
                        >
                          <div className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openMenus[item.title] ? "rotate-180" : ""
                            }`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(subItem.url)}
                              >
                                <a href={subItem.url}>{subItem.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <a href={item.url}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Admin"
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col text-left">
                  <span className="text-sm font-medium">User</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
