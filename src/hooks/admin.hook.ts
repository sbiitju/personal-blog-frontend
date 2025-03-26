/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUsers } from "@/services/Admin";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_USERS"],
    queryFn: async () => await getAllUsers(),
  });
};
