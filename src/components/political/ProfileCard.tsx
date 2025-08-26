"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IPolitical } from "@/types";

interface ProfileCardProps {
  userData: IPolitical;
  showDetails?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userData, showDetails = true }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "উল্লেখ করা হয়নি";
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage 
              src={userData.profilePicture} 
              alt={userData.name} 
            />
            <AvatarFallback className="text-2xl font-bold">
              {userData.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-bengali-bold">
              {userData.name}
            </CardTitle>
            <Badge variant="secondary" className="mt-2 font-bengali-medium">
              {userData.position}
            </Badge>
          </div>
        </div>
      </CardHeader>
      {showDetails && (
        <CardContent className="space-y-3">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-bengali-normal">ডোমেইন</p>
            <p className="font-bengali-medium">{userData.domain}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 font-bengali-normal">ইমেইল</p>
            <p className="font-bengali-medium">{userData.email}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 font-bengali-normal">ফোন</p>
            <p className="font-bengali-medium">{userData.phone}</p>
          </div>
          {userData.bio && (
            <div className="text-center">
              <p className="text-sm text-gray-500 font-bengali-normal">জীবন বৃত্তান্ত</p>
              <p className="font-bengali-normal text-sm text-gray-700 mt-1">
                {userData.bio.length > 100 ? `${userData.bio.substring(0, 100)}...` : userData.bio}
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default ProfileCard;
