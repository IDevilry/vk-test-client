import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFriendList } from "../../../types";
import { axiosInstance } from "../../../api";

export const fetchFriends = createAsyncThunk<IFriendList>(
  "friends/fetchFriends",
  async () => {
    const res = await axiosInstance.get<IFriendList>("/users/friends");
    return res.data;
  }
);
