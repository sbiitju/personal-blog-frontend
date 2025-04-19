"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Title from "@/components/ui/title";
import { useGetAllContentBySubCategoryAndDomain } from "@/hooks/contnet.hook";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Params {
  subcategory: string;
}

interface ContentItem {
  _id: string;
  photo: string;
  title: string;
  date: string;
}

export default function SubCategoryPage({ params }: { params: Promise<Params> }) {
  const { subcategory } = use(params);
  const toFirstLetterCapital = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const cCategory = toFirstLetterCapital(subcategory);
  const [page, setPage] = useState(1);
  const [domain, setDomain] = useState<string>("");
  const ITEMS_PER_PAGE = 12;

  const {
    data: contents,
    isLoading: contentLoading,
    error: contentError,
  } = useGetAllContentBySubCategoryAndDomain(subcategory, domain);

  // Set domain for API call
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.hostname);
    }
  }, []);

  // Calculate total pages
  const totalItems = contents?.data?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Get current page items
  const getCurrentPageItems = () => {
    if (!contents?.data) return [];
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return contents.data.slice(startIndex, endIndex);
  };

  const currentItems = getCurrentPageItems();

  // Handle page navigation
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate pagination buttons
  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    let startPage = Math.max(1, page - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    return buttons;
  };

  // Content skeleton loader
  const ContentSkeleton = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <Card key={`skeleton-${index}`} className="gap-0 py-0">
          <Skeleton className="w-full h-[200px]" />
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </Card>
      ))}
    </>
  );

  return (
    <div>
      <Title className="bg-gradient-to-b from-[#e7000b] to-[#86383c] text-white px-10">
        {cCategory}
      </Title>

      {contentError && (
        <div className="text-center py-8 text-red-500">
          কন্টেন্ট লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।
        </div>
      )}

      <div className="my-8 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {contentLoading ? (
          <ContentSkeleton />
        ) : (
          currentItems.map((content: ContentItem) => (
            <div key={content._id}>
              <Card className="gap-0 py-0 h-full flex flex-col transition-transform hover:scale-[1.02]">
                {content.photo ? (
                  <div className="relative w-full h-[200px]">
                    <Image
                      className="object-cover"
                      src={content.photo || "/placeholder.svg"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={content.title || "Content Image"}
                      priority={page === 1}
                    />
                  </div>
                ) : (
                  <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">ছবি নেই</span>
                  </div>
                )}
                <div className=" px-2 py-2 space-y-4  flex-grow">
                  <CardTitle className="font-semibold line-clamp-3  ">
                    <Link
                      href={`/${content?._id}`}
                      className="hover:text-primary hover:underline tracking-wider leading-relaxed"
                    >
                      {content?.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{content.date}</CardDescription>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Show pagination only if we have content and more than one page */}
      {!contentLoading && totalItems > 0 && totalPages > 1 && (
        <div className="flex justify-center flex-wrap items-center gap-2 my-8">
          {/* Backward button */}
          <Button
            onClick={() => handlePageChange(page - 1)}
            variant="outline"
            className="hover:cursor-pointer"
            disabled={page === 1}
            aria-label="Previous page"
          >
            <IoIosArrowBack />
          </Button>

          {/* First page button if not visible */}
          {getPaginationButtons()[0] > 1 && (
            <>
              <Button
                onClick={() => handlePageChange(1)}
                variant="outline"
                className="hover:cursor-pointer"
              >
                1
              </Button>
              {getPaginationButtons()[0] > 2 && (
                <span className="px-2">...</span>
              )}
            </>
          )}

          {/* Pagination buttons */}
          {getPaginationButtons().map((pageNum) => (
            <Button
              onClick={() => handlePageChange(pageNum)}
              key={`pagination-${pageNum}`}
              variant={page === pageNum ? "destructive" : "outline"}
              className="hover:cursor-pointer"
            >
              {pageNum}
            </Button>
          ))}

          {/* Last page button if not visible */}
          {getPaginationButtons()[getPaginationButtons().length - 1] <
            totalPages && (
            <>
              {getPaginationButtons()[getPaginationButtons().length - 1] <
                totalPages - 1 && <span className="px-2">...</span>}
              <Button
                onClick={() => handlePageChange(totalPages)}
                variant="outline"
                className="hover:cursor-pointer"
              >
                {totalPages}
              </Button>
            </>
          )}

          {/* Forward button */}
          <Button
            onClick={() => handlePageChange(page + 1)}
            variant="outline"
            className="hover:cursor-pointer"
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <IoIosArrowForward />
          </Button>
        </div>
      )}

      {/* Show message when no content is available */}
      {!contentLoading && totalItems === 0 && !contentError && (
        <div className="flex justify-center items-center py-12 px-6">
          <div className="text-center max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">
              কোন কন্টেন্ট পাওয়া যায়নি
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}
