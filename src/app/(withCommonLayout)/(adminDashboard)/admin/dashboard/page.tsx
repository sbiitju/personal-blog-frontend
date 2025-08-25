"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  Settings, 
  TrendingUp, 
  Activity, 
  Shield, 
  BarChart3, 
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import AdviceButton from "@/components/AdviceButton";

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bengali-bold text-gray-900">অ্যাডমিন ড্যাশবোর্ড</h1>
          <p className="text-gray-600 font-bengali-normal mt-2">সিস্টেম ব্যবস্থাপনা ও নিয়ন্ত্রণ কেন্দ্র</p>
        </div>
        <div className="flex gap-3">
          <AdviceButton />
          <Button className="bg-green-600 hover:bg-green-700 font-bengali-medium">
            <Plus className="w-4 h-4 mr-2" />
            নতুন ব্যবহারকারী
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">মোট ব্যবহারকারী</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">১,২৩৪</div>
            <p className="text-xs text-green-600 font-bengali-normal">+১২% গত মাসে</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">সক্রিয় কন্টেন্ট</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">৫৬৭</div>
            <p className="text-xs text-green-600 font-bengali-normal">+৮% গত সপ্তাহে</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">রাজনৈতিক পোর্টাল</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">২৩</div>
            <p className="text-xs text-blue-600 font-bengali-normal">সক্রিয় পোর্টাল</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">সিস্টেম স্ট্যাটাস</CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-green-600">সক্রিয়</div>
            <p className="text-xs text-gray-500 font-bengali-normal">সব সেবা চালু</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-bengali-semibold">সাম্প্রতিক কার্যক্রম</CardTitle>
            <CardDescription className="font-bengali-normal">
              সম্প্রতি সম্পাদিত ব্যবস্থাপনা কার্যক্রমসমূহ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">নতুন রাজনৈতিক পোর্টাল যোগ করা হয়েছে</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">২ ঘণ্টা আগে</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">ব্যবহারকারী অনুমোদন করা হয়েছে</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">১ দিন আগে</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">সিস্টেম আপডেট সম্পন্ন</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">৩ দিন আগে</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg border-l-4 border-l-orange-500">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">নতুন পরামর্শ পাওয়া গেছে</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">১ সপ্তাহ আগে</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
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
            <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
              <Users className="w-4 h-4 mr-3" />
              ব্যবহারকারী ব্যবস্থাপনা
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
              <Shield className="w-4 h-4 mr-3" />
              পোর্টাল অনুমোদন
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
              <Settings className="w-4 h-4 mr-3" />
              সিস্টেম সেটিংস
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
              <BarChart3 className="w-4 h-4 mr-3" />
              রিপোর্ট দেখুন
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
              <Calendar className="w-4 h-4 mr-3" />
              কার্যক্রম সময়সূচী
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali-semibold">সিস্টেম স্বাস্থ্য</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bengali-medium">সার্ভার স্ট্যাটাস</span>
                <span className="text-green-600 font-bengali-medium">সক্রিয়</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bengali-medium">ডাটাবেস</span>
                <span className="text-green-600 font-bengali-medium">সক্রিয়</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bengali-medium">ইমেইল সার্ভিস</span>
                <span className="text-green-600 font-bengali-medium">সক্রিয়</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bengali-medium">ফাইল স্টোরেজ</span>
                <span className="text-green-600 font-bengali-medium">সক্রিয়</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-bengali-semibold">সাম্প্রতিক পরামর্শ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-bengali-medium">সিস্টেম উন্নতির পরামর্শ</p>
                <p className="text-xs text-gray-500 font-bengali-normal">আহমেদ হাসান</p>
                <p className="text-xs text-gray-400 font-bengali-normal">২ ঘণ্টা আগে</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-bengali-medium">নতুন ফিচার চাহিদা</p>
                <p className="text-xs text-gray-500 font-bengali-normal">ফাতেমা বেগম</p>
                <p className="text-xs text-gray-400 font-bengali-normal">১ দিন আগে</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
