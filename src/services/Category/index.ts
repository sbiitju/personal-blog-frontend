/* eslint-disable @typescript-eslint/no-explicit-any */

import envConfig from "@/config/env.confg";
import axiosInstance from "@/lib/AxiousInstance";
import { FieldValues } from "react-hook-form";

export const createCategory = async (categoryData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/category/create-category",
      categoryData
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

export const getAllCategory = async () => {
  const res = await fetch(`${envConfig.baseApi}/category`);
  return res.json();
};

export const createSubCategory = async (subCategoryData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/category/create-sub-category",
      subCategoryData
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

export const getAllCategoryByRole = async (role: string) => {
  const { data } = await axiosInstance.get(`/category/${role}`);
  return data;
};

export const getAllSubCategory = async () => {
  const { data } = await axiosInstance.get(`/category/sub-categories`);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await axiosInstance.delete(`/category/${id}`);
  return data;
};
