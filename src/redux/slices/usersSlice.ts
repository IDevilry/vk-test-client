import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types";

interface UserState {
  user: IUser[];
}

const initialState: UserState = {
  user: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUser(state, action: PayloadAction<IUser>) {},
    update(state, action) {},
  },
});

export const { update } = usersSlice.actions;
export default usersSlice.reducer;
