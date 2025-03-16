"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Header = () => {
  const navigationItems = [
    {
      title: "প্রচ্ছদ",
      href: "/",
      description: "",
    },
    {
      title: "জীবন বৃত্তান্ত",
      href: "/bbiographyio",
      description: "",
    },
    {
      title: "লেখালেখি",
      description: "",
      items: [
        { title: "অর্থনীতি", href: "#services" },
        { title: "ইতিহাস", href: "#services" },
        { title: "ধর্ম", href: "#services" },
        { title: "ইসলামী আন্দোলন", href: "#services" },
        { title: "বাংলাদেশ", href: "#services" },
        { title: "রাজনীতি", href: "#services" },
      ],
    },
    {
      title: "সংবাদ/কার্যক্রম",
      description: "#portfolio",
      items: [
        { title: "বিবৃতি/বাণী", href: "/" },
        { title: "দাওয়াহ কার্যক্রম", href: "/" },
        { title: "সমাজ কল্যাণ", href: "/" },
        { title: "সংগঠন ও রাজনীতি", href: "/" },
      ],
    },
    {
      title: "তথ্যকোষ",
      href: "/",
      description: "",
    },
    {
      title: "যোগাযোগ",
      href: "/",
      description: "",
    },
  ];

  const [isOpen, setOpen] = useState(false);
  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background shadow-md">
      <div className="px-4 xl:px-20 lg:px-6 min-w-full relative min-h-16 lg:min-h-20 flex flex-row items-center justify-between">
        <Link
          href="/"
          className="flex lg:justify-center pr-4 cursor-pointer select-none"
        >
          <p className="font-semibold text-lg flex items-center gap-1">
            {/* <Image
              className="font-semibold text-lg"
              src="/logo1.png"
              width={40}
              height={40}
              alt="Company logo"
            /> */}
            Abu Hosain
          </p>
        </Link>

        <div className="items-center lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-1 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink>
                        <Button
                          variant="ghost"
                          className="p-1 text-base font-semibold"
                        >
                          {item.title}
                        </Button>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-semibold capitalize p-1 text-base">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[230px] p-4 text-base font-semibold">
                        <div className="flex flex-col text-sm h-full justify-end">
                          {item.items?.map((subItem) => (
                            <NavigationMenuLink
                              href={subItem.href}
                              key={subItem.title}
                              className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded text-base font-semibold"
                            >
                              <span>{subItem.title}</span>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex gap-10 items-center">
          <div>
            <Link
              href="/"
              className="hidden lg:block p-3 px-4 rounded-full rounded-tl-none bg-gradient-to-r from-brand-primary to-brand-primary-light border font-bold select-none"
            >
              Get a Proposal
            </Link>
          </div>

          <div className="hidden xl:flex gap-4">
            <Link
              href="https://www.facebook.com/"
              className="bg-brand-primary-light border p-2 rounded-full"
            >
              <FaFacebookF />
            </Link>

            <Link
              href="https://www.instagram.com/"
              className="bg-brand-primary-light border p-2 rounded-full"
            >
              <FaInstagram />
            </Link>

            <Link
              href="https://www.youtube.com/"
              className="bg-brand-primary-light border p-2 rounded-full"
            >
              <FaYoutube />
            </Link>
            <Link
              href="http://www.linkedin.com/"
              className="bg-brand-primary-light border p-2 rounded-full"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </Button>
          {isOpen && (
            <div className="absolute top-16 -left-4 px-10 border-t flex flex-col w-screen h-[80vh] min-h-full right-0 bg-background shadow-lg py-4 gap-3 overflow-y-scroll">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="flex justify-between items-center pl-4"
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}

              <div key="Get a Proposal">
                <div className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="p-3 px-4 rounded-full rounded-tl-none bg-gradient-to-r from-brand-primary to-brand-primary-light border font-bold"
                  >
                    Get a Proposal
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
