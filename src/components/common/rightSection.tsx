/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllContentByDomain } from "@/hooks/contnet.hook";
import { useGetUserByDomain } from "@/hooks/auth.hook";

export default function RightSection() {
  const [domain, setDomain] = useState<string>("");

  const {
    data: contentsData,
    isLoading,
    isError,
  } = useGetAllContentByDomain(domain);
  const contents = contentsData?.data?.slice(0, 8) || [];

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserByDomain(domain);
  const socialLinks = userData?.data?.socialLinks || {};

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Recent Blogs Section */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            সাম্প্রতিক
          </h2>
          <Link
            href="/category/blog"
            className="text-sm text-primary flex items-center hover:underline group transition-all"
          >
            সব দেখুন{" "}
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          ) : isError ? (
            <p className="text-red-500 py-4 text-center">
              কন্টেন্ট লোড করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।
            </p>
          ) : contents.length === 0 ? (
            <p className="text-gray-500 py-4 text-center">
              কোন সাম্প্রতিক কন্টেন্ট নেই
            </p>
          ) : (
            contents.map((content: any) => (
              <Link
                href={`/${content._id}`}
                key={content._id}
                className="block"
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100 hover:border-primary/20 rounded-lg p-0 group">
                  <div className="flex flex-row items-center">
                    <div className="relative aspect-square h-24 w-24 sm:h-28 sm:w-28">
                      <Image
                        className="object-cover rounded-l-lg"
                        src={
                          content?.photo ||
                          "/placeholder.svg?height=112&width=112"
                        }
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
                      <CardDescription className="text-xs">
                        {content.date}
                      </CardDescription>
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
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          সোশ্যাল মিডিয়া
        </h2>
        <div className="flex gap-4 justify-start items-center">
          {isUserLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <SocialLinkSkeleton key={index} />
            ))
          ) : isUserError ? (
            <p className="text-red-500 py-2 text-center">
              সোশ্যাল লিংক লোড করতে সমস্যা হয়েছে।
            </p>
          ) : (
            <div className="flex gap-4 justify-center ">
            {socialLinks?.facebook && (
              <Link
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group"
              >
                <FaFacebookF className="text-blue-600 text-2xl transition-transform transform group-hover:scale-110 group-hover:text-blue-800 cursor-pointer" />
              </Link>
            )}
            {socialLinks?.instagram && (
              <Link
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group"
              >
                <FaInstagram className="text-pink-600 text-2xl transition-transform transform group-hover:scale-110 group-hover:text-pink-800 cursor-pointer" />
              </Link>
            )}
            {socialLinks?.youtube && (
              <Link
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="group"
              >
                <FaYoutube className="text-red-600 text-2xl transition-transform transform group-hover:scale-110 group-hover:text-red-800 cursor-pointer" />
              </Link>
            )}
            {socialLinks?.twitter && (
              <Link
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group"
              >
                <FaTwitter className="text-blue-500 text-2xl transition-transform transform group-hover:scale-110 group-hover:text-blue-700 cursor-pointer" />
              </Link>
            )}
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
}

/* Blog Card Skeleton */
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
  );
}

/* Social Link Skeleton */
function SocialLinkSkeleton() {
  return (
    <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
  );
}
