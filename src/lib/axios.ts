import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const match = typeof document !== 'undefined'
    ? document.cookie.match(/(?:^|;\s*)token=([^;]*)/)
    : null;
  const token = match ? match[1] : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


const AUTH_CHECK_URLS = ["/auth/me", "/auth/profile"];

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url ?? "";
    const isAuthCheck = AUTH_CHECK_URLS.some((u) => url.includes(u));
    if (
      !isAuthCheck &&
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !window.location.pathname.includes("/login") &&
      !window.location.pathname.includes("/reset-password") &&
      !window.location.pathname.includes("/forgot-password")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;