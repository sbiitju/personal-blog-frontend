"use client";

import React from "react";
import { useGetLoggedPoliticalUser } from "@/hooks/political.hook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/common/Loader";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Globe, 
  Briefcase,
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  FileText
} from "lucide-react";

const PoliticalProfilePage = () => {
  const { data: politicalUser, isLoading, error } = useGetLoggedPoliticalUser();
console.log(politicalUser);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-red-500 font-bengali-medium">
              প্রোফাইল লোড করতে সমস্যা হয়েছে: {error.message}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userData = politicalUser?.data;

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-500 font-bengali-medium">
              কোন প্রোফাইল ডেটা পাওয়া যায়নি
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "উল্লেখ করা হয়নি";
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-bengali-bold text-gray-900">
            প্রোফাইল তথ্য
          </h1>
          <p className="text-gray-600 font-bengali-normal mt-2">
            আপনার ব্যক্তিগত এবং পেশাদার তথ্য দেখুন
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage 
                    src={userData.profilePicture} 
                    alt={userData.name} 
                  />
                  <AvatarFallback className="text-3xl font-bold">
                    {userData.name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl font-bengali-bold">
                    {userData.name}
                  </CardTitle>
                  <Badge variant="secondary" className="mt-2 font-bengali-medium">
                    {userData.position}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 font-bengali-normal">ডোমেইন</p>
                  <p className="font-bengali-medium">{userData.domain}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Briefcase className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500 font-bengali-normal">পদ</p>
                  <p className="font-bengali-medium">{userData.position}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 font-bengali-bold">
                <User className="h-5 w-5" />
                <span>ব্যক্তিগত তথ্য</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-bengali-normal">ইমেইল</p>
                    <p className="font-bengali-medium">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-bengali-normal">ফোন</p>
                    <p className="font-bengali-medium">{userData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-bengali-normal">জন্ম তারিখ</p>
                    <p className="font-bengali-medium">{formatDate(userData.dateOfBirth)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-bengali-normal">ঠিকানা</p>
                    <p className="font-bengali-medium">{userData.address}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio */}
          {userData.bio && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 font-bengali-bold">
                  <FileText className="h-5 w-5" />
                  <span>জীবন বৃত্তান্ত</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-bengali-normal leading-relaxed">
                  {userData.bio}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Social Media Links */}
          {userData.socialLinks && Object.values(userData.socialLinks).some(link => link) && (
            <Card>
              <CardHeader>
                <CardTitle className="font-bengali-bold">সামাজিক মাধ্যম</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.socialLinks.facebook && (
                    <div className="flex items-center space-x-3">
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <a 
                        href={userData.socialLinks.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-bengali-medium"
                      >
                        Facebook
                      </a>
                    </div>
                  )}
                  {userData.socialLinks.youtube && (
                    <div className="flex items-center space-x-3">
                      <Youtube className="h-5 w-5 text-red-600" />
                      <a 
                        href={userData.socialLinks.youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline font-bengali-medium"
                      >
                        YouTube
                      </a>
                    </div>
                  )}
                  {userData.socialLinks.instagram && (
                    <div className="flex items-center space-x-3">
                      <Instagram className="h-5 w-5 text-pink-600" />
                      <a 
                        href={userData.socialLinks.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:underline font-bengali-medium"
                      >
                        Instagram
                      </a>
                    </div>
                  )}
                  {userData.socialLinks.twitter && (
                    <div className="flex items-center space-x-3">
                      <Twitter className="h-5 w-5 text-blue-400" />
                      <a 
                        href={userData.socialLinks.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline font-bengali-medium"
                      >
                        Twitter
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-bengali-bold">অ্যাকাউন্ট তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-bengali-normal">অ্যাকাউন্ট তৈরি</p>
                  <p className="font-bengali-medium">{formatDate(userData.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bengali-normal">সর্বশেষ আপডেট</p>
                  <p className="font-bengali-medium">{formatDate(userData.updatedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PoliticalProfilePage;
