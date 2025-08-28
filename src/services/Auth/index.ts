/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axiosInstance from "@/lib/AxiousInstance";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/users/create-client", userData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

export const registerAdmin = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/users/create-admin", userData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

export const getUserByDomain = async (domain: string) => {
  if (!domain || domain.trim() === '') {
    throw new Error('Domain is required');
  }
  const { data } = await axiosInstance.get(`/political/domain/${domain}`);
  return data;
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

export const forgotPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forgot-password",
      userData
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resetPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/reset-password",
      {
        password: userData.password,
        email: userData.email,
      },
      {
        headers: {
          Authorization: userData.token,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const changePassword = async (passwordData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      passwordData
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = getCookie("refreshToken");

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};

// Client-side cookie helper
const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

export const getCurrentUser = async () => {
  const accessToken = getCookie("accessToken");
  let decodedToken = null;

  if (accessToken) {
    const { jwtDecode } = await import("jwt-decode");
    decodedToken = await jwtDecode(accessToken);
    return {
      id: decodedToken?.id,
      email: decodedToken?.email,
      role: decodedToken?.role,
      name: decodedToken?.name,
      img: decodedToken?.profilePicture,
      domain: decodedToken?.domain,
    };
  } else {
    return decodedToken;
  }
};


