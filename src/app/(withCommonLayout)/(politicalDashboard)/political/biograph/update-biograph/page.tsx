/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, Suspense, useRef } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import type { FieldValues, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowRight } from "lucide-react"

import Loader from "@/components/common/Loader"
import PHForm from "@/components/form/PHForm"
import PHInput from "@/components/form/PHInput"
import { useUser } from "@/context/user.provider"

import { Button } from "@/components/ui/button"
import PHTextarea from "@/components/form/PHTextArea"
import { useGetBiographByDomain, useUpdateBiograph } from "@/hooks/biograph.hook"
import { bioGraphValidationSchema } from "@/schema/bio.schema"

// Import RichTextEditor with dynamic import to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/form/RichTextEditor"), {
  ssr: false,
})

// Define the RichTextEditorHandle type
type RichTextEditorHandle = {
  getContent: () => string
  setContent: (content: string) => void
}

function UpdateBiograph() {
  const editorRef = useRef<RichTextEditorHandle>(null)
  const { user, setIsLoading: userLoading } = useUser()
  const router = useRouter()

  const { data: biographData, isLoading, isError, refetch } = useGetBiographByDomain(user?.domain || "")

  const { mutate: handleBiographUpdate, isPending, isSuccess, data } = useUpdateBiograph();
 
  // Set editor content when biograph data is loaded
  useEffect(() => {
    if (biographData?.data?.description && editorRef.current) {
      editorRef?.current?.setContent(biographData?.data?.description)
    }
  }, [biographData])

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    const editorContent = editorRef.current?.getContent();

    const finalData : any = {
      ...formData,
      description: editorContent, 
    }

    console.log("finalData", finalData)
    const domain = finalData?.domain
    handleBiographUpdate({ domain, bioData: finalData })
    userLoading(true)
  }

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data?.message)
    } else if (!isPending && isSuccess) {
      toast.success("Biograph updated successfully!")
      router.push("/political/biograph")
    }
  }, [isPending, isSuccess, router, data])

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Error loading biograph data</h2>
          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {isPending && <Loader />}
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full space-y-8 flex flex-col items-center text-center">
          <div className="space-y-2 w-full">
            <h2 className="text-3xl font-bold tracking-tight">Update Biograph</h2>
            <p className="text-muted-foreground">Update your biograph information below.</p>
          </div>

          <div className="w-full md:w-[500px] lg:w-[900px] rounded-xl shadow-lg p-6 border border-border/50 bg-white">
            <PHForm
              defaultValues={biographData?.data}
              resolver={zodResolver(bioGraphValidationSchema)}
              onSubmit={onSubmit}
            >
              <div className="space-y-5">
                <div>
                  <PHInput label="Domain" name="domain" placeholder="domain.com" disabled={true} />
                </div>
                <PHTextarea label="Short Description" name="shortDescription" />

                {/* Replace PHTextarea with RichTextEditor for Long Description */}
                <div>
                  <h1 className="text-left font-semibold mb-2 text-lg">Long Description</h1>
                  <RichTextEditor ref={editorRef} />
                </div>

                <Button className="w-full cursor-pointer font-semibold" size="lg" type="submit">
                  Update Biograph
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </PHForm>
          </div>
        </div>
      </div>
    </>
  )
}

export default function UpdateBiographPage() {
  return (
    <Suspense fallback={<Loader />}>
      <UpdateBiograph />
    </Suspense>
  )
}
