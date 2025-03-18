/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerAdmin, registerUser } from "@/services/Auth";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
  });
};
export const useAdminRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADMIN_REGISTRATION"],
    mutationFn: async (userData) => await registerAdmin(userData),
  });
};
