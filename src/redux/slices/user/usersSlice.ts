import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../../asyncThunks/";

import { type IUser } from "../../../types";

interface UserState {
  users: IUser[];
  onlineUsers: IUser[];
}

const initialState: UserState = {
  users: [],
  onlineUsers: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setOnlineUsers(state, action: PayloadAction<IUser[]>) {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { setOnlineUsers } = usersSlice.actions;

export default usersSlice.reducer;
