/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/lib/AxiousInstance";
import { FieldValues } from "react-hook-form";

export const getAllBanner = async (domain: string) => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get(`/banner/${domain}`, fetchOptions);
  return data;
};

export const createBanner = async (bannerData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/banner/create-banner",
      bannerData
    );
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

export const deleteBanner = async (id: string) => {
  const { data } = await axiosInstance.delete(`/banner/${id}`);
  return data;
};
