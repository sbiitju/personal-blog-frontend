/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getLoggedPoliticalUser,
  updatePoliticalProfile,
  getPoliticalByDomain,
  getAllPoliticalUsers,
  deletePoliticalUser,
  uploadProfilePicture,
} from "@/services/Political";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

// Get logged political user profile
export const useGetLoggedPoliticalUser = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_LOGGED_POLITICAL_USER"],
    queryFn: async () => await getLoggedPoliticalUser(),
  });
};

// Update political user profile
export const useUpdatePoliticalProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_POLITICAL_PROFILE"],
    mutationFn: async (userData) => await updatePoliticalProfile(userData),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ["GET_LOGGED_POLITICAL_USER"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update profile");
    },
  });
};

// Get political user by domain (public)
export const useGetPoliticalByDomain = (domain: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_POLITICAL_BY_DOMAIN", domain],
    queryFn: async () => await getPoliticalByDomain(domain),
    enabled: !!domain, // Only run query if domain is provided
  });
};

// Get all political users (admin only)
export const useGetAllPoliticalUsers = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_POLITICAL_USERS"],
    queryFn: async () => await getAllPoliticalUsers(),
  });
};

// Delete political user account
export const useDeletePoliticalUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation<any, Error, void>({
    mutationKey: ["DELETE_POLITICAL_USER"],
    mutationFn: async () => await deletePoliticalUser(),
    onSuccess: () => {
      toast.success("Account deleted successfully");
      // Invalidate all political user queries
      queryClient.invalidateQueries({ queryKey: ["GET_LOGGED_POLITICAL_USER"] });
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_POLITICAL_USERS"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete account");
    },
  });
};

// Upload profile picture
export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient();
  
  return useMutation<any, Error, File>({
    mutationKey: ["UPLOAD_PROFILE_PICTURE"],
    mutationFn: async (file) => await uploadProfilePicture(file),
    onSuccess: () => {
      toast.success("Profile picture uploaded successfully");
      // Invalidate user data to refetch with new profile picture
      queryClient.invalidateQueries({ queryKey: ["GET_LOGGED_POLITICAL_USER"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to upload profile picture");
    },
  });
};
