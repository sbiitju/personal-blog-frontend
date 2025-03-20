/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { use, useEffect, useState } from "react"
import Image from "next/image"
import { CalendarIcon, Clock, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useGetUserByDomain } from "@/hooks/auth.hook"
import { useGetAllContentById } from "@/hooks/contnet.hook"

interface Params {
  id: string
}

export default function ContentDetails({
  params,
}: {
  params: Promise<Params>
}) {
  const { id } = use(params)
  const { data: contentsData, isLoading, isError } = useGetAllContentById(id)
  const content = contentsData?.data || []

  const [domain, setDomain] = useState<string>("")
  const { data: userData } = useGetUserByDomain(domain)
  const user = userData?.data || {}

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname)
    }
  }, [])

  if (isError) {
    return (
      <Card className="max-w-4xl mx-auto my-8 shadow-md">
        <CardContent className="py-10">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-red-500">কন্টেন্ট লোড করতে সমস্যা হয়েছে</h2>
            <p className="text-gray-600">দুঃখিত, আপনার অনুরোধ করা কন্টেন্টটি এই মুহূর্তে উপলব্ধ নয়। পরে আবার চেষ্টা করুন।</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {isLoading ? (
        <ContentDetailsSkeleton />
      ) : (
        <Card className="overflow-hidden shadow-md border-gray-200">
          <div className="relative aspect-video w-full">
            <Image
              className="object-cover"
              src={content?.photo || "/placeholder.svg?height=500&width=1000"}
              fill
              sizes="(max-width: 768px) 100vw, 1000px"
              priority
              alt={content?.title || "Content image"}
            />
          </div>

          <CardHeader className="space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {content?.title}
              </CardTitle>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{content?.date || "No date available"}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{content?.readTime || "5 min read"}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage
                  src={user?.profilePicture || "/placeholder.svg?height=40&width=40"}
                  alt={user?.name || "Author"}
                />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.name || "Anonymous"}</p>
                <p className="text-sm text-muted-foreground">{user?.title || "Author"}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="prose prose-lg max-w-none pb-10">
            {content?.description ? (
              <div className="text-justify leading-relaxed space-y-4">
                {content.description.split("\n\n").map((paragraph : any, index : number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">No content available</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ContentDetailsSkeleton() {
  return (
    <Card className="overflow-hidden shadow-md border-gray-200">
      <Skeleton className="aspect-video w-full" />

      <CardHeader className="space-y-4">
        <div className="space-y-3">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-10 w-1/2" />

          <div className="flex items-center gap-4 pt-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>

        <Skeleton className="h-px w-full" />

        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-10">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
      </CardContent>
    </Card>
  )
}

