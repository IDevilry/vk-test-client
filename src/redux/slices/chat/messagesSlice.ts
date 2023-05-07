import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../../asyncThunks/chat/fetchMessages";
import { fetchNewMessage } from "../../asyncThunks/chat/fetchNewMessage";

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
    builder.addCase(fetchNewMessage.fulfilled, (state, action) => {
      state.messages.push(action.payload);
    });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
