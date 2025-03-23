"use client";

import { useUser } from "@/context/user.provider";
import { useDeleteBanner, useGetAllBanner } from "@/hooks/banner.hook";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { AlertCircle, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Swal from "sweetalert2";

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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBanner(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "The banner has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            // Update local state to reflect deletion
            setBanners((prev) => prev.filter((banner) => banner._id !== id));
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete banner. Please try again.",
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
    <div className="w-full px-4 py-6 space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-2xl font-semibold">All Banners</h2>
        <Button
          variant="outline"
          onClick={handleRetry}
          disabled={isLoading}
          className="self-end"
        >
          Refresh
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-4">
          <LoadingBannerTable />
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <span>Failed to load banners. Please try again later.</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              className="self-start"
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto rounded-lg border bg-card">
          <Table>
            <TableCaption>List of all banners</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px] text-center">No.</TableHead>
                <TableHead className="text-center">Banner Image</TableHead>
                <TableHead className="text-center w-[120px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.length > 0 ? (
                banners.map((banner, index) => (
                  <TableRow key={banner._id}>
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
                          priority={index < 2} // Prioritize loading first two images
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(banner._id)}
                        disabled={isDeleting}
                        className="gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No banners found. Add some banners to see them here.
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
  <div className="overflow-x-auto rounded-lg border bg-card">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">No.</TableHead>
          <TableHead>Banner Image</TableHead>
          <TableHead className="w-[120px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 3 }).map((_, index) => (
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
              <Skeleton className="h-9 w-20 rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default AllBanner;
