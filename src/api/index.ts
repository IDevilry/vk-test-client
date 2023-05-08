import axios from "axios";

const JWT_TOKEN = localStorage.getItem("token") || "";

const API_URL = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,

  headers: {
    "Access-Control-Allow-Origin": API_URL,
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
});
