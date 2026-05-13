import axiosInstance from "../lib/axiosInstance";

// Re-export axiosInstance as axiosClient for backward compatibility
// with productApi.ts and other services that might use it.
export default axiosInstance;
