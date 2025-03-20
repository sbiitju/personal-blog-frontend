/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { Card, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Title from "../ui/title";
import { useGetAllContentByCategoryAndDomain } from "@/hooks/contnet.hook";

export default function Activity({ domain }: { domain: string }) {
  const { data: blogData, isLoading: blogLoading, error: blogError } = 
    useGetAllContentByCategoryAndDomain("blog", domain);
  const { data: eventsData, isLoading: eventLoading, error: eventError } = 
    useGetAllContentByCategoryAndDomain("events", domain);
console.log("eventdata", eventsData)
  return (
    <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-10">
      {/* Section Title */}
      <div className="text-center">
        <Title className="bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white px-12">
          কার্যক্রম
        </Title>
      </div>

      <div className="mt-10 grid lg:grid-cols-4 gap-14 lg:gap-5">
        {/* Blogs Section */}
        <div className="order-2 lg:order-1 lg:col-span-1">
          <h3 className="text-xl md:text-2xl font-semibold">লেখালেখি</h3>

          <div className="space-y-2 my-8">
            {/* Show loading, error, or data */}
            {blogLoading ? (
              <p>লোড হচ্ছে...</p>
            ) : blogError ? (
              <p className="text-red-500">ডাটা লোড করতে সমস্যা হয়েছে!</p>
            ) : blogData?.data?.length > 0 ? (
              blogData.data.slice(0, 6).map((blog: any, index: number) => (
                <div key={index}>
                  <Link
                    href={`/${blog?._id}`}
                    className="hover:underline flex gap-2 items-start"
                  >
                    <FaStar className="text-2xl md:text-xl text-[#C74646]" />
                    <span className="line-clamp-2">{blog?.title}</span>
                  </Link>
                </div>
              ))
            ) : (
              <p>কোনো ব্লগ পাওয়া যায়নি</p>
            )}
          </div>

          {/* Read More Button */}
          <Link href="/category/blog">
            <Button
              variant="destructive"
              className="px-7 py-5 text-base font-semibold hover:cursor-pointer hover:bg-gray-200 hover:text-black transition-all duration-300"
            >
              আরও পড়ুন
            </Button>
          </Link>
        </div>

        {/* Events Section */}
        <div className="order-1 lg:order-2 lg:col-span-3">
          <h3 className="text-xl md:text-2xl font-semibold">সংবাদ</h3>

          <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Show loading, error, or data */}
            {eventLoading ? (
              <p>লোড হচ্ছে...</p>
            ) : eventError ? (
              <p className="text-red-500">ডাটা লোড করতে সমস্যা হয়েছে!</p>
            ) : eventsData?.data?.length > 0 ? (
              eventsData.data.slice(0, 6).map((event: any, index: number) => (
                <Card key={index} className="gap-0 py-0 bg-[#FFDBDB]">
                  <Image
                    className="w-full"
                    src={event?.photo}
                    width={400}
                    height={200}
                    alt={event.title}
                  />
                  <div className="px-2 py-2 space-y-4">
                    <CardTitle className="font-semibold line-clamp-2 leading-relaxed">
                      <Link href={`/${event?._id}`}>{event.title}</Link>
                    </CardTitle>
                    <CardDescription>{event.date}</CardDescription>
                  </div>
                </Card>
              ))
            ) : (
              <p>কোনো সংবাদ পাওয়া যায়নি</p>
            )}
          </div>

          {/* Read More Button */}
          <Link href="/category/events">
            <Button
              variant="destructive"
              className="px-7 py-5 text-base font-semibold hover:cursor-pointer hover:bg-gray-200 hover:text-black transition-all duration-300"
            >
              আরও সংবাদ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
