import { createAsyncThunk } from "@reduxjs/toolkit";
import { type IPost, type IUser } from "../../../types";
import { axiosInstance } from "../../../api";

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
      },
    }
  );
  console.log(res.data);
  return res.data;
});
