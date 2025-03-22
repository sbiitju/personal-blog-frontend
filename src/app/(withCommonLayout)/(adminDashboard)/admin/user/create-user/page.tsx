"use client"

import Loader from "@/components/common/Loader"
import PHForm from "@/components/form/PHForm"
import PHInput from "@/components/form/PHInput"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useUserRegistration } from "@/hooks/auth.hook"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { type ChangeEvent, useEffect, useState } from "react"
import type { SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// Define the validation schema with Zod - making it less strict
const politicalUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  bio: z.string().optional(),
  position: z.string().optional(),
  address: z.string().optional(),
  domain: z.string().min(1, "Domain is required"),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
})

// TypeScript type derived from the schema
type PoliticalUserFormData = z.infer<typeof politicalUserSchema>

export default function PoliticalUserRegisterPage() {
  const router = useRouter()
  const [imageFiles, setImageFiles] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { mutate: handleUserRegistration, isPending, isSuccess, data } = useUserRegistration()

  // Handle form submission
  const onSubmit: SubmitHandler<PoliticalUserFormData> = (formData) => {
    console.log("Form submitted:", formData)
    const {
      password,
      name,
      email,
      phone,
      dateOfBirth,
      bio,
      facebook,
      youtube,
      instagram,
      twitter,
      domain,
      position,
      address,
    } = formData

    const userData = new FormData()

    // Check if a profile picture is selected
    if (imageFiles !== null) {
      userData.append("file", imageFiles) // Append image
      // Append password and client details as JSON string
      userData.append(
        "data",
        JSON.stringify({
          password,
          role: "political",
          client: {
            name,
            email,
            phone,
            dateOfBirth: dateOfBirth || "",
            bio: bio || "",
            socialLinks: {
              facebook: facebook || "",
              youtube: youtube || "",
              instagram: instagram || "",
              twitter: twitter || "",
            },
            domain: domain || "",
            position: position || "",
            address: address || "",
          },
        }),
      )
      handleUserRegistration(userData)
    } else {
      toast.error("Please upload a profile picture")
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
      toast.success("Political user created successfully")
      router.push("/admin/user") // Redirect to homepage or login page after success
    }
  }, [data, isSuccess, router])

  return (
    <>
      {isPending && <Loader />}
      <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center py-8 px-4  ">
        <Card className="w-full max-w-2xl shadow-md">
          <CardHeader className="text-center bg-primary/5 rounded-t-lg pb-4">
            <CardTitle className="text-2xl font-bold text-primary">Political User Registration</CardTitle>
            <CardDescription>Create your political profile with complete details</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <PHForm
              onSubmit={onSubmit}
              resolver={zodResolver(politicalUserSchema)}
              defaultValues={{
                name: "",
                email: "",
                phone: "",
                password: "",
                bio: "",
                position: "",
                address: "",
                domain: "",
                facebook: "",
                youtube: "",
                instagram: "",
                twitter: "",
              }}
            >
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <div className="flex items-center mb-4">
                    <h4 className="text-lg font-medium text-primary">Basic Information</h4>
                    <Separator className="flex-1 ml-3" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <PHInput label="Full Name"   name="name" placeholder="আবুল কালাম আজাদ" />
                    <PHInput label="Email" name="email" type="email" />
                    <PHInput label="Phone" name="phone" />
                    <PHInput label="Date Of Birth" name="dateOfBirth" type="date" />
                    <PHInput label="Password" name="password" type="password" />
                  </div>
                </div>

                {/* Profile Picture */}
                <div>
                  <div className="flex items-center mb-4">
                    <h4 className="text-lg font-medium text-primary">Profile Picture</h4>
                    <Separator className="flex-1 ml-3" />
                  </div>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <p className="text-sm">Upload Photo</p>
                        </div>
                      )}
                    </div>
                    <label
                      className="flex h-10 px-4 cursor-pointer items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium shadow-sm transition-all duration-100 hover:bg-primary/90"
                      htmlFor="profile-image"
                    >
                      {imageFiles ? "Change Photo" : "Upload Photo"}
                    </label>
                    <input
                      className="hidden"
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imageFiles && <p className="text-sm text-gray-500">{imageFiles.name}</p>}
                  </div>
                </div>

                {/* Profile Details */}
                <div>
                  <div className="flex items-center mb-4">
                    <h4 className="text-lg font-medium text-primary">Profile Details</h4>
                    <Separator className="flex-1 ml-3" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bio</label>
                      <textarea
                        name="bio"
                        className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="A passionate leader in politics and social work."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PHInput label="Position" name="position" placeholder="কেন্দ্রীয় কর্মপরিষদ সদস্য" />
                      <PHInput label="Address" name="address" placeholder="দক্ষিণ চব্বিশ পরগনা জেলা" />
                      <PHInput label="Domain" name="domain" placeholder="example.com" />
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <div className="flex items-center mb-4">
                    <h4 className="text-lg font-medium text-primary">Social Media Links</h4>
                    <Separator className="flex-1 ml-3" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PHInput label="Facebook" name="facebook" placeholder="https://facebook.com/username" />
                    <PHInput label="YouTube" name="youtube" placeholder="https://youtube.com/@username" />
                    <PHInput label="Instagram" name="instagram" placeholder="https://instagram.com/username" />
                    <PHInput label="Twitter" name="twitter" placeholder="https://twitter.com/username" />
                  </div>
                </div>

                {/* Submit button */}
                <Button className="w-full h-12 mt-6 text-base font-medium" size="lg" type="submit">
                  Register Political User
                </Button>
              </div>
            </PHForm>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

