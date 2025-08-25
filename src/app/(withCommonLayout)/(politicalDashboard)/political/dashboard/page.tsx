"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Image, User, MessageSquare } from "lucide-react";
import AdviceButton from "@/components/AdviceButton";

const page = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bengali-bold text-gray-900">ড্যাশবোর্ড</h1>
          <p className="text-gray-600 font-bengali-normal mt-2">রাজনৈতিক পোর্টাল ব্যবস্থাপনা</p>
        </div>
        <AdviceButton />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">মোট কন্টেন্ট</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">১২৫</div>
            <p className="text-xs text-gray-500 font-bengali-normal">গত মাসে +১২%</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">সক্রিয় ব্যানার</CardTitle>
            <Image className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">৮</div>
            <p className="text-xs text-gray-500 font-bengali-normal">বর্তমানে সক্রিয়</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">পরামর্শ</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">২৩</div>
            <p className="text-xs text-gray-500 font-bengali-normal">নতুন পরামর্শ</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bengali-medium text-gray-600">ব্যবহারকারী</CardTitle>
            <User className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bengali-bold text-gray-900">১,২৪৫</div>
            <p className="text-xs text-gray-500 font-bengali-normal">মোট ভিজিটর</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-bengali-semibold">দ্রুত কার্যক্রম</CardTitle>
            <CardDescription className="font-bengali-normal">
              সাধারণ ব্যবস্থাপনা কার্যক্রম
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2 font-bengali-medium">
                <FileText className="h-6 w-6" />
                নতুন কন্টেন্ট
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 font-bengali-medium">
                <Image className="h-6 w-6" />
                ব্যানার তৈরি
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 font-bengali-medium">
                <User className="h-6 w-6" />
                জীবন বৃত্তান্ত
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 font-bengali-medium">
                <MessageSquare className="h-6 w-6" />
                পরামর্শ দেখুন
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-bengali-semibold">সাম্প্রতিক কার্যক্রম</CardTitle>
            <CardDescription className="font-bengali-normal">
              সম্প্রতি সম্পাদিত কার্যক্রমসমূহ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">নতুন কন্টেন্ট যোগ করা হয়েছে</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">২ ঘণ্টা আগে</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">ব্যানার আপডেট করা হয়েছে</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">১ দিন আগে</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-bengali-medium">নতুন পরামর্শ পাওয়া গেছে</p>
                  <p className="text-xs text-gray-500 font-bengali-normal">৩ দিন আগে</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;