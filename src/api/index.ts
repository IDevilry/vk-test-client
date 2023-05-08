import axios from "axios";

const JWT_TOKEN = localStorage.getItem("token") || "";

const API_URL = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,

  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`,
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
});
