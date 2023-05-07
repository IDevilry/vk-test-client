import axios from "axios";

const JWT_TOKEN = localStorage.getItem("token") || "";

export const axiosInstance = axios.create({
  baseURL: "http://vk-test-server-production.up.railway.app",

  headers: {
    "Cross-Origin-Resource-Policy": "same-origin",
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
});
