/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useCreateBanner } from "@/hooks/banner.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CreateBanner = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: uploadBanner, isPending, isSuccess } = useCreateBanner();
  const router = useRouter();

  // Handle successful upload
  useEffect(() => {
    if (isSuccess) {
      router.push("/political/banner");
    }
  }, [isSuccess, router]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please upload a banner");
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
    <div className="flex justify-center items-center  ">
      <Card className="w-full max-w-lg shadow-lg rounded-lg bg-white">
        <CardHeader className="text-center bg-gray-100 rounded-t-lg p-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Upload Banner
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
            {/* Banner Preview */}
            <div className="w-64 h-40 rounded-lg bg-gray-200 border border-dashed flex items-center justify-center overflow-hidden relative transition-all">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Banner Preview"
                  fill
                  className="object-cover opacity-0 transition-opacity duration-300"
                  onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
                />
              ) : (
                <p className="text-gray-500">No image selected</p>
              )}
            </div>

            {/* Upload Button */}
            <label
              htmlFor="banner-upload"
              className="cursor-pointer px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary/90 transition-all"
            >
              {imageFile ? "Change Banner" : "Upload Banner"}
            </label>
            <input
              id="banner-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full py-3" disabled={isPending}>
              {isPending ? "Uploading..." : "Upload Banner"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBanner;
