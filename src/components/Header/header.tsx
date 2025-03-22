"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useGetUserByDomain } from "@/hooks/auth.hook";

// Navigation data structure
const navigationItems = [
  {
    title: "প্রচ্ছদ",
    href: "/",
    description: "",
  },
  {
    title: "জীবন বৃত্তান্ত",
    href: "/biograph",
    description: "",
  },
  {
    title: "লেখালেখি",
    href: "/category/blog",
    description: "/category/blog",
    items: [
      { title: "অর্থনীতি", href: "/category/blog/economics" },
      { title: "ইতিহাস", href: "/category/blog/history" },
      { title: "ধর্ম", href: "/category/blog/religion" },
      { title: "ইসলামী আন্দোলন", href: "/category/blog/islamic-movement" },
      { title: "বাংলাদেশ", href: "/category/blog/bangladesh" },
      { title: "রাজনীতি", href: "/category/blog/politics" },
      { title: "সংস্কৃতি", href: "/category/blog/culture" },
      { title: "বিবিধ", href: "/category/blog/others" },
    ],
  },
  {
    title: "সংবাদ/কার্যক্রম",
    href: "/category/events",
    description: "",
    items: [
      { title: "বিবৃতি/বাণী", href: "/category/events/statement-message" },
      {
        title: "দাওয়াহ কার্যক্রম",
        href: "/category/events/preaching-activities",
      },
      { title: "সমাজ কল্যাণ", href: "/category/events/social-welfare" },
      {
        title: "সংগঠন ও রাজনীতি",
        href: "/category/events/organization-politics",
      },
      {
        title: "শিক্ষা ও প্রশিক্ষণ",
        href: "/category/events/education-training",
      },
      {
        title: "স্বাস্থ্যসেবা",
        href: "/category/events/healthcare",
      },
      {
        title: "শ্রমিক কল্যাণ",
        href: "/category/events/labor-welfare",
      },
      {
        title: "আইন ও মানবাধিকার",
        href: "/category/events/law-human-rights",
      },
      {
        title: "তথ্য ও গবেষণা",
        href: "/category/events/information-research",
      },
      {
        title: "বিজ্ঞান ও তথ্যপ্রযুক্তি",
        href: "/category/events/science-it",
      },
      {
        title: "সাহিত্য ও সংস্কৃতি",
        href: "/category/events/literature-culture",
      },
      {
        title: "পরিবেশ ও কৃষি উন্নয়ন",
        href: "/category/events/environmental-agricultural-development",
      },
      {
        title: "যুব ও ক্রীড়া",
        href: "/category/events/youth-sports",
      },
      {
        title: "আন্তর্জাতিক",
        href: "/category/events/international",
      },
    ],
  },
  {
    title: "তথ্যকোষ",
    href: "/category/informatics",
    description: "",
    items: [
      { title: "বই", href: "/category/informatics/books" },
      { title: "বক্তব্য", href: "/category/informatics/speech" },
      { title: "উদ্ধৃতি", href: "/category/informatics/quote" },
      { title: "সাক্ষাৎকার", href: "/category/informatics/interview" },
      {
        title: "বিশেষ প্রতিবেদন",
        href: "/category/informatics/special-articles",
      },
      { title: "স্মারক", href: "/category/informatics/commemoration" },
      {
        title: "বুকলেট/লিফলেট",
        href: "/category/informatics/booklet-leaflet",
      },
      { title: "পোস্টার", href: "/category/informatics/posters" },
      { title: "ডকুমেন্টারি", href: "/category/informatics/documentaries" },
      { title: "ছবি গ্যালারী", href: "/category/informatics/photo-gallery" },
      {
        title: "ভিডিও গ্যালারী",
        href: "/category/informatics/video-gallery",
      },
    ],
  },
];

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const [domain, setDomain] = useState<string>("");

  const { data: userData } = useGetUserByDomain(domain);
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".mobile-menu-container") &&
        !target.closest(".menu-button")
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Toggle mobile dropdown
  const toggleMobileDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);

  return (
    <header
      className={cn(
        "w-full z-40 fixed border-b top-0 left-0 bg-background transition-all duration-300",
        scrolled ? "shadow-md py-2" : "py-3"
      )}
    >
      <div className="container mx-auto px-4 xl:px-6 relative flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center pr-4 cursor-pointer select-none"
        >
          <p className="font-semibold text-lg md:text-xl flex items-center gap-1">
            {/* <Image
              className="font-semibold text-lg"
              src="/logo1.png"
              width={40}
              height={40}
              alt="Company logo"
            /> */}
            {userData?.data?.name || ""}
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="items-center lg:flex hidden">
          <nav className="flex">
            <ul className="flex gap-1">
              {navigationItems.map((item, index) => (
                <li key={index} className="relative group">
                  <Link
                    href={item.href || "#"}
                    className={cn(
                      "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-base font-medium transition-colors",
                      "hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:text-accent-foreground focus:outline-none",
                      "border-b-2 border-transparent group-hover:border-brand-primary"
                    )}
                  >
                    <span>{item.title}</span>
                    {item.items && (
                      <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {item.items && (
                    <div className="absolute left-0 top-full z-10 min-w-[250px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-1">
                      <div className="bg-popover rounded-md shadow-lg border p-2 backdrop-blur-sm bg-opacity-95">
                        <ul className="grid gap-1">
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.href}
                                className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <span className="text-sm font-medium">
                                  {subItem.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          {/* CTA Button */}
          <div>
            <Link
              href="/"
              className="hidden lg:block p-3 px-5 rounded-full rounded-tl-none bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white  border font-bold select-none transition-all hover:shadow-md hover:scale-105 active:scale-95"
            >
              পরামর্শ দিন
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="hidden xl:flex gap-4">
            {[
              {
                Icon: FaFacebookF,
                href:
                  userData?.data?.socialLinks?.facebook ||
                  "https://www.facebook.com/",
              },
              {
                Icon: FaInstagram,
                href:
                  userData?.data?.socialLinks?.instagram ||
                  "https://www.instagram.com/",
              },
              {
                Icon: FaYoutube,
                href:
                  userData?.data?.socialLinks?.youtube ||
                  "https://www.youtube.com/",
              },
              {
                Icon: FaTwitter,
                href:
                  userData?.data?.socialLinks?.twitter ||
                  "http://www.linkedin.com/",
              },
            ].map(({ Icon, href }, index) => (
              <Link
                key={index}
                href={href}
                className="bg-brand-primary-light border p-2 rounded-full hover:bg-accent transition-all duration-200 flex items-center justify-center hover:shadow-md hover:scale-110"
                aria-label={`Visit our ${Icon.name.replace("Fa", "")}`}
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            onClick={() => setOpen(!isOpen)}
            className="lg:hidden menu-button p-2 hover:bg-accent/50 rounded-full"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-sm z-50 lg:hidden mobile-menu-container transition-all duration-300 ease-in-out",
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          )}
          style={{ top: "64px" }}
        >
          <div className="h-full overflow-y-auto pb-20 px-6">
            <div className="py-6 space-y-4">
              {navigationItems.map((item, index) => (
                <div
                  key={item.title}
                  className="border-b border-border/50 pb-3"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href || "#"}
                        className="text-lg font-medium hover:text-primary py-2"
                        onClick={() => !item.items && setOpen(false)}
                      >
                        {item.title}
                      </Link>

                      {item.items && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 rounded-full"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleMobileDropdown(index);
                          }}
                        >
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 text-muted-foreground transition-transform duration-200",
                              activeDropdown === index ? "rotate-180" : ""
                            )}
                          />
                        </Button>
                      )}
                    </div>

                    {item.items && (
                      <div
                        className={cn(
                          "pl-4 space-y-1 mt-1 overflow-hidden transition-all duration-300",
                          activeDropdown === index
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="block text-muted-foreground hover:text-primary text-sm py-2 px-2 rounded hover:bg-accent/30"
                            onClick={() => setOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-6">
                <Link
                  href="/"
                  className="block w-full text-center p-3 px-4 rounded-full rounded-tl-none  bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white  border font-bold shadow-md hover:shadow-lg transition-all"
                  onClick={() => setOpen(false)}
                >
                  পরামর্শ দিন
                </Link>
              </div>

              {/* Mobile Social Icons */}
              <div className="flex justify-center gap-6 pt-8">
                {[
                  {
                    Icon: FaFacebookF,
                    href:
                      userData?.data?.socialLinks?.facebook ||
                      "https://www.facebook.com/",
                  },
                  {
                    Icon: FaInstagram,
                    href:
                      userData?.data?.socialLinks?.instagram ||
                      "https://www.instagram.com/",
                  },
                  {
                    Icon: FaYoutube,
                    href:
                      userData?.data?.socialLinks?.youtube ||
                      "https://www.youtube.com/",
                  },
                  {
                    Icon: FaTwitter,
                    href:
                      userData?.data?.socialLinks?.twitter ||
                      "http://www.linkedin.com/",
                  },
                ].map(({ Icon, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="bg-brand-primary-light border p-2 rounded-full hover:bg-accent transition-all duration-200 flex items-center justify-center hover:shadow-md"
                    aria-label={`Visit our ${Icon.name.replace("Fa", "")}`}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
