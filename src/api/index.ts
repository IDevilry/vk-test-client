import axios from "axios";

const JWT_TOKEN = localStorage.getItem("token") || "";

export const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
});
