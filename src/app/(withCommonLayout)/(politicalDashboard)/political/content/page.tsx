"use client";

import { useUser } from "@/context/user.provider";
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
import { AlertCircle, Trash2, Edit, Plus, RefreshCw, Eye, Calendar, MapPin, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Swal from "sweetalert2";
import {
  useDeleteContent,
  useGetAllContentByDomain,
} from "@/hooks/contnet.hook";
import Link from "next/link";

// Define proper types for the content data
interface content {
  _id: string;
  domain: string;
  title: string;
  date?: string;
  place: string;
  description: string;
  photo: string;
  category: string;
  subcategory: string;
}

const AllContent = () => {
  const { user } = useUser();
  const {
    data: contentData,
    isLoading,
    isError,
    refetch,
  } = useGetAllContentByDomain(user?.domain || "");
  const { mutate: deleteContent, isSuccess: isDeleting } = useDeleteContent();

  // Initialize with empty array and update when data is available
  const [contents, setContents] = useState<content[]>([]);

  // Update state when data changes
  useEffect(() => {
    if (contentData?.data) {
      setContents(contentData.data);
    }
  }, [contentData]);

  // Handle content delete confirmation
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "এই কন্টেন্ট মুছে ফেলা হবে!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
      cancelButtonText: "বাতিল",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContent(id, {
          onSuccess: () => {
            Swal.fire({
              title: "মুছে ফেলা হয়েছে!",
              text: "কন্টেন্ট সফলভাবে মুছে ফেলা হয়েছে।",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            // Update local state to reflect deletion
            setContents((prev) => prev.filter((content) => content._id !== id));
          },
          onError: (error) => {
            Swal.fire({
              title: "ত্রুটি!",
              text: "কন্টেন্ট মুছতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
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

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      blog: "bg-blue-100 text-blue-800",
      events: "bg-green-100 text-green-800",
      informatics: "bg-purple-100 text-purple-800",
      default: "bg-gray-100 text-gray-800"
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bengali-bold text-gray-900">সব কন্টেন্ট</h1>
          <p className="text-gray-600 font-bengali-normal mt-2">আপনার সব কন্টেন্ট দেখুন এবং ব্যবস্থাপনা করুন</p>
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
          <Link href="/political/content/create-content">
            <Button className="bg-gradient-to-r from-[#e7000b] to-[#86383c] text-white hover:from-[#d6000a] hover:to-[#7a3236] font-bengali-medium">
              <Plus className="w-4 h-4 mr-2" />
              নতুন কন্টেন্ট
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bengali-medium text-blue-600">মোট কন্টেন্ট</p>
              <p className="text-3xl font-bengali-bold text-blue-900">{contents.length}</p>
            </div>
            <FileText className="w-12 h-12 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="space-y-4">
          <LoadingContentTable />
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bengali-medium">ত্রুটি</AlertTitle>
          <AlertDescription className="flex flex-col gap-2 font-bengali-normal">
            <span>কন্টেন্ট লোড করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।</span>
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
            <TableCaption className="font-bengali-medium">সব কন্টেন্টের তালিকা</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px] text-center font-bengali-medium">নং</TableHead>
                <TableHead className="text-center font-bengali-medium">ছবি</TableHead>
                <TableHead className="text-center font-bengali-medium">শিরোনাম</TableHead>
                <TableHead className="text-center font-bengali-medium">তারিখ</TableHead>
                <TableHead className="text-center font-bengali-medium">স্থান</TableHead>
                <TableHead className="text-center font-bengali-medium">শ্রেণী</TableHead>
                <TableHead className="text-center font-bengali-medium">উপ-শ্রেণী</TableHead>
                <TableHead className="text-center w-[180px] font-bengali-medium">কার্যক্রম</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.length > 0 ? (
                contents.map((content, index) => (
                  <TableRow key={content._id} className="hover:bg-gray-50/50">
                    <TableCell className="text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="flex justify-center py-4">
                      <div className="relative h-16 w-24 overflow-hidden rounded-md shadow-md transition-all hover:scale-105">
                        <Image
                          src={content?.photo || "/placeholder.svg"}
                          alt={`Content ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          className="object-cover"
                          priority={index < 2}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium font-bengali-medium max-w-[200px]">
                      <div className="truncate" title={content.title}>
                        {content.title || "শিরোনাম নেই"}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bengali-normal">
                      {content.date || "তারিখ নেই"}
                    </TableCell>
                    <TableCell className="text-center font-bengali-normal">
                      {content.place || "স্থান নেই"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`font-bengali-medium ${getCategoryColor(content.category)}`}>
                        {content.category || "শ্রেণী নেই"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="font-bengali-medium">
                        {content.subcategory || "উপ-শ্রেণী নেই"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleDelete(content._id)}
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                        <Link href={`/political/content/${content._id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4 text-green-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-24 text-center text-muted-foreground font-bengali-normal"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="w-8 h-8 text-gray-400" />
                      <span>কোন কন্টেন্ট পাওয়া যায়নি। নতুন কন্টেন্ট যোগ করুন।</span>
                      <Link href="/political/content/create-content">
                        <Button size="sm" className="font-bengali-medium">
                          <Plus className="w-4 h-4 mr-2" />
                          প্রথম কন্টেন্ট যোগ করুন
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

// Loading skeleton for the content table
const LoadingContentTable = () => (
  <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]">নং</TableHead>
          <TableHead>ছবি</TableHead>
          <TableHead>শিরোনাম</TableHead>
          <TableHead>তারিখ</TableHead>
          <TableHead>স্থান</TableHead>
          <TableHead>শ্রেণী</TableHead>
          <TableHead>উপ-শ্রেণী</TableHead>
          <TableHead className="w-[180px]">কার্যক্রম</TableHead>
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
                <Skeleton className="h-16 w-24 rounded-md" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-32 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-24 rounded-md" />
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
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default AllContent;
