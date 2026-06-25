// config/api.ts
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust to your backend
});

// Add the interceptor here
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      toast.error("Your session has expired. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login"; // or use navigate if inside a component
    }
    return Promise.reject(err);
  }
);

export default api;
