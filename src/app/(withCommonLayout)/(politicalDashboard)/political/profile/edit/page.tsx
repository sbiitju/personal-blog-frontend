"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Save, Upload, X } from "lucide-react";

import Loader from "@/components/common/Loader";
import PHForm from "@/components/form/PHForm";
import PHInput from "@/components/form/PHInput";
import PHTextArea from "@/components/form/PHTextArea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { useGetLoggedPoliticalUser, useUpdatePoliticalProfile } from "@/hooks/political.hook";
import { IPolitical } from "@/types";

// Validation schema for political profile update
const politicalProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(1, "Phone is required"),
  domain: z.string().min(1, "Domain is required"),
  position: z.string().min(1, "Position is required"),
  address: z.string().min(1, "Address is required"),
  dateOfBirth: z.string().optional(),
  bio: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  emailJs_serviceId: z.string().optional(),
  emailJs_templateId: z.string().optional(),
  emailJs_publicKey: z.string().optional(),
  emailJs_toEmail: z.string().email("Invalid email").optional(),
});

function EditPoliticalProfile() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const { data: userData, isLoading: isLoadingUser } = useGetLoggedPoliticalUser();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdatePoliticalProfile();

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  // Clear selected file
  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Filter out empty social media links
    const socialLinks: Record<string, string> = {};
    if (data.facebook && data.facebook.trim()) socialLinks.facebook = data.facebook.trim();
    if (data.youtube && data.youtube.trim()) socialLinks.youtube = data.youtube.trim();
    if (data.instagram && data.instagram.trim()) socialLinks.instagram = data.instagram.trim();
    if (data.twitter && data.twitter.trim()) socialLinks.twitter = data.twitter.trim();

    // Create FormData for file upload
    const formData = new FormData();
    
    // Add the file if selected
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    
    // Add other form data
    const updateData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
      bio: data.bio,
      domain: data.domain,
      position: data.position,
      address: data.address,
      ...(Object.keys(socialLinks).length > 0 && { socialLinks }),
      emailJs: {
        serviceId: data.emailJs_serviceId || undefined,
        templateId: data.emailJs_templateId || undefined,
        publicKey: data.emailJs_publicKey || undefined,
        toEmail: data.emailJs_toEmail || undefined,
      },
    };
    
    // Append the JSON data
    formData.append("data", JSON.stringify(updateData));

    // Use the updateProfile mutation with FormData
    updateProfile(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        clearFile();
        router.push("/political/profile");
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to update profile");
      },
    });
  };

  if (isLoadingUser) {
    return <Loader />;
  }

  const user = userData?.data as IPolitical;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/political/profile")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
          <div>
            <h1 className="text-2xl font-bengali-bold">প্রোফাইল সম্পাদনা</h1>
            <p className="text-gray-600 font-bengali-normal">আপনার প্রোফাইল তথ্য আপডেট করুন</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-bengali-semibold">প্রোফাইল ছবি</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32">
                <AvatarImage
                  src={previewUrl || user?.profilePicture}
                  alt={user?.name}
                />
                <AvatarFallback className="text-3xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2 w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="profile-picture"
                />
                <label
                  htmlFor="profile-picture"
                  className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  ছবি নির্বাচন করুন
                </label>

                {selectedFile && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{selectedFile.name}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={clearFile}
                      >
                        <X className="w-4 h-4" />
                        সরান
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      ছবিটি প্রোফাইল আপডেট করার সময় আপলোড হবে
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-bengali-semibold">প্রোফাইল তথ্য</CardTitle>
          </CardHeader>
          <CardContent>
            <PHForm
              onSubmit={onSubmit}
              resolver={zodResolver(politicalProfileSchema)}
              defaultValues={{
                name: user?.name || "",
                email: user?.email || "",
                phone: user?.phone || "",
                dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : "",
                bio: user?.bio || "",
                domain: user?.domain || "",
                position: user?.position || "",
                address: user?.address || "",
                facebook: user?.socialLinks?.facebook || "",
                youtube: user?.socialLinks?.youtube || "",
                instagram: user?.socialLinks?.instagram || "",
                twitter: user?.socialLinks?.twitter || "",
                emailJs_serviceId: user?.emailJs?.serviceId || "",
                emailJs_templateId: user?.emailJs?.templateId || "",
                emailJs_publicKey: user?.emailJs?.publicKey || "",
                emailJs_toEmail: user?.emailJs?.toEmail || user?.email || "",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PHInput
                  name="name"
                  label="নাম"
                  placeholder="আপনার নাম লিখুন"
                />
                <PHInput
                  name="email"
                  label="ইমেইল"
                  placeholder="আপনার ইমেইল লিখুন"
                  type="email"
                />
                <PHInput
                  name="phone"
                  label="ফোন নম্বর"
                  placeholder="আপনার ফোন নম্বর লিখুন"
                />
                <PHInput
                  name="dateOfBirth"
                  label="জন্ম তারিখ"
                  placeholder="জন্ম তারিখ নির্বাচন করুন"
                  type="date"
                />
                <PHInput
                  name="domain"
                  label="ডোমেইন"
                  placeholder="আপনার ডোমেইন লিখুন"
                />
                <PHInput
                  name="position"
                  label="পদবি"
                  placeholder="আপনার পদবি লিখুন"
                />
              </div>

              <div className="mt-4">
                <PHInput
                  name="address"
                  label="ঠিকানা"
                  placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                />
              </div>

              <div className="mt-4">
                <PHTextArea
                  name="bio"
                  label="জীবন বৃত্তান্ত"
                />
              </div>

              <Separator className="my-6" />

              {/* EmailJS Settings */}
              <div>
                <h3 className="text-lg font-bengali-semibold mb-4">ইমেইলজেএস সেটিংস (ঐচ্ছিক)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PHInput name="emailJs_serviceId" label="Service ID" placeholder="EmailJS Service ID" />
                  <PHInput name="emailJs_templateId" label="Template ID" placeholder="EmailJS Template ID" />
                  <PHInput name="emailJs_publicKey" label="Public Key" placeholder="EmailJS Public Key" />
                  <PHInput name="emailJs_toEmail" type="email" label="Recipient Email" placeholder="Advice receiver email" />
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-lg font-bengali-semibold mb-4">সামাজিক মাধ্যমের লিংক</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PHInput
                    name="facebook"
                    label="ফেসবুক"
                    placeholder="ফেসবুক প্রোফাইল লিংক"
                    type="url"
                  />
                  <PHInput
                    name="youtube"
                    label="ইউটিউব"
                    placeholder="ইউটিউব চ্যানেল লিংক"
                    type="url"
                  />
                  <PHInput
                    name="instagram"
                    label="ইনস্টাগ্রাম"
                    placeholder="ইনস্টাগ্রাম প্রোফাইল লিংক"
                    type="url"
                  />
                  <PHInput
                    name="twitter"
                    label="টুইটার"
                    placeholder="টুইটার প্রোফাইল লিংক"
                    type="url"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1"
                >
                  {isUpdating ? <Loader /> : <Save className="w-4 h-4 mr-2" />}
                  আপডেট করুন
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/political/profile")}
                >
                  বাতিল করুন
                </Button>
              </div>
            </PHForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default EditPoliticalProfile;
