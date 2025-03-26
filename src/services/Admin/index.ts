"use server";

import envConfig from "@/config/env.confg";

export const getAllUsers = async () => {
  const res = await fetch(`${envConfig.baseApi}/admin/users`);
  return res.json();
};
