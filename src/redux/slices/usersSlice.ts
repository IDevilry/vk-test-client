import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../asyncThunks/user/fetchAllUsers";
import { type IUser } from "../../types";

interface UserState {
  users: IUser[];
}

const initialState: UserState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default usersSlice.reducer;
