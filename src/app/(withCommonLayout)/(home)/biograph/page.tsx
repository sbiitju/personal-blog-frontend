"use client"

 
import { BookOpen, AlertCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useGetBiographByDomain } from "@/hooks/biograph.hook"
import { useDomain } from "@/hooks/useDomain"

const Biograph = () => {
  const domain = useDomain()
  const { data: bioData, isLoading, isError } = useGetBiographByDomain(domain)
  const bio = bioData?.data?.description

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <Card className="overflow-hidden shadow-md border-gray-200">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-4">
          <div className="flex items-center justify-center gap-3 pt-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl md:text-4xl font-bold text-center">জীবনী</CardTitle>
          </div>
          <Separator className="mt-4" />
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          {isLoading ? (
            <BiographSkeleton />
          ) : isError ? (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>ত্রুটি</AlertTitle>
              <AlertDescription>জীবনী লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।</AlertDescription>
            </Alert>
          ) : bio ? (
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: bio }} />
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">কোন জীবনী পাওয়া যায়নি</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const BiographSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-full" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-10/12" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-9/12" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-8/12" />
      </div>

      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-10/12" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-7/12" />
      </div>
    </div>
  )
}

export default Biograph

