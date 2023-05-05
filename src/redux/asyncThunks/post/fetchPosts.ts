import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api";
import { IPostList } from "../../../types";

export const fetchPosts = createAsyncThunk<IPostList>(
  "posts/fetchPosts",
  async () => {
    const res = await axiosInstance.get<IPostList>("/posts");
    return res.data;
  }
);

export const fetchMyPosts = createAsyncThunk<IPostList>(
  "posts/fetchMyPosts",
  async () => {
    const res = await axiosInstance.get<IPostList>("/posts/my");
    return res.data;
  }
);
