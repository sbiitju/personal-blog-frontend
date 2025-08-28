/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from "@/lib/AxiousInstance";
import { FieldValues } from "react-hook-form";

export const createBiograph = async (bioData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/biograph/create-biograph",
      bioData
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

export const updateBiograph = async (bioId: string, bioData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/biograph/${bioId}`, bioData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

export const getBiographByDomain = async (domain: string) => {
  const { data } = await axiosInstance.get(`/biograph/${domain}`);
  return data;
};
