import { createAsyncThunk } from "@reduxjs/toolkit";
import { type IPost, type IUser } from "../../../types";
import { axiosInstance } from "../../../api";

export const fetchNewPost = createAsyncThunk<
  { post: IPost; user: IUser },
  FormData
>("posts/fetchNewPost", async (newPost) => {
  const res = await axiosInstance.post<{ post: IPost; user: IUser }>(
    "/posts/new",
    newPost
  );
  return res.data;
});
