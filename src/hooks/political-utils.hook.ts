/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IPoliticalUpdateData } from "@/types";

// Validation schema for political profile update
const politicalProfileSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().min(1, "Phone is required").optional(),
  dateOfBirth: z.string().optional(),
  bio: z.string().optional(),
  domain: z.string().min(1, "Domain is required").optional(),
  position: z.string().min(1, "Position is required").optional(),
  address: z.string().min(1, "Address is required").optional(),
  socialLinks: z.object({
    facebook: z.string().url("Invalid Facebook URL").optional(),
    youtube: z.string().url("Invalid YouTube URL").optional(),
    instagram: z.string().url("Invalid Instagram URL").optional(),
    twitter: z.string().url("Invalid Twitter URL").optional(),
  }).optional(),
});

// Hook for political profile form
export const usePoliticalProfileForm = (defaultValues?: Partial<IPoliticalUpdateData>) => {
  return useForm<IPoliticalUpdateData>({
    resolver: zodResolver(politicalProfileSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      bio: "",
      domain: "",
      position: "",
      address: "",
      socialLinks: {
        facebook: "",
        youtube: "",
        instagram: "",
        twitter: "",
      },
    },
  });
};

// Hook for file upload state management
export const useFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Cleanup function
    return () => URL.revokeObjectURL(url);
  }, []);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setPreviewUrl(null);
  }, []);

  return {
    selectedFile,
    previewUrl,
    handleFileSelect,
    clearFile,
  };
};

// Hook for political user data management
export const usePoliticalData = () => {
  const [politicalData, setPoliticalData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePoliticalData = useCallback((data: any) => {
    setPoliticalData(data);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setErrorState = useCallback((errorMessage: string | null) => {
    setError(errorMessage);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    politicalData,
    isLoading,
    error,
    updatePoliticalData,
    setLoading,
    setErrorState,
    clearError,
  };
};

// Hook for social media links management
export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    youtube: "",
    instagram: "",
    twitter: "",
  });

  const updateSocialLink = useCallback((platform: keyof typeof socialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value,
    }));
  }, []);

  const clearSocialLinks = useCallback(() => {
    setSocialLinks({
      facebook: "",
      youtube: "",
      instagram: "",
      twitter: "",
    });
  }, []);

  return {
    socialLinks,
    updateSocialLink,
    clearSocialLinks,
  };
};
