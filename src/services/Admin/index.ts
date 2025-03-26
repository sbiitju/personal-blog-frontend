"use server";

import envConfig from "@/config/env.confg";
import axiosInstance from "@/lib/AxiousInstance";

export const getAllUsers = async () => {
  const res = await fetch(`${envConfig.baseApi}/admin/users`);
  return res.json();
};

export const deleteUser = async (id: string) => {
  const { data } = await axiosInstance.delete(`/admin/users/delete/${id}`);
  return data;
};
export const blockUser = async (id: string) => {
  const { data } = await axiosInstance.delete(`/admin/users/block/${id}`);
  return data;
};
