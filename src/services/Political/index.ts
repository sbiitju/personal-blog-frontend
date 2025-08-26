/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/lib/AxiousInstance";
import { FieldValues } from "react-hook-form";

// Get logged political user profile
export const getLoggedPoliticalUser = async () => {
  try {
    const { data } = await axiosInstance.get("/political/profile");
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

// Update political user profile
export const updatePoliticalProfile = async (userData: FieldValues | FormData) => {
  try {
    const headers = userData instanceof FormData 
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };
      
    const { data } = await axiosInstance.patch("/political/profile", userData, { headers });
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

// Get political user by domain (public)
export const getPoliticalByDomain = async (domain: string) => {
  try {
    const { data } = await axiosInstance.get(`/political/domain/${domain}`);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

// Get all political users (admin only)
export const getAllPoliticalUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/political");
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

// Delete political user account
export const deletePoliticalUser = async () => {
  try {
    const { data } = await axiosInstance.delete("/political/profile");
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

// Upload profile picture
export const uploadProfilePicture = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    const { data } = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};
