/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  UserCircle,
  ShoppingCart,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  FileText,
  Image,
  User,
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
    title: "ড্যাশবোর্ড",
    url: "/political/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "হোম",
    url: "/",
    icon: Home,
  },
  {
    title: "কন্টেন্ট ব্যবস্থাপনা",
    icon: FileText,
    submenu: [
      {
        title: "সব কন্টেন্ট",
        url: "/political/content",
      },
      {
        title: "কন্টেন্ট তৈরি",
        url: "/political/content/create-content",
      },
    ],
  },
  {
    title: "ব্যানার",
    icon: Image,
    submenu: [
      {
        title: "সব ব্যানার",
        url: "/political/banner",
      },
      {
        title: "ব্যানার তৈরি",
        url: "/political/banner/create-banner",
      },
    ],
  },
  {
    title: "জীবন বৃত্তান্ত",
    url: "/political/biograph",
    icon: User,
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
            <span className="text-sm font-semibold font-bengali-medium">রাজনৈতিক পোর্টাল</span>
            <span className="text-xs text-muted-foreground font-bengali-normal">
              ব্যবস্থাপনা সিস্টেম
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bengali-medium">মূল নেভিগেশন</SidebarGroupLabel>
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
                            <span className="font-bengali-medium">{item.title}</span>
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
                                <Link href={subItem.url} className="font-bengali-normal">
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link href={item.url} className="font-bengali-medium">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
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
                    alt="Political"
                  />
                  <AvatarFallback>PL</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col text-left">
                  <span className="text-sm font-medium font-bengali-medium">রাজনৈতিক ব্যবহারকারী</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span className="font-bengali-medium">লগআউট</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
