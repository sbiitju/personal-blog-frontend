/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createBiograph,
  getBiographByDomain,
  updateBiograph,
} from "@/services/Biograph";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetBiographByDomain = (domain: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_BIOGRAPH", domain],
    queryFn: async () => await getBiographByDomain(domain),
    enabled: !!domain, // Only run query if domain is provided
  });
};

export const useCreateBiograph = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_BIOGRAPH"],
    mutationFn: async (userData) => await createBiograph(userData),
    onSuccess: () => {
      toast.success("Biograph Created successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
  
    },
  });
};

export const useUpdateBiograph = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_BIOGRAPH"],
    mutationFn: async ({ domain, bioData }) =>
      await updateBiograph(domain, bioData),
  });
};
