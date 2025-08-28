/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedToken = null;

  if (accessToken) {
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

export const logOut = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};

export const loginUser = async (userData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    
    if (data.success) {
      (await cookies()).set("accessToken", data?.data?.accessToken);
      (await cookies()).set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch {
    const data = {
      success: false,
      message: "An error occurred",
    };
    return data;
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refreshToken=${refreshToken}`,
      },
    });

    return await res.json();
  } catch {
    throw new Error("Failed to get new access token");
  }
};

export const cureentUserChecker = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  return token;
};
