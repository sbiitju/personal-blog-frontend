"use client";

import { useUser } from "@/context/user.provider";
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
import {
  useDeleteContent,
  useGetAllContentByDomain,
} from "@/hooks/contnet.hook";

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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContent(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "The contnet has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            // Update local state to reflect deletion
            setContents((prev) => prev.filter((content) => content._id !== id));
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete content. Please try again.",
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
        <h2 className="text-2xl font-semibold">All Content</h2>
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
          <LoadingcontentTable />
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <span>Failed to load contents. Please try again later.</span>
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
            <TableCaption>List of all Content</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">No.</TableHead>
                <TableHead className="text-center">Image</TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Place</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Subcategory</TableHead>
                <TableHead className="text-center w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.length > 0 ? (
                contents.map((content, index) => (
                  <TableRow key={content._id}>
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
                          priority={index < 2} // Prioritize loading first two images
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium   ">
                      {content.title || "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {content.date || "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {content.place || "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {content.category || "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {content.subcategory || "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(content._id)}
                        disabled={isDeleting}
                        className="gap-1 cursor-pointer"
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
                    colSpan={8}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No contents found. Add some contents to see them here.
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
const LoadingcontentTable = () => (
  <div className="overflow-x-auto rounded-lg border bg-card">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No.</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Place</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Subcategory</TableHead>
          <TableHead className="w-[100px]">Action</TableHead>
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
                <Skeleton className="h-16 w-24 rounded-md" />
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-24 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-20 rounded-md" />
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

export default AllContent;
