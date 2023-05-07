import { createSlice } from "@reduxjs/toolkit";
import { fetchChats } from "../../asyncThunks/chat/fetchChats";

import { type IChat } from "../../../types";

interface ChatState {
  chats: IChat[];
}

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      if (action.payload) {
        state.chats = action.payload;
      }
    });
  },
});

export default chatSlice.reducer;
