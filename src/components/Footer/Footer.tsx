"use client"
import { useGetUserByDomain } from "@/hooks/auth.hook"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  const [domain, setDomain] = useState<string>("")
  const { data: userData } = useGetUserByDomain(domain)
  const userInfo = userData?.data

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname)
    }
  }, [])
console.log(userInfo)
  return (
    <footer className="bg-[#6B6B6B] py-12 text-white">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          {/* <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-white/30 pb-2 inline-block">যোগাযোগ</h3>
            <div className="space-y-3 text-gray-100">
              {userInfo?.address && (
                <p className="flex items-start">
                  <span className="mr-2">ঠিকানা:</span> <span>{userInfo.address}</span>
                </p>
              )}
              {userInfo?.phone && (
                <p className="flex items-start">
                  <span className="mr-2">ফোন:</span> <span>{userInfo.phone}</span>
                </p>
              )}
              {userInfo?.email && (
                <p className="flex items-start">
                  <span className="mr-2">ইমেইল:</span> <span>{userInfo.email}</span>
                </p>
              )}
            </div>
          </div> */}

          {/* Social Media Links */}
          <div className="flex flex-col items-start  ">
            <h3 className="text-xl font-semibold border-b border-white/30 pb-2 inline-block mb-6">সোশ্যাল মিডিয়া</h3>
            <div className="flex gap-4">
              {userInfo?.socialLinks?.facebook && (
                <Link
                  href={userInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
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
                  <Instagram size={24} />
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
                  <Twitter size={24} />
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
                  <Youtube size={24} />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="my-8 w-full h-[1px] bg-white/30"></div>

        <div className="text-center">
          <p className="text-gray-200">
            © {new Date().getFullYear()} সর্বস্বত্ব {userInfo?.name || ""} কতৃক সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  )
}
