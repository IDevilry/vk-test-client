import { createAsyncThunk } from "@reduxjs/toolkit";
import { INewPost, IPost, IUser } from "../../../types";
import { axiosInstance } from "../../../api";

export const fetchNewPost = createAsyncThunk<
  { post: IPost; user: IUser },
  INewPost
>("posts/fetchNewPost", async (newPost) => {
  const res = await axiosInstance.post<{ post: IPost; user: IUser }>(
    "/posts/new",
    newPost
  );
  return res.data;
});
