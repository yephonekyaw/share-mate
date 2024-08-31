import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookies.get("accessToken"),
  },
  withCredentials: true,
});

const axiosInstanceFormData = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer " + Cookies.get("accessToken"),
  },
  withCredentials: true,
});

export { axiosInstance, axiosInstanceFormData };
