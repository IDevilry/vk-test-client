import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IUser } from "../../types";
import { fetchCurrentUser } from "../asyncThunks/user/fetchCurrentUser";
import { fetchUpdateUser } from "../asyncThunks";

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
    update(state, action: PayloadAction<IUser>) {
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

export const { update } = userSlice.actions;
export default userSlice.reducer;
