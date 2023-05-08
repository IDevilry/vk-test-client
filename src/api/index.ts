import axios from "axios";

const JWT_TOKEN = localStorage.getItem("token") || "";

const API_URL = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,

  headers: {
    "Access-Control-Allow-Origin":
      "https://vk-test-client-g8a9q7mvg-idevilry.vercel.app",
    "Cross-Origin-Resource-Policy": "same-origin",
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
});
