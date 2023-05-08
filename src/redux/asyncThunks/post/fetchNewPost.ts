import { createAsyncThunk } from "@reduxjs/toolkit";
import { type IPost, type IUser } from "../../../types";
import { axiosInstance } from "../../../api";

const JWT_TOKEN = localStorage.getItem("token") || "";
const ORIGIN = process.env.REACT_APP_ORIGIN;

export const fetchNewPost = createAsyncThunk<
  { post: IPost; user: IUser },
  FormData
>("posts/fetchNewPost", async (newPost) => {
  console.log(newPost);
  const res = await axiosInstance.post<{ post: IPost; user: IUser }>(
    "/posts/new",
    newPost,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": ORIGIN,
        Authorization: `Bearer ${JWT_TOKEN}`,
      },
    }
  );
  console.log(res.data);
  return res.data;
});
