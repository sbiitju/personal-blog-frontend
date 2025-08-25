"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  AlertCircle
} from "lucide-react";
import AdviceButton from "@/components/AdviceButton";

const page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bengali-bold text-gray-900">রাজনৈতিক ড্যাশবোর্ড</h1>
          <p className="text-gray-600 font-bengali-normal mt-2">আপনার রাজনৈতিক পোর্টাল ব্যবস্থাপনা কেন্দ্র</p>
        </div>
        <div className="flex gap-3">
          <AdviceButton />
          <Button className="bg-green-600 hover:bg-green-700 font-bengali-medium">
            <Plus className="w-4 h-4 mr-2" />
            নতুন কন্টেন্ট
          </Button>
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
            <div className="text-2xl font-bengali-bold text-gray-900">১২৫</div>
            <p className="text-xs text-green-600 font-bengali-normal">+১২% গত মাসে</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">সক্রিয় ব্যানার</CardTitle>
            <Image className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">৮</div>
            <p className="text-xs text-green-600 font-bengali-normal">বর্তমানে সক্রিয়</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">পরামর্শ</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">২৩</div>
            <p className="text-xs text-blue-600 font-bengali-normal">নতুন পরামর্শ</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">ভিজিটর</CardTitle>
            <User className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">১,২৪৫</div>
            <p className="text-xs text-green-600 font-bengali-normal">+১৫% গত সপ্তাহে</p>
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
              সম্প্রতি সম্পাদিত কার্যক্রমসমূহ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">নতুন কন্টেন্ট যোগ করা হয়েছে</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">২ ঘণ্টা আগে</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                <Edit className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">ব্যানার আপডেট করা হয়েছে</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">১ দিন আগে</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border-l-4 border-l-purple-500">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">নতুন পরামর্শ পাওয়া গেছে</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">৩ দিন আগে</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg border-l-4 border-l-orange-500">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">জীবন বৃত্তান্ত আপডেট প্রয়োজন</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">১ সপ্তাহ আগে</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
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
              <FileText className="w-4 h-4 mr-3" />
              নতুন কন্টেন্ট
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
              <Image className="w-4 h-4 mr-3" />
              ব্যানার তৈরি
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
              <User className="w-4 h-4 mr-3" />
              জীবন বৃত্তান্ত
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
              <MessageSquare className="w-4 h-4 mr-3" />
              পরামর্শ দেখুন
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 font-bengali-medium">
              <BarChart3 className="w-4 h-4 mr-3" />
              রিপোর্ট দেখুন
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali-semibold">আসন্ন কার্যক্রম</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-bengali-medium">রাজনৈতিক সভা</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">আগামীকাল, সকাল ১০টা</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-bengali-medium">প্রেস কনফারেন্স</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">পরশু, বিকাল ৩টা</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Bell className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-bengali-medium">দাওয়াহ কার্যক্রম</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">সপ্তাহের শেষে</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali-semibold">কন্টেন্ট বিশ্লেষণ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bengali-medium">সর্বাধিক দেখা কন্টেন্ট</span>
                <span className="text-blue-600 font-bengali-medium">রাজনৈতিক বক্তব্য</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bengali-medium">গড় পড়ার সময়</span>
                <span className="text-green-600 font-bengali-medium">৩ মিনিট</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bengali-medium">সামাজিক শেয়ার</span>
                <span className="text-purple-600 font-bengali-medium">১৫৬</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bengali-medium">মন্তব্য</span>
                <span className="text-orange-600 font-bengali-medium">৮৯</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bengali-semibold">কর্মক্ষমতা মেট্রিক্স</CardTitle>
          <CardDescription className="font-bengali-normal">
            গত ৩০ দিনের কর্মক্ষমতা
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bengali-bold text-blue-600">১,২৪৫</div>
              <p className="text-sm font-bengali-medium text-gray-600">মোট ভিজিটর</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bengali-bold text-green-600">৮৯%</div>
              <p className="text-sm font-bengali-medium text-gray-600">সন্তুষ্টি হার</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bengali-bold text-purple-600">২৩</div>
              <p className="text-sm font-bengali-medium text-gray-600">নতুন কন্টেন্ট</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bengali-bold text-orange-600">১৫৬</div>
              <p className="text-sm font-bengali-medium text-gray-600">সামাজিক শেয়ার</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;