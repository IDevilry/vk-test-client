import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrentUser } from "../../asyncThunks/user/fetchCurrentUser";
import { fetchUpdateUser } from "../../asyncThunks";

import { type IUser } from "../../../types";

interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: {} as IUser,
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchUpdateUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
