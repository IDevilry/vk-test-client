import axios from "axios";

const JWT_TOKEN = localStorage.getItem("token") || "";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1337",
  headers: { Authorization: `Bearer ${JWT_TOKEN}` },
});
