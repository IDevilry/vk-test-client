import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api";
import { IMessage } from "../../../types";

export const fetchMessages = createAsyncThunk<
  IMessage[] | null,
  { chatId: string }
>("messages/fetchMessages", async ({ chatId }) => {
  if (chatId) {
    const res = await axiosInstance.get<IMessage[]>(`/messages/${chatId}`);
    return res.data;
  } else {
    return null;
  }
});
