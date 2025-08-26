import envConfig from "@/config/env.confg";
import { getNewAccessToken } from "@/services/Auth";
import axios from "axios";

// Client-side cookie helper
const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const setCookie = (name: string, value: string, days = 7) => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// Fallback API base URL if environment variable is not set
const API_BASE_URL = envConfig.baseApi || "https://personal-blog-backend-eta.vercel.app/api";

console.log("AxiosInstance - API Base URL:", API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      try {
        const res = await getNewAccessToken();
        const accessToken = res.data.accessToken;

        config.headers["Authorization"] = `Bearer ${accessToken}`;
        setCookie("accessToken", accessToken);

        return axiosInstance(config);
      } catch (refreshError) {
        // If refresh token fails, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
