"use client"
import { useGetUserByDomain } from "@/hooks/auth.hook"
import { useGetAllContentByDomain } from "@/hooks/contnet.hook"
import { navigationItems } from "@/data/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Calendar } from "lucide-react"

export default function Footer() {
  const [domain, setDomain] = useState<string>("")
  const { data: userData } = useGetUserByDomain(domain)
  const { data: contentData } = useGetAllContentByDomain(domain)
  const userInfo = userData?.data
  const recentContent = contentData?.data?.slice(0, 4) || [] // Get latest 4 content

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname)
    }
  }, [])

  return (
    <footer className="bg-[#6B6B6B] py-12 text-white">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-white/30 pb-2 inline-block font-bengali-semibold">যোগাযোগ</h3>
            <div className="space-y-4 text-gray-100">
              {userInfo?.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                  <p className="font-bengali-normal">{userInfo.address}</p>
                </div>
              )}
              {userInfo?.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-white/70 flex-shrink-0" />
                  <p className="font-bengali-normal">{userInfo.phone}</p>
                </div>
              )}
              {userInfo?.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white/70 flex-shrink-0" />
                  <p className="font-bengali-normal">{userInfo.email}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-white/30 pb-2 inline-block font-bengali-semibold">দ্রুত লিংক</h3>
            <div className="space-y-3">
              {navigationItems.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-100 hover:text-white transition-colors duration-200 font-bengali-normal"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Content */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-white/30 pb-2 inline-block font-bengali-semibold">সাম্প্রতিক কন্টেন্ট</h3>
            <div className="space-y-3">
              {recentContent.length > 0 ? (
                recentContent.map((content: any) => (
                  <Link
                    key={content._id}
                    href={`/${content._id}`}
                    className="block group"
                  >
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-white/70 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-100 group-hover:text-white transition-colors duration-200 font-bengali-normal text-sm line-clamp-2">
                          {content.title}
                        </p>
                        <p className="text-gray-400 text-xs font-bengali-normal">
                          {content.date}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-400 font-bengali-normal text-sm">কোন সাম্প্রতিক কন্টেন্ট নেই</p>
              )}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-white/30 pb-2 inline-block font-bengali-semibold">সোশ্যাল মিডিয়া</h3>
            <div className="flex gap-4">
              {userInfo?.socialLinks?.facebook && (
                <Link
                  href={userInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </Link>
              )}
              {userInfo?.socialLinks?.instagram && (
                <Link
                  href={userInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </Link>
              )}
              {userInfo?.socialLinks?.twitter && (
                <Link
                  href={userInfo.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </Link>
              )}
              {userInfo?.socialLinks?.youtube && (
                <Link
                  href={userInfo.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </Link>
              )}
            </div>
            
            {/* Additional Info */}
            {userInfo?.name && (
              <div className="pt-4 border-t border-white/20">
                <p className="text-gray-200 font-bengali-medium text-sm">
                  {userInfo.name}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="my-8 w-full h-[1px] bg-white/30"></div>

        <div className="text-center">
          <p className="text-gray-200 font-bengali-normal">
            © {new Date().getFullYear()} সর্বস্বত্ব {userInfo?.name || ""} কতৃক সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  )
}
