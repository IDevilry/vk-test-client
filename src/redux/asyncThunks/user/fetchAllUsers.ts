import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../../types";
import { axiosInstance } from "../../../api";

export const fetchAllUsers = createAsyncThunk<IUser[]>(
  "users/fetchAllUsers",
  async () => {
    const res = await axiosInstance.get<IUser[]>("/users");
    return res.data;
  }
);
