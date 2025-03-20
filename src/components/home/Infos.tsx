"use client"

import { useGetAllContentByCategoryAndDomain } from "@/hooks/contnet.hook"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import Title from "@/components/ui/title"
import { CalendarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

// Define proper type for content items
interface ContentItem {
  _id: string
  title: string
  photo: string
  date: string
  description?: string
}

export default function Infos({ domain }: { domain: string }) {
  // Use the fixed hook with proper query key
  const { data: infoData, isLoading, error } = useGetAllContentByCategoryAndDomain("informatics", domain)

  // Debug output
  console.log("Informatics data:", infoData)

  // Extract the content items with proper typing
  const contentItems: ContentItem[] = infoData?.data || []

  return (
    <section className="bg-[#FFDBDB] py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <Title className="bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white px-12 inline-block">তথ্যকোষ</Title>
        </div>

        {isLoading ? (
          <SkeletonLoader />
        ) : error ? (
          <div className="text-center p-8 bg-white/50 rounded-lg">
            <p className="text-red-600 font-medium text-lg">ডাটা লোড করতে সমস্যা হয়েছে!</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              আবার চেষ্টা করুন
            </Button>
          </div>
        ) : contentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentItems.slice(0, 6).map((item) => (
              <Card key={item._id} className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.photo || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority={false}
                  />
                </div>
                <CardContent className="p-4 bg-white">
                  <CardTitle className="font-semibold text-lg line-clamp-2 leading-relaxed mb-2 hover:text-[#e7000b] transition-colors">
                    <Link href={`/${item._id}`}>{item.title}</Link>
                  </CardTitle>
                  <CardDescription className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {item.date}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0 bg-white">
                  <Link href={`/${item._id}`} className="text-[#e7000b] text-sm font-medium hover:underline">
                    বিস্তারিত পড়ুন →
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-white/50 rounded-lg">
            <p className="text-gray-600 font-medium">কোনো তথ্যকোষ পাওয়া যায়নি</p>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link href="/category/informatics">
            <Button
              variant="destructive"
              className="px-7 py-6 text-base font-semibold rounded-md transition-all duration-300 hover:translate-y-[-2px]"
            >
              আরও তথ্যকোষ
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="overflow-hidden border-0">
          <Skeleton className="h-48 w-full" />
          <div className="p-4 bg-white">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </Card>
      ))}
    </div>
  )
}

