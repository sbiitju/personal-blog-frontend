/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBanner, deleteBanner, getAllBanner } from "@/services/Banner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetAllBanner = (domain: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_BANNER"],
    queryFn: async () => await getAllBanner(domain),
  });
};

export const useCreateBanner = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_BANNER"],
    mutationFn: async (userData) => await createBanner(userData),
  });
};

export const useDeleteBanner = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_BANNER"],
    mutationFn: async (bannerId) => await deleteBanner(bannerId),
    onSuccess: () => {
      toast.success("Banner Deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
