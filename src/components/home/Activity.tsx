"use client"

import { FaStar } from "react-icons/fa"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Title from "@/components/ui/title"
import { useGetAllContentByCategoryAndDomain } from "@/hooks/contnet.hook"
import { CalendarIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Define proper types for content items
interface ContentItem {
  _id: string
  title: string
  photo?: string
  date: string
  description?: string
}

export default function Activity({ domain }: { domain: string }) {
  // Use the fixed hook with proper query keys
  const {
    data: blogData,
    isLoading: blogLoading,
    error: blogError,
  } = useGetAllContentByCategoryAndDomain("blog", domain)

  const {
    data: eventsData,
    isLoading: eventLoading,
    error: eventError,
  } = useGetAllContentByCategoryAndDomain("events", domain)

  // Debug output to verify different data is being received
  console.log("Blog data:", blogData)
  console.log("Events data:", eventsData)

  // Extract the content items with proper typing
  const blogItems: ContentItem[] = blogData?.data || []
  const eventItems: ContentItem[] = eventsData?.data || []

  return (
    <section className="py-16">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-10">
        {/* Section Title */}
        <div className="text-center mb-10">
          <Title className="bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white px-12 inline-block">কার্যক্রম</Title>
        </div>

        <div className="mt-10 grid lg:grid-cols-4 gap-14 lg:gap-8">
          {/* Blogs Section */}
          <div className="order-2 lg:order-1 lg:col-span-1">
            <h3 className="text-xl md:text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">লেখালেখি</h3>

            <div className="space-y-4 my-8">
              {/* Show loading, error, or data */}
              {blogLoading ? (
                <BlogSkeletonLoader />
              ) : blogError ? (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-red-600">ডাটা লোড করতে সমস্যা হয়েছে!</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => window.location.reload()}>
                    আবার চেষ্টা করুন
                  </Button>
                </div>
              ) : blogItems.length > 0 ? (
                blogItems.slice(0, 6).map((blog) => (
                  <div key={blog._id} className="group">
                    <Link
                      href={`/${blog._id}`}
                      className="hover:underline flex gap-3 items-start group-hover:text-[#e7000b] transition-colors"
                    >
                      <FaStar className="text-xl flex-shrink-0 text-[#C74646] mt-1" />
                      <span className="line-clamp-2 font-medium">{blog?.title}</span>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600">কোনো ব্লগ পাওয়া যায়নি</p>
                </div>
              )}
            </div>

            {/* Read More Button */}
            <Link href="/category/blog">
              <Button
                variant="destructive"
                className="w-full md:w-auto px-7 py-5 text-base font-semibold transition-all duration-300 hover:translate-y-[-2px]"
              >
                আরও পড়ুন
              </Button>
            </Link>
          </div>

          {/* Events Section */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <h3 className="text-xl md:text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">সংবাদ</h3>

            <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Show loading, error, or data */}
              {eventLoading ? (
                <EventSkeletonLoader />
              ) : eventError ? (
                <div className="col-span-full p-6 bg-red-50 rounded-lg text-center">
                  <p className="text-red-600 font-medium">ডাটা লোড করতে সমস্যা হয়েছে!</p>
                  <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                    আবার চেষ্টা করুন
                  </Button>
                </div>
              ) : eventItems.length > 0 ? (
                eventItems.slice(0, 6).map((event) => (
                  <Card
                    key={event._id}
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={event.photo || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        priority={false}
                      />
                    </div>
                    <CardContent className="p-4 bg-white">
                      <CardTitle className="font-semibold text-lg line-clamp-2 leading-relaxed mb-2 hover:text-[#e7000b] transition-colors">
                        <Link href={`/${event._id}`}>{event.title}</Link>
                      </CardTitle>
                      <CardDescription className="flex items-center text-sm text-gray-600">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {event.date}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 bg-white">
                      <Link href={`/${event._id}`} className="text-[#e7000b] text-sm font-medium hover:underline">
                        বিস্তারিত পড়ুন →
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full p-6 bg-gray-50 rounded-lg text-center">
                  <p className="text-gray-600 font-medium">কোনো সংবাদ পাওয়া যায়নি</p>
                </div>
              )}
            </div>

            {/* Read More Button */}
            <Link href="/category/events">
              <Button
                variant="destructive"
                className="px-7 py-5 text-base font-semibold transition-all duration-300 hover:translate-y-[-2px]"
              >
                আরও সংবাদ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function BlogSkeletonLoader() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex gap-3 items-start">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-5 w-full mb-1" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
      ))}
    </>
  )
}

function EventSkeletonLoader() {
  return (
    <>
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
    </>
  )
}

