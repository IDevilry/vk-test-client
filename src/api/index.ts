import axios from "axios";

const JWT_TOKEN = localStorage.getItem("token") || "";

const API_URL = process.env.REACT_APP_API_URL;
const ORIGIN = process.env.REACT_APP_ORIGIN;

export const axiosInstance = axios.create({
  baseURL: API_URL,

  headers: {
    "Access-Control-Allow-Origin": ORIGIN,
    Authorization: `Bearer ${JWT_TOKEN}`,
  },
});
