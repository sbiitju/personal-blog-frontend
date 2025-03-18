/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createCategory,
  createSubCategory,
  deleteCategory,
  getAllCategoryByRole,
  getAllSubCategory,
} from "@/services/Category";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateCategory = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_CATEGORY"],
    mutationFn: async (userData) => await createCategory(userData),
  });
};

export const useCreateSubCategory = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_SUB_CATEGORY"],
    mutationFn: async (userData) => await createSubCategory(userData),
  });
};

export const useGetAllCategoryByRole = (role: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_CATEGORY"],
    queryFn: async () => await getAllCategoryByRole(role),
  });
};

export const useGetAllSubCategory = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_SUB_CATEGORY"],
    queryFn: async () => await getAllSubCategory(),
  });
};

export const useDeleteCategory = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: async (categoryId) => await deleteCategory(categoryId),
    onSuccess: () => {
      toast.success("category deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
