import axios from "axios";

export const getFrontendDomain = () => {
  if (typeof window !== "undefined") {
    return window.location.hostname;
  }
  return "default.com"; // Fallback domain for SSR
};

const API = axios.create({
  baseURL: "https://your-backend.com/api", // Backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchContentByDomain = async () => {
  const domain = getFrontendDomain();
  const { data } = await API.get(`/${domain}`); // Fetch content by domain
  return data;
};

export default API;
