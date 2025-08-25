/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useCreateBanner } from "@/hooks/banner.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Image as ImageIcon, CheckCircle } from "lucide-react";
import Link from "next/link";

const CreateBanner = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: uploadBanner, isPending, isSuccess } = useCreateBanner();
  const router = useRouter();

  // Handle successful upload
  useEffect(() => {
    if (isSuccess) {
      toast.success("ব্যানার সফলভাবে আপলোড হয়েছে");
      router.push("/political/banner");
    }
  }, [isSuccess, router]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("অনুগ্রহ করে একটি ব্যানার আপলোড করুন");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    uploadBanner(formData);
  };

  // Handle image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ফাইল সাইজ ৫MB এর বেশি হতে পারবে না");
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("শুধুমাত্র ছবি ফাইল আপলোড করা যাবে");
        return;
      }

      setImageFile(file);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  // Cleanup image preview URL
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bengali-bold text-gray-900">নতুন ব্যানার তৈরি</h1>
          <p className="text-gray-600 font-bengali-normal mt-2">আপনার নতুন ব্যানার আপলোড করুন</p>
        </div>
        <Link href="/political/banner">
          <Button variant="outline" className="font-bengali-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            ফিরে যান
          </Button>
        </Link>
      </div>

      {/* Form Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50">
        <CardHeader className="text-center bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <ImageIcon className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bengali-bold text-gray-900">নতুন ব্যানার</CardTitle>
          <CardDescription className="font-bengali-normal text-gray-600">
            আপনার ওয়েবসাইটের জন্য ব্যানার আপলোড করুন
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Banner Preview Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bengali-semibold text-gray-900">ব্যানার প্রিভিউ</h3>
              </div>
              
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="flex-1">
                  <div className="w-full h-80 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-green-400 hover:bg-green-50/50">
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={imagePreview}
                          alt="Banner Preview"
                          fill
                          className="object-cover rounded-lg"
                          onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                          <Badge className="bg-white/90 text-gray-800 font-bengali-medium">
                            ব্যানার দেখুন
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                        <div className="space-y-2">
                          <p className="text-lg font-bengali-medium text-gray-600">ব্যানার আপলোড করুন</p>
                          <p className="text-sm text-gray-500 font-bengali-normal">PNG, JPG, JPEG (সর্বোচ্চ ৫MB)</p>
                          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                            <span>• 1920x1080px</span>
                            <span>• 16:9 অনুপাত</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-6 w-full lg:w-auto">
                  <div className="space-y-4">
                    <label
                      htmlFor="banner-upload"
                      className="flex h-12 px-8 cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#e7000b] to-[#86383c] text-white text-sm font-bengali-medium shadow-lg transition-all duration-200 hover:from-[#d6000a] hover:to-[#7a3236] hover:shadow-xl"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {imageFile ? "ব্যানার পরিবর্তন করুন" : "ব্যানার আপলোড করুন"}
                    </label>
                    <input
                      id="banner-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    
                    {imageFile && (
                      <div className="text-center space-y-2">
                        <Badge variant="outline" className="font-bengali-medium">
                          {imageFile.name}
                        </Badge>
                        <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-bengali-medium">ফাইল নির্বাচিত হয়েছে</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Guidelines Section */}
                  <div className="space-y-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-lg font-bengali-semibold text-blue-900">ব্যানার গাইডলাইন</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bengali-normal text-blue-800">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>সর্বোচ্চ ফাইল সাইজ: ৫MB</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>সমর্থিত ফরম্যাট: PNG, JPG, JPEG</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>প্রস্তাবিত রেজোলিউশন: 1920x1080px</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>অনুপাত: 16:9 (ল্যান্ডস্কেপ)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bengali-semibold bg-gradient-to-r from-[#e7000b] to-[#86383c] text-white hover:from-[#d6000a] hover:to-[#7a3236] transition-all duration-300 shadow-lg hover:shadow-xl" 
                disabled={isPending || !imageFile}
              >
                {isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    আপলোড হচ্ছে...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    ব্যানার আপলোড করুন
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBanner;
