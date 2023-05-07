import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api";
import { IChat } from "../../../types";

export const fetchChats = createAsyncThunk<IChat[] | null, { userId: string }>(
  "chat/fetchChats",
  async ({ userId }) => {
    if (userId) {
      const res = await axiosInstance.get(`/chats/${userId}`);
      return res.data;
    }
    return null;
  }
);
