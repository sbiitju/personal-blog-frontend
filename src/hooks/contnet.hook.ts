/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContent,
  deleteContent,
  getAllContent,
  getAllContentByCategory,
  getAllContentByCategoryAndDomain,
  getAllContentByDomain,
  getAllContentById,
  getAllContentBySubCategory,
  getAllContentBySubCategoryAndDomain,
  updateContent,
} from "@/services/Content";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateContent = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_CONTENT"],
    mutationFn: async (userData) => await createContent(userData),
  });
};

export const useGetAllContent = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_CONTENT"],
    queryFn: async () => await getAllContent(),
  });
};

export const useGetAllContentByDomain = (domain: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_CONTENT_DOMAIN"],
    queryFn: async () => await getAllContentByDomain(domain),
  });
};

export const useGetAllContentById = (id: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_CONTENT_BY_ID"],
    queryFn: async () => await getAllContentById(id),
  });
};

export const useGetAllContentByCategory = (categoryId: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_CONTENT_BY_CATEGORY"],
    queryFn: async () => await getAllContentByCategory(categoryId),
  });
};

// Hook with proper query key
export const useGetAllContentByCategoryAndDomain = (
  categoryId: string,
  domain: string
) => {
  // Include categoryId and domain in the query key to make it unique
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_CONTENT_BY_CATEGORY_AND_DOMAIN", categoryId, domain],
    queryFn: async () =>
      await getAllContentByCategoryAndDomain(categoryId, domain),
    // Optional: Add these settings for better control
    staleTime: 60000, // 1 minute
    // cacheTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useGetAllContentBySubCategory = (subcategoryId: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_CONTENT_BY_SUB_CATEGORY"],
    queryFn: async () => await getAllContentBySubCategory(subcategoryId),
  });
};

export const useGetAllContentBySubCategoryAndDomain = (
  subcategoryId: string,
  domain: string
) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_CONTENT_BY_SUB_CATEGORY"],
    queryFn: async () =>
      await getAllContentBySubCategoryAndDomain(subcategoryId, domain),
  });
};

export const useUpdateContent = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_CONTENT"],
    mutationFn: async ({ id, contentData }) =>
      await updateContent(id, contentData),
  });
};

export const useDeleteContent = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_CONTENT"],
    mutationFn: async (productId) => await deleteContent(productId),
    onSuccess: () => {
      toast.success("content deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
