import Link from "next/link"
import { BookOpen, AlertCircle } from "lucide-react"

import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { Alert, AlertDescription } from "../ui/alert"
import Title from "../ui/title"
import { useGetBiographByDomain } from "@/hooks/biograph.hook"

interface DescriptionProps {
  domain: string
}

export default function Description({ domain }: DescriptionProps) {
  const { data: bioData, isLoading, isError } = useGetBiographByDomain(domain)



  const title = "জীবন বৃত্তান্ত"
  const shortDescription = "পারিবারিক ও শিক্ষা জীবন"
  const description = bioData?.data?.shortDescription

  return (
    <section className="bg-gradient-to-r from-[#FFDBDB] to-[#FFE5E5]">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 xl:px-0 py-8 flex justify-center items-center">
        <div className="text-center max-w-3xl relative">
          

          <Title className="bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white px-12 py-2 rounded-md shadow-md transform hover:scale-[1.02] transition-transform duration-300">
            {title}
          </Title>

          {isLoading ? (
            <DescriptionSkeleton />
          ) : isError ? (
            <Alert variant="destructive" className="mt-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>ডাটা আনতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।</AlertDescription>
            </Alert>
          ) : (
            <>
              <h3 className="text-2xl my-3 font-medium text-gray-800 animate-in fade-in duration-500">
                {shortDescription}
              </h3>
              <div className="relative">
                <div className="absolute -left-6 top-0 h-full w-1 bg-gradient-to-b from-[#e7000b]/30 to-transparent rounded-full hidden md:block"></div>
                <div className="absolute -right-6 top-0 h-full w-1 bg-gradient-to-b from-[#e7000b]/30 to-transparent rounded-full hidden md:block"></div>
                <p className="text-justify md:text-center text-gray-700 leading-relaxed animate-in fade-in duration-700">
                  {description}
                </p>
              </div>
            </>
          )}

          <div className="flex justify-center mt-4">
            <Link href="/biograph">
              <Button
                variant="destructive"
                size="lg"
                className="px-8 py-6 text-lg font-semibold hover:cursor-pointer hover:bg-[#c4000a] transition-all duration-300 rounded-md shadow-md group"
              >
                <span>জীবনী পড়ুন</span>
                <BookOpen className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function DescriptionSkeleton() {
  return (
    <div className="space-y-6 mt-6 animate-pulse">
      <Skeleton className="h-8 w-3/4 mx-auto" />

      <div className="space-y-3 mt-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12 mx-auto" />
        <Skeleton className="h-5 w-10/12 mx-auto" />
        <Skeleton className="h-5 w-9/12 mx-auto" />
      </div>

      <div className="flex justify-center mt-4">
        <Skeleton className="h-14 w-40 rounded-md" />
      </div>
    </div>
  )
}

