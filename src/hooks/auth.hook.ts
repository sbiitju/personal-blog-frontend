/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  changePassword,
  forgotPassword,
  getUserByDomain,
  loginUser,
  registerAdmin,
  registerUser,
  resetPassword,
} from "@/services/Auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

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

export const useGetUserByDomain = (domain: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_USER_DOMAIN"],
    queryFn: async () => await getUserByDomain(domain),
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["LOGIN_USER"],
    mutationFn: async (userData) => await loginUser(userData),
    //     onSuccess : () => {
    //         toast.success("User Logged successfully")
    //    },
    //    onError : (error) => {
    //         toast.error(error.message)
    //    }
  });
};

export const useForgotPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FORGOT_PASSWORD"],
    mutationFn: async (userData) => await forgotPassword(userData),
    onSuccess: () => {
      toast.success("Send Recovery token to user email Successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async (userData) => await resetPassword(userData),
    onSuccess: () => {
      toast.success("Password Resset  Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (userData) => await changePassword(userData),
    onSuccess: () => {
      toast.success("Password Changed Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
