"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Title from "@/components/ui/title";
import { useGetAllContentByCategoryAndDomain } from "@/hooks/contnet.hook";
import { getMainCategoryBengaliTitle } from "@/lib/category-items";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Calendar, MapPin, Eye } from "lucide-react";

interface Params {
  maincategory: string;
}

interface ContentItem {
  _id: string;
  photo: string;
  title: string;
  description: string;
  date: string;
  place: string;
}

export default function CategoryPage({ params }: { params: Promise<Params> }) {
  const { maincategory } = use(params);
  
  // Get Bengali title for the category
  const bengaliTitle = getMainCategoryBengaliTitle(maincategory);
  
  const [page, setPage] = useState(1);
  const [domain, setDomain] = useState<string>("");
  const ITEMS_PER_PAGE = 9; // Reduced for better layout

  const {
    data: contents,
    isLoading: contentLoading,
    error: contentError,
  } = useGetAllContentByCategoryAndDomain(maincategory, domain);

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
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Previous button
    if (page > 1) {
      buttons.push(
        <Button
          key="prev"
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page - 1)}
          className="flex items-center gap-1 font-bengali-medium hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <IoIosArrowBack className="w-4 h-4" />
          আগে
        </Button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === page ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(i)}
          className="font-bengali-medium hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {i}
        </Button>
      );
    }

    // Next button
    if (page < totalPages) {
      buttons.push(
        <Button
          key="next"
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page + 1)}
          className="flex items-center gap-1 font-bengali-medium hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          পরবর্তী
          <IoIosArrowForward className="w-4 h-4" />
        </Button>
      );
    }

    return buttons;
  };

  const ContentSkeleton = () => (
    <>
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <div key={index} className="group">
          <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-xl">
            <div className="space-y-4">
              <Skeleton className="h-[240px] w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="px-6 pb-6">
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </Card>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#e7000b] via-[#d6000a] to-[#86383c]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="relative mt-12 container mx-auto px-4 py-12">
          <div className="flex justify-center">
            {/* Category Title Only */}
            <div className="bg-gray-100/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-2xl">
              <Title className="text-3xl md:text-4xl lg:text-5xl font-bengali-bold text-gray-800 mb-2 leading-tight text-center">
                {bengaliTitle}
              </Title>
              <div className="w-16 h-1 bg-gray-600 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 pb-16 mt-16 relative z-10">
        {contentError && (
          <div className="text-center py-12">
            <div className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-2xl p-8 max-w-md mx-auto shadow-xl">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-red-700 font-bengali-semibold text-lg mb-2">
                কন্টেন্ট লোড করতে সমস্যা হয়েছে
              </h3>
              <p className="text-red-600 font-bengali-normal text-sm">
                অনুগ্রহ করে পুনরায় চেষ্টা করুন
              </p>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {contentLoading ? (
            <ContentSkeleton />
          ) : (
            currentItems.map((content: ContentItem) => (
              <div key={content._id} className="group">
                <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 backdrop-blur-sm h-full flex flex-col group-hover:-translate-y-3 rounded-2xl border border-white/20">
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    {content.photo ? (
                      <div className="relative w-full h-[280px]">
                        <Image
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          src={content.photo || "/placeholder.svg"}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          alt={content.title || "Content Image"}
                          priority={page === 1}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-bengali-medium shadow-xl border border-white/50">
                            {bengaliTitle}
                          </span>
                        </div>
                        
                        {/* Date Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bengali-medium shadow-lg">
                            {content.date}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[280px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                        <div className="text-center">
                          <div className="text-gray-400 text-5xl mb-3">📷</div>
                          <span className="text-gray-500 font-bengali-normal text-sm">ছবি নেই</span>
                        </div>
                        
                        {/* Category Badge for placeholder */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-bengali-medium shadow-xl border border-white/50">
                            {bengaliTitle}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex-grow space-y-4">
                      <CardTitle className="text-2xl font-bengali-semibold line-clamp-2 leading-tight text-gray-800 group-hover:text-[#e7000b] transition-colors duration-300">
                        {content.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-3 font-bengali-normal leading-relaxed">
                        {content.description}
                      </CardDescription>
                    </div>

                    {/* Meta Information */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-500 font-bengali-normal">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-700">{content.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full">
                            <MapPin className="w-4 h-4 text-red-600" />
                            <span className="text-red-700">{content.place}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="px-8 pb-8">
                    <Link href={`/${content._id}`} className="block">
                      <Button className="w-full bg-gradient-to-r from-[#e7000b] to-[#86383c] text-white hover:from-[#d6000a] hover:to-[#7a3236] transition-all duration-500 font-bengali-medium py-4 rounded-2xl shadow-xl hover:shadow-2xl group-hover:scale-[1.02] flex items-center justify-center gap-3 text-base font-semibold">
                        <Eye className="w-5 h-5" />
                        আরও পড়ুন
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>

        {/* Empty State */}
        {!contentLoading && currentItems.length === 0 && !contentError && (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-16 max-w-md mx-auto shadow-2xl border border-white/20">
              <div className="text-gray-400 text-7xl mb-6">📭</div>
              <h3 className="text-gray-700 font-bengali-semibold text-2xl mb-3">
                কোন কন্টেন্ট পাওয়া যায়নি
              </h3>
              <p className="text-gray-500 font-bengali-normal text-lg">
                এই বিভাগে এখনও কোন কন্টেন্ট যোগ করা হয়নি
              </p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            {getPaginationButtons()}
          </div>
        )}
      </div>
    </div>
  );
}
