import type React from "react"
import Link from "next/link"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { FaFacebookF, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"
import { ChevronRight } from "lucide-react"

export default function RightSection({
  blogs,
  user,
}: {
  blogs: Array<{ id: string; title: string; date: string }>
  user: {
    name: string
    social: {
      facebook: string
      instagram: string
      youtube: string
      linkedin: string
    }
  }
}) {
  return (
    <div className="space-y-6">
      {/* Recent Blogs Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-semibold">সাম্প্রতিক</h2>
          <Link href="/blogs" className="text-sm text-primary flex items-center hover:underline">
            সব দেখুন <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {blogs.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id} className="block">
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-0 rounded-md p-0">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    className="object-cover"
                    src={"/news.png"}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    alt={blog.title}
                    priority={blogs.indexOf(blog) < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-3 space-y-1.5">
                  <CardTitle className="font-semibold text-base line-clamp-2">{blog.title}</CardTitle>
                  <CardDescription className="text-xs">{blog.date}</CardDescription>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="pt-3 border-t">
        <h2 className="text-lg font-semibold mb-3">সোশ্যাল মিডিয়া</h2>
        <div className="grid gap-2">
          <SocialLink
            href={user.social.facebook}
            icon={<FaFacebookF />}
            name={user.name}
            color="bg-blue-100 hover:bg-blue-200 text-blue-600"
          />
          <SocialLink
            href={user.social.instagram}
            icon={<FaInstagram />}
            name={user.name}
            color="bg-pink-100 hover:bg-pink-200 text-pink-600"
          />
          <SocialLink
            href={user.social.youtube}
            icon={<FaYoutube />}
            name={user.name}
            color="bg-red-100 hover:bg-red-200 text-red-600"
          />
          <SocialLink
            href={user.social.linkedin}
            icon={<FaLinkedin />}
            name={user.name}
            color="bg-blue-100 hover:bg-blue-200 text-blue-700"
          />
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
      className={`p-2.5 flex items-center gap-3 rounded-md transition-all duration-200 ${color}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="text-xl">{icon}</div>
      <span className="font-medium">{name}</span>
    </Link>
  )
}

