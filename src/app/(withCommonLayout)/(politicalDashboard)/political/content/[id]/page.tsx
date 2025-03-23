/* eslint-disable @next/next/no-img-element */
"use client"

import Loader from "@/components/common/Loader"
import PHForm from "@/components/form/PHForm"
import PHInput from "@/components/form/PHInput"
import PHTextarea from "@/components/form/PHTextArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/context/user.provider"
import { useGetAllContentById, useUpdateContent } from "@/hooks/contnet.hook"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { type ChangeEvent, use, useEffect, useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// Define the validation schema with Zod
const contentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(2, "Date is required"),
  place: z.string().min(1, "Place is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
})

// TypeScript type derived from the schema
type ContentFormData = z.infer<typeof contentSchema>

interface Params {
  id: string
}

export default function ContentUpdatePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { id } = use(params)
  const { data: contentData, isLoading } = useGetAllContentById(id)
  const { user } = useUser()
  const domain = user?.domain
  const router = useRouter()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { mutate: updateContent, isPending, isSuccess, data: updateResponse } = useUpdateContent()

  // Handle form submission
  const onSubmit: SubmitHandler<ContentFormData> = (formData) => {
    const formDataObj = new FormData()

    // Add image if selected
    if (imageFile) {
      formDataObj.append("file", imageFile)
    }

    // Add content data
    formDataObj.append(
      "data",
      JSON.stringify({
        ...formData,
        domain
      }),
    )

    updateContent({ id, contentData: formDataObj })
  }

  // Handle image file change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)

    // Create preview URL
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
  }

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  // Handle response after update attempt
  useEffect(() => {
    if (updateResponse && !updateResponse.success) {
      toast.error(updateResponse.message as string)
    }

    if (isSuccess && updateResponse?.success) {
      toast.success("Content updated successfully")
      router.push("/political/content")
    }
  }, [updateResponse, isSuccess, router])

  // Show loading state while fetching content data
  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {isPending && <Loader />}
      <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center py-8 px-4">
        <Card className="w-full max-w-2xl shadow-md">
          <CardHeader className="text-center bg-primary/5 rounded-t-lg pb-4">
            <CardTitle className="text-2xl font-bold text-primary">Edit Your Content</CardTitle>
            <CardDescription>Update content with complete details</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <PHForm onSubmit={onSubmit} resolver={zodResolver(contentSchema)} defaultValues={contentData?.data}>
              <div className="space-y-6">
                {/* Content Information */}
                <div>
                  <div className="flex items-center mb-4">
                    <h4 className="text-lg font-medium text-primary">Content Information</h4>
                    <Separator className="flex-1 ml-3" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PHInput label="Title" name="title" placeholder="Enter content title" />
                    <PHInput label="Date" name="date" placeholder="মার্চ ১৬, ২০২৫" />
                    <PHInput label="Place" name="place" placeholder="Event location" />
                    <PHInput label="Category" name="category" placeholder="Content category" />
                    <PHInput label="Subcategory" name="subcategory" placeholder="Content subcategory" />
                    <div className="space-y-2 col-span-full">
                      <PHTextarea name="description" label="Description" />
                    </div>
                  </div>
                </div>

                {/* Content Image */}
                <div>
                  <div className="flex items-center mb-4">
                    <h4 className="text-lg font-medium text-primary">Content Image</h4>
                    <Separator className="flex-1 ml-3" />
                  </div>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-full h-48 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {imagePreview || contentData?.data?.image ? (
                        <img
                          src={imagePreview || contentData?.data?.image || "/placeholder.svg"}
                          alt="Content preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <p className="text-sm">Upload Image</p>
                        </div>
                      )}
                    </div>
                    <label
                      className="flex h-10 px-4 cursor-pointer items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium shadow-sm transition-all duration-100 hover:bg-primary/90"
                      htmlFor="content-image"
                    >
                      {imageFile ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                      className="hidden"
                      id="content-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imageFile && <p className="text-sm text-gray-500">{imageFile.name}</p>}
                  </div>
                </div>

                {/* Submit button */}
                <Button className="w-full h-12 mt-6 text-base cursor-pointer font-medium" size="lg" type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update Content"}
                </Button>
              </div>
            </PHForm>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

