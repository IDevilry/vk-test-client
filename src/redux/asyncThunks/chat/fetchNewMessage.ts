import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMessage, INewMessage } from "../../../types";
import { axiosInstance } from "../../../api";

export const fetchNewMessage = createAsyncThunk<IMessage, INewMessage>(
  "messages/fetchNewMessage",
  async (msg) => {
    const res = await axiosInstance.post<IMessage>("/messages/new", msg);
    return res.data;
  }
);
