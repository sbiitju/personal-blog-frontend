"use client"

import Loader from "@/components/common/Loader"
import PHForm from "@/components/form/PHForm"
import PHInput from "@/components/form/PHInput"
import PHSelect from "@/components/form/PHSelect"
import PHTextarea from "@/components/form/PHTextArea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/context/user.provider"
import { useCreateContent } from "@/hooks/contnet.hook"
import { categoryItems } from "@/lib/category-items"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { type ChangeEvent, useEffect, useState, useMemo } from "react"
import type { SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { ArrowLeft, Upload, FileText, Image as ImageIcon, Calendar, MapPin, Tag } from "lucide-react"
import Link from "next/link"

// Define the validation schema with Zod - making it less strict
const contentSchema = z.object({
  title: z.string().min(1, "শিরোনাম প্রয়োজন"),
  date: z.string().min(2, "তারিখ প্রয়োজন"),
  place: z.string().min(1, "স্থান প্রয়োজন"),
  description: z.string().min(1, "বিবরণ প্রয়োজন"),
  category: z.string().min(1, "শ্রেণী প্রয়োজন"),
  subcategory: z.string().min(1, "উপ-শ্রেণী প্রয়োজন"),
})

// TypeScript type derived from the schema
type ContentFormData = z.infer<typeof contentSchema>

export default function ContentCreatePage() {
  const { user } = useUser()
  const domain = user?.domain
  const router = useRouter()
  const [imageFiles, setImageFiles] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const { mutate: handleCreateContent, isPending, isSuccess, data } = useCreateContent()

  // Format categories for the dropdown
  const categoryOptions = useMemo(() => {
    return categoryItems.map((category) => ({
      key: category.href,
      label: category.title,
    }))
  }, [])

  // Get subcategories based on selected category
  const subcategoryOptions = useMemo(() => {
    if (!selectedCategory) return []

    const selectedCategoryData = categoryItems.find((cat) => cat.href === selectedCategory)
    if (!selectedCategoryData) return []

    return selectedCategoryData.items.map((subcat) => ({
      key: subcat.href,
      label: subcat.title,
    }))
  }, [selectedCategory])

  // Handle form submission
  const onSubmit: SubmitHandler<ContentFormData> = (formData) => {
    const { title, date, place, description, category, subcategory } = formData

    // Extract the last part of the category path for the actual category name
    const categoryName = category.split("/").pop() || ""
    const subcategoryName = subcategory.split("/").pop() || ""

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
          category: categoryName,
          subcategory: subcategoryName,
        }),
      )
      handleCreateContent(userData)
    } else {
      toast.error("অনুগ্রহ করে একটি ছবি আপলোড করুন")
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

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
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
      toast.success("কন্টেন্ট সফলভাবে তৈরি হয়েছে")
      router.push("/political/content")
    }
  }, [data, isSuccess, router])

  return (
    <>
      {isPending && <Loader />}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bengali-bold text-gray-900">নতুন কন্টেন্ট তৈরি</h1>
            <p className="text-gray-600 font-bengali-normal mt-2">আপনার নতুন কন্টেন্ট যোগ করুন</p>
          </div>
          <Link href="/political/content">
            <Button variant="outline" className="font-bengali-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ফিরে যান
            </Button>
          </Link>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
          <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bengali-bold text-gray-900">নতুন কন্টেন্ট</CardTitle>
            <CardDescription className="font-bengali-normal text-gray-600">
              আপনার কন্টেন্টের সব তথ্য পূরণ করুন
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
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
              <div className="space-y-8">
                {/* Content Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bengali-semibold text-gray-900">কন্টেন্টের তথ্য</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PHInput 
                      name="title" 
                      label="শিরোনাম *"
                      placeholder="কন্টেন্টের শিরোনাম লিখুন" 
                      className="font-bengali-normal"
                    />
                    
                    <PHInput 
                      name="date" 
                      label="তারিখ *"
                      placeholder="মার্চ ১৬, ২০২৫" 
                      className="font-bengali-normal"
                    />
                    
                    <PHInput 
                      name="place" 
                      label="স্থান *"
                      placeholder="ইভেন্টের স্থান" 
                      className="font-bengali-normal"
                    />

                    {/* Category Selection */}
                    <PHSelect
                      name="category"
                      label="শ্রেণী *"
                      options={categoryOptions}
                      onChange={handleCategoryChange}
                    />

                    {/* Subcategory Selection */}
                    <PHSelect
                      name="subcategory"
                      label="উপ-শ্রেণী *"
                      options={subcategoryOptions}
                      disabled={!selectedCategory}
                    />

                    <div className="col-span-full lg:col-span-1">
                      <PHTextarea 
                        name="description" 
                        label="বিবরণ *"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Image */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ImageIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bengali-semibold text-gray-900">কন্টেন্টের ছবি</h3>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    <div className="flex-1">
                      <div className="w-full h-64 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50">
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={imagePreview}
                              alt="Content preview"
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                              <Badge className="bg-white/90 text-gray-800 font-bengali-medium">
                                ছবি দেখুন
                              </Badge>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center space-y-3">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                            <div className="space-y-1">
                              <p className="text-sm font-bengali-medium text-gray-600">ছবি আপলোড করুন</p>
                              <p className="text-xs text-gray-500 font-bengali-normal">PNG, JPG, JPEG (সর্বোচ্চ ৫MB)</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4 w-full lg:w-auto">
                      <label
                        className="flex h-12 px-6 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#e7000b] to-[#86383c] text-white text-sm font-bengali-medium shadow-lg transition-all duration-200 hover:from-[#d6000a] hover:to-[#7a3236] hover:shadow-xl"
                        htmlFor="content-image"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {imageFiles ? "ছবি পরিবর্তন করুন" : "ছবি আপলোড করুন"}
                      </label>
                      <input
                        className="hidden"
                        id="content-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {imageFiles && (
                        <div className="text-center">
                          <Badge variant="outline" className="font-bengali-medium">
                            {imageFiles.name}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-6 border-t border-gray-200">
                  <Button 
                    className="w-full h-14 text-lg font-bengali-semibold bg-gradient-to-r from-[#e7000b] to-[#86383c] text-white hover:from-[#d6000a] hover:to-[#7a3236] transition-all duration-300 shadow-lg hover:shadow-xl" 
                    size="lg" 
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        তৈরি হচ্ছে...
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5 mr-2" />
                        কন্টেন্ট তৈরি করুন
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </PHForm>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
