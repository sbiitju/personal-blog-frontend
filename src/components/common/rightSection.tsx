/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ExternalLink } from "lucide-react"
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetAllContentByDomain } from "@/hooks/contnet.hook"
import { useGetUserByDomain } from "@/hooks/auth.hook"

export default function RightSection() {
  const [domain, setDomain] = useState<string>("")

  const { data: contentsData, isLoading, isError } = useGetAllContentByDomain(domain)
  const contents = contentsData?.data || []

  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useGetUserByDomain(domain)
  const socialLinks = userData?.data?.socialLinks || []
  const user = userData?.data || {}

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname)
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Recent Blogs Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">সাম্প্রতিক</h2>
          <Link href="/blogs" className="text-sm text-primary flex items-center hover:underline group transition-all">
            সব দেখুন <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 3 }).map((_, index) => <BlogCardSkeleton key={index} />)
          ) : isError ? (
            <p className="text-red-500 py-4 text-center">কন্টেন্ট লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।</p>
          ) : contents.length === 0 ? (
            <p className="text-gray-500 py-4 text-center">কোন সাম্প্রতিক কন্টেন্ট নেই</p>
          ) : (
            contents.map((content: any) => (
              <Link href={`/${content._id}`} key={content._id} className="block">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 hover:border-primary/20 rounded-lg p-0 group">
                  <div className="flex flex-row items-center">
                    <div className="relative aspect-square h-24 w-24 sm:h-28 sm:w-28">
                      <Image
                        className="object-cover rounded-l-lg"
                        src={content?.photo || "/placeholder.svg?height=112&width=112"}
                        fill
                        sizes="(max-width: 768px) 96px, 112px"
                        alt={content.title}
                        priority={contents.indexOf(content) < 2}
                      />
                    </div>
                    <div className="p-3 flex-1 space-y-1.5">
                      <CardTitle className="font-light text-black hover:underline text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {content.title}
                      </CardTitle>
                      <CardDescription className="text-xs">{content.date}</CardDescription>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">সোশ্যাল মিডিয়া</h2>
        <div className="grid gap-3">
          {isUserLoading ? (
            // Skeleton loading state for social links
            Array.from({ length: 4 }).map((_, index) => <SocialLinkSkeleton key={index} />)
          ) : isUserError ? (
            <p className="text-red-500 py-2 text-center">সোশ্যাল লিংক লোড করতে সমস্যা হয়েছে।</p>
          ) : (
            <>
              <SocialLink
                href={socialLinks?.facebook || "https://facebook.com"}
                icon={<FaFacebookF />}
                name={`${user.name || "আমাদের"} ফেসবুক পেজ`}
                color="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700"
              />
              <SocialLink
                href={socialLinks?.instagram || "https://instagram.com"}
                icon={<FaInstagram />}
                name={`${user.name || "আমাদের"} ইনস্টাগ্রাম`}
                color="bg-pink-50 hover:bg-pink-100 text-pink-600 hover:text-pink-700"
              />
              <SocialLink
                href={socialLinks?.youtube || "https://youtube.com"}
                icon={<FaYoutube />}
                name={`${user.name || "আমাদের"} ইউটিউব চ্যানেল`}
                color="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700"
              />
              <SocialLink
                href={socialLinks?.twitter || "https://twitter.com"}
                icon={<FaTwitter />}
                name={`${user.name || "আমাদের"} টুইটার`}
                color="bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700"
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function SocialLink({
  href,
  icon,
  name,
  color,
}: {
  href: string
  icon: React.ReactNode
  name: string
  color: string
}) {
  return (
    <Link
      href={href}
      className={`p-3 flex items-center justify-between rounded-md transition-all duration-200 ${color} border border-transparent hover:border-current/10`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center gap-3">
        <div className="text-xl">{icon}</div>
        <span className="font-medium">{name}</span>
      </div>
      <ExternalLink className="h-4 w-4 opacity-60" />
    </Link>
  )
}

function BlogCardSkeleton() {
  return (
    <div className="flex items-center space-x-3 border rounded-lg p-0 overflow-hidden">
      <Skeleton className="h-24 w-24 sm:h-28 sm:w-28 rounded-l-lg" />
      <div className="space-y-2 flex-1 p-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  )
}

function SocialLinkSkeleton() {
  return (
    <div className="flex items-center justify-between p-3 rounded-md bg-gray-50">
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-4 w-4" />
    </div>
  )
}

