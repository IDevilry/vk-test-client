import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../../asyncThunks/chat/fetchMessages";

import { type IMessage } from "../../../types";

type MessagesState = {
  messages: IMessage[];
};

const initialState: MessagesState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<IMessage>) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      if (action.payload) {
        state.messages = action.payload;
      }
    });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
