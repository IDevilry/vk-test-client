import { axiosInstance } from "../../../api";
import { IUser } from "../../../types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk<IUser>(
  "currentUser/fetchCurrentUser",
  async () => {
    const res = await axiosInstance.get<IUser>("/users/me");
    return res.data;
  }
);
