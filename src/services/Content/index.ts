/* eslint-disable @typescript-eslint/no-explicit-any */

import envConfig from "@/config/env.confg";
import axiosInstance from "@/lib/AxiousInstance";
import { FieldValues } from "react-hook-form";

export const createContent = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/content/create-content",
      userData
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

export const getAllContent = async () => {
  const res = await fetch(`${envConfig.baseApi}/content`);
  return res.json();
};

export const getAllContentByDomain = async (domain: string) => {
  const { data } = await axiosInstance.get(`/content/domain/${domain}`);
  return data;
};

export const getAllContentById = async (id: string) => {
  const { data } = await axiosInstance.get(`/content/${id}`);
  return data;
};

export const getAllContentByCategory = async (categoryId: string) => {
  const { data } = await axiosInstance.get(`/content/category/${categoryId}`);
  return data;
};
export const getAllContentByCategoryAndDomain = async (
  categoryId: string,
  domain: string
) => {
  const { data } = await axiosInstance.get(
    `/content/category/${categoryId}/domain/${domain}`
  );
  return data;
};

export const getAllContentBySubCategory = async (subCategoryId: string) => {
  const { data } = await axiosInstance.get(
    `/content/subcategory/${subCategoryId}`
  );
  return data;
};

export const getAllContentBySubCategoryAndDomain = async (
  subCategoryId: string,
  domain: string
) => {
  const { data } = await axiosInstance.get(
    `/content/subcategory/${subCategoryId}/domain/${domain}`
  );
  return data;
};

export const updateContent = async (
  contentId: string,
  contentData: FieldValues
) => {
  try {
    const { data } = await axiosInstance.put(
      `/content/${contentId}`,
      contentData
    );
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data; // Fallback error
  }
};

export const deleteContent = async (id: string) => {
  const { data } = await axiosInstance.delete(`/content/${id}`);
  return data;
};
