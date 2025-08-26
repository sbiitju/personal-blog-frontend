"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  User, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Eye,
  Edit,
  Plus,
  BarChart3,
  Settings,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link"; 
import { useUser } from "@/context/user.provider";
import { useGetAllContentByDomain } from "@/hooks/contnet.hook";
import { useGetAllBanner } from "@/hooks/banner.hook";
import { useGetBiographByDomain } from "@/hooks/biograph.hook";

const PoliticalDashboard = () => {
  const { user } = useUser();
  
  // Fetch real data
  const { data: contentData, isLoading: contentLoading } = useGetAllContentByDomain(user?.domain || "");
  const { data: bannerData, isLoading: bannerLoading } = useGetAllBanner(user?.domain || "");
  const { data: biographData, isLoading: biographLoading } = useGetBiographByDomain(user?.domain || "");

  // Calculate real statistics
  const totalContent = contentData?.data?.length || 0;
  const activeBanners = bannerData?.data?.length || 0;
  const hasBiograph = biographData?.data ? 1 : 0;
  
  // Get recent content (last 5)
  const recentContent = contentData?.data?.slice(0, 5) || [];
  
  // Calculate content by category
  const contentByCategory = contentData?.data?.reduce((acc: any, content: any) => {
    const category = content.category?.name || 'অন্যান্য';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {}) || {};

  const isLoading = contentLoading || bannerLoading || biographLoading;

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'আজ';
    if (diffDays === 2) return 'গতকাল';
    if (diffDays <= 7) return `${diffDays - 1} দিন আগে`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} সপ্তাহ আগে`;
    return `${Math.floor(diffDays / 30)} মাস আগে`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bengali-bold text-gray-900">রাজনৈতিক ড্যাশবোর্ড</h1>
          <p className="text-gray-600 font-bengali-normal mt-2">
            {user?.domain} - আপনার রাজনৈতিক পোর্টাল ব্যবস্থাপনা কেন্দ্র
          </p>
        </div>
        <div className="flex gap-3">
          
          <Link href="/political/content/create-content">
            <Button className="bg-green-600 hover:bg-green-700 font-bengali-medium">
              <Plus className="w-4 h-4 mr-2" />
              নতুন কন্টেন্ট
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">মোট কন্টেন্ট</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">{totalContent}</div>
            <p className="text-xs text-green-600 font-bengali-normal">
              {totalContent > 0 ? 'সক্রিয় কন্টেন্ট' : 'কোন কন্টেন্ট নেই'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">সক্রিয় ব্যানার</CardTitle>
            <Image className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">{activeBanners}</div>
            <p className="text-xs text-green-600 font-bengali-normal">
              {activeBanners > 0 ? 'বর্তমানে সক্রিয়' : 'কোন ব্যানার নেই'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">জীবন বৃত্তান্ত</CardTitle>
            <User className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">{hasBiograph}</div>
            <p className="text-xs text-blue-600 font-bengali-normal">
              {hasBiograph ? 'উপলব্ধ' : 'অনুপলব্ধ'}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">ক্যাটাগরি</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">{Object.keys(contentByCategory).length}</div>
            <p className="text-xs text-green-600 font-bengali-normal">
              {Object.keys(contentByCategory).length > 0 ? 'সক্রিয় ক্যাটাগরি' : 'কোন ক্যাটাগরি নেই'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Content */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-bengali-semibold">সাম্প্রতিক কন্টেন্ট</CardTitle>
            <CardDescription className="font-bengali-normal">
              সম্প্রতি প্রকাশিত কন্টেন্টসমূহ
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentContent.length > 0 ? (
              <div className="space-y-4">
                {recentContent.map((content: any, index: number) => (
                  <div key={content._id || index} className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-bengali-medium">{content.title}</p>
                      <p className="text-xs text-gray-500 font-bengali-normal">
                        {content.category?.name} • {formatDate(content.createdAt)}
                      </p>
                    </div>
                    <Link href={`/political/content/${content._id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-bengali-normal">কোন কন্টেন্ট পাওয়া যায়নি</p>
                <Link href="/political/content/create-content">
                  <Button className="mt-4 font-bengali-medium">
                    <Plus className="w-4 h-4 mr-2" />
                    প্রথম কন্টেন্ট তৈরি করুন
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali-semibold">দ্রুত কার্যক্রম</CardTitle>
            <CardDescription className="font-bengali-normal">
              সাধারণ ব্যবস্থাপনা কার্যক্রম
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/political/content/create-content">
              <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
                <FileText className="w-4 h-4 mr-3" />
                নতুন কন্টেন্ট
              </Button>
            </Link>
            <Link href="/political/banner/create-banner">
              <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
                <Image className="w-4 h-4 mr-3" />
                ব্যানার তৈরি
              </Button>
            </Link>
            <Link href="/political/biograph">
              <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
                <User className="w-4 h-4 mr-3" />
                জীবন বৃত্তান্ত
              </Button>
            </Link>

            <Link href="/political/content">
              <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
                <BarChart3 className="w-4 h-4 mr-3" />
                সব কন্টেন্ট দেখুন
              </Button>
            </Link>
            <Link href="/political/banner">
              <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
                <Image className="w-4 h-4 mr-3" />
                সব ব্যানার দেখুন
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Content Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Content by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali-semibold">কন্টেন্ট ক্যাটাগরি অনুযায়ী</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(contentByCategory).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(contentByCategory).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-bengali-medium">{category}</span>
                    <span className="text-blue-600 font-bengali-bold">{count as number}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 font-bengali-normal">কোন কন্টেন্ট ক্যাটাগরি নেই</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali-semibold">অবস্থা সংক্ষেপ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="font-bengali-medium">মোট কন্টেন্ট</span>
                <span className="text-green-600 font-bengali-bold">{totalContent}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="font-bengali-medium">সক্রিয় ব্যানার</span>
                <span className="text-blue-600 font-bengali-bold">{activeBanners}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="font-bengali-medium">জীবন বৃত্তান্ত</span>
                <span className="text-purple-600 font-bengali-bold">
                  {hasBiograph ? 'উপলব্ধ' : 'অনুপলব্ধ'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <span className="font-bengali-medium">ক্যাটাগরি সংখ্যা</span>
                <span className="text-orange-600 font-bengali-bold">{Object.keys(contentByCategory).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      {totalContent === 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bengali-bold text-gray-900 mb-2">আপনার প্রথম কন্টেন্ট তৈরি করুন</h3>
              <p className="text-gray-600 font-bengali-normal mb-6">
                আপনার রাজনৈতিক পোর্টালে কন্টেন্ট যোগ করে শুরু করুন
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/political/content/create-content">
                  <Button className="font-bengali-medium">
                    <Plus className="w-4 h-4 mr-2" />
                    কন্টেন্ট তৈরি করুন
                  </Button>
                </Link>
                <Link href="/political/banner/create-banner">
                  <Button variant="outline" className="font-bengali-medium">
                    <Image className="w-4 h-4 mr-2" />
                    ব্যানার তৈরি করুন
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PoliticalDashboard;