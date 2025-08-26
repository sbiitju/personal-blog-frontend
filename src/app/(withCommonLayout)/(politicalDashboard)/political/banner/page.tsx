"use client";

import { useUser } from "@/context/user.provider";
import { useDeleteBanner, useGetAllBanner } from "@/hooks/banner.hook";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Trash2, Plus, RefreshCw, Image as ImageIcon, Eye } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Swal from "sweetalert2";
import Link from "next/link";

// Define proper types for the banner data
interface Banner {
  _id: string;
  image: string;
  // Add other banner properties if needed
}

const AllBanner = () => {
  const { user } = useUser();
  const {
    data: bannerData,
    isLoading,
    isError,
    refetch,
  } = useGetAllBanner(user?.domain || "");
  const { mutate: deleteBanner, isSuccess: isDeleting } = useDeleteBanner();

  // Initialize with empty array and update when data is available
  const [banners, setBanners] = useState<Banner[]>([]);

  // Update state when data changes
  useEffect(() => {
    if (bannerData?.data) {
      setBanners(bannerData.data);
    }
  }, [bannerData]);

  // Handle banner delete confirmation
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই ব্যানার মুছে ফেলা হবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
      cancelButtonText: "বাতিল",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBanner(id, {
          onSuccess: () => {
            Swal.fire({
              title: "মুছে ফেলা হয়েছে!",
              text: "ব্যানার সফলভাবে মুছে ফেলা হয়েছে।",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            // Update local state to reflect deletion
            setBanners((prev) => prev.filter((banner) => banner._id !== id));
          },
          onError: (error) => {
            Swal.fire({
              title: "ত্রুটি!",
              text: "ব্যানার মুছতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
              icon: "error",
            });
            console.error("Delete error:", error);
          },
        });
      }
    });
  };

  // Function to retry loading data
  const handleRetry = () => {
    refetch();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bengali-bold text-gray-900">সব ব্যানার</h1>
          <p className="text-gray-600 font-bengali-normal mt-2">আপনার সব ব্যানার দেখুন এবং ব্যবস্থাপনা করুন</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleRetry}
            disabled={isLoading}
            className="font-bengali-medium"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            রিফ্রেশ
          </Button>
          <Link href="/political/banner/create-banner">
            <Button className="bg-gradient-to-r from-[#e7000b] to-[#86383c] text-white hover:from-[#d6000a] hover:to-[#7a3236] font-bengali-medium">
              <Plus className="w-4 h-4 mr-2" />
              নতুন ব্যানার
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bengali-medium text-green-600">মোট ব্যানার</p>
              <p className="text-3xl font-bengali-bold text-green-900">{banners.length}</p>
            </div>
            <ImageIcon className="w-12 h-12 text-green-600" />
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="space-y-4">
          <LoadingBannerTable />
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bengali-medium">ত্রুটি</AlertTitle>
          <AlertDescription className="flex flex-col gap-2 font-bengali-normal">
            <span>ব্যানার লোড করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="self-start font-bengali-medium"
            >
              আবার চেষ্টা করুন
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
          <Table>
            <TableCaption className="font-bengali-medium">সব ব্যানারের তালিকা</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-center font-bengali-medium">নং</TableHead>
                <TableHead className="text-center font-bengali-medium">ব্যানার ছবি</TableHead>
                <TableHead className="text-center font-bengali-medium">স্ট্যাটাস</TableHead>
                <TableHead className="text-center font-bengali-medium">তারিখ</TableHead>
                <TableHead className="text-center w-[150px] font-bengali-medium">কার্যক্রম</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.length > 0 ? (
                banners.map((banner, index) => (
                  <TableRow key={banner._id} className="hover:bg-gray-50/50">
                    <TableCell className="text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="flex justify-center py-4">
                      <div className="relative h-24 w-48 overflow-hidden rounded-md shadow-md transition-all hover:scale-105">
                        <Image
                          src={banner.image || "/placeholder.svg"}
                          alt={`Banner ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          className="object-cover"
                          priority={index < 2}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-green-100 text-green-800 font-bengali-medium">
                        সক্রিয়
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-bengali-normal">
                      {new Date().toLocaleDateString('bn-BD')}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDelete(banner._id)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-muted-foreground font-bengali-normal"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                      <span>কোন ব্যানার পাওয়া যায়নি। নতুন ব্যানার যোগ করুন।</span>
                      <Link href="/political/banner/create-banner">
                        <Button size="sm" className="font-bengali-medium">
                          <Plus className="w-4 h-4 mr-2" />
                          প্রথম ব্যানার যোগ করুন
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

// Loading skeleton for the banner table
const LoadingBannerTable = () => (
  <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">নং</TableHead>
          <TableHead>ব্যানার ছবি</TableHead>
          <TableHead>স্ট্যাটাস</TableHead>
          <TableHead>তারিখ</TableHead>
          <TableHead className="w-[150px]">কার্যক্রম</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-6 w-6 rounded-full" />
            </TableCell>
            <TableCell>
              <div className="flex justify-center py-2">
                <Skeleton className="h-24 w-48 rounded-md" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-16 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-md" />
            </TableCell>
            <TableCell>
              <div className="flex justify-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default AllBanner;
