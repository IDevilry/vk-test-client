import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMessage, INewMessage } from "../../../types";
import { axiosInstance } from "../../../api";

export const fetchNewMessage = createAsyncThunk<void, INewMessage>(
  "messages/fetchNewMessage",
  async (msg) => {
    const res = await axiosInstance.post<IMessage>("/messages/new", msg);
    if (res.status !== 201) {
      throw new Error(res.statusText);
    }
  }
);
