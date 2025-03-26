/* eslint-disable @typescript-eslint/no-explicit-any */
import { blockUser, deleteUser, getAllUsers } from "@/services/Admin";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAllUsers = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_USERS"],
    queryFn: async () => await getAllUsers(),
  });
};

export const useDeleteUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (id) => await deleteUser(id),
    onSuccess: () => {
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
export const useBlockUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["BLOCK_USER"],
    mutationFn: async (id) => await blockUser(id),
    onSuccess: () => {
      toast.success("user blocked successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
