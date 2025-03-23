"use client"

import Loader from "@/components/common/Loader"
import PHForm from "@/components/form/PHForm"
import PHInput from "@/components/form/PHInput"
import PHTextarea from "@/components/form/PHTextArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/context/user.provider"
import { useCreateContent } from "@/hooks/contnet.hook"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { type ChangeEvent, useEffect, useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// Define the validation schema with Zod - making it less strict
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

export default function ContentCreatePage() {
  const { user } = useUser()
  const domain = user?.domain
  const router = useRouter()
  const [imageFiles, setImageFiles] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { mutate: handleCreateContent, isPending, isSuccess, data } = useCreateContent()

  // Handle form submission
  const onSubmit: SubmitHandler<ContentFormData> = (formData) => {
    const { title, date, place, description, category, subcategory } = formData

    const userData = new FormData()

    // Check if a content image is selected
    if (imageFiles !== null) {
      userData.append("file", imageFiles) // Append image
      // Append content details as JSON string
      userData.append(
        "data",
        JSON.stringify({
          title,
          date,
          place,
          description,
          domain,
          category,
          subcategory,
        }),
      )
      handleCreateContent(userData)
    } else {
      toast.error("Please upload a content image")
    }
  }

  // Handle image file change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0]
    if (files) {
      setImageFiles(files)

      // Create preview URL
      const previewUrl = URL.createObjectURL(files)
      setImagePreview(previewUrl)
    }
  }

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  useEffect(() => {
    if (data && !data?.success) {
      toast.error(data?.message as string)
    }
    if (isSuccess && data?.success) {
      toast.success("Content created successfully")
      router.push("/political/content")
    }
  }, [data, isSuccess, router])

  return (
    <>
      {isPending && <Loader />}
      <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center py-8 px-4">
        <Card className="w-full max-w-2xl shadow-md">
          <CardHeader className="text-center bg-primary/5 rounded-t-lg pb-4">
            <CardTitle className="text-2xl font-bold text-primary">Create New Content</CardTitle>
            <CardDescription>Add new content with complete details</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <PHForm
              onSubmit={onSubmit}
              resolver={zodResolver(contentSchema)}
              defaultValues={{
                title: "",
                date: "",
                place: "",
                description: "",
                category: "",
                subcategory: "",
              }}
            >
              <div className="space-y-6">
                {/* Content Information */}
                <div>
                  <div className="flex items-center mb-4">
                    <h4 className="text-lg font-medium text-primary">Content Information</h4>
                    <Separator className="flex-1 ml-3" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PHInput label="Title" name="title" placeholder="Enter content title" />
                    <PHInput label="Date" name="date"  placeholder="মার্চ ১৬, ২০২৫" />
                    <PHInput label="Place" name="place" placeholder="Event location" />
                    <PHInput label="Category" name="category" placeholder="Content category" />
                    <PHInput label="Subcategory" name="subcategory" placeholder="Content subcategory" />
                    <div className="space-y-2 col-span-full">
                      
                      <PHTextarea
                        name="description"
                         label="Description"
                      />
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
                      {imagePreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imagePreview || "/placeholder.svg"}
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
                      {imageFiles ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                      className="hidden"
                      id="content-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imageFiles && <p className="text-sm text-gray-500">{imageFiles.name}</p>}
                  </div>
                </div>

                {/* Submit button */}
                <Button className="w-full h-12 mt-6 text-base font-medium cursor-pointer" size="lg" type="submit">
                  Create Content
                </Button>
              </div>
            </PHForm>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

