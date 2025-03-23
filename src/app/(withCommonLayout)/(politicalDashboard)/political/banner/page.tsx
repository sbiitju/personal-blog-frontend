"use client";
import { useUser } from "@/context/user.provider";
import { useDeleteBanner, useGetAllBanner } from "@/hooks/banner.hook";
import React from "react";
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

const AllBanner = () => {
  const { user } = useUser();
  const {
    data: bannerData,
    isLoading,
    isError,
  } = useGetAllBanner(user?.domain || "");
  
  const { mutate: deleteBanner } = useDeleteBanner();

  const handleDelete = (id: string) => {
    console.log(`Deleting banner with ID: ${id}`); 
    deleteBanner(id);
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-2xl font-semibold text-center mb-4">All Banners</h2>

      {isLoading && (
        <p className="text-center text-gray-600">Loading banners...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">Failed to load banners.</p>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <Table className="w-full lg:w-[500px]">
            <TableCaption>List of all banners</TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-[80px] text-center">No.</TableHead>
                <TableHead className="text-center">Banner Image</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bannerData?.data?.length > 0 ? (
                bannerData.data.map(
                  (banner: { _id: string; image: string }, key: number) => (
                    <TableRow key={banner._id}>
                      <TableCell className="text-center font-medium">
                        {key + 1}
                      </TableCell>
                      <TableCell className="flex justify-center py-2">
                        <div className="relative h-20 w-40 rounded-md shadow-md overflow-hidden">
                          <Image
                            src={banner.image}
                            alt="Banner"
                            fill
                            sizes="(max-width: 640px) 100px, (max-width: 768px) 200px, 250px"
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(banner._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-4 text-gray-500"
                  >
                    No banners found.
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

export default AllBanner;
