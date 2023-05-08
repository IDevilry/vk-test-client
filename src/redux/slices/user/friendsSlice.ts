import { createSlice } from "@reduxjs/toolkit";
import { fetchFriends } from "../../asyncThunks";
import { toggleFriend } from "../../asyncThunks";

import { type IUser } from "../../../types";

interface FriendsState {
	friends: IUser[];
	totalCount: number;
}

const initialState: FriendsState = {
	friends: [],
	totalCount: 0,
};

const friendsSlice = createSlice({
	name: "friends",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFriends.fulfilled, (state, action) => {
			state.friends = action.payload?.user?.friends;
			state.totalCount = action.payload.totalCount;
		});
		builder.addCase(toggleFriend.fulfilled, (state, action) => {
			state.friends.find(
				(friend) => friend._id === action.payload.targetUser._id
			)
				? (state.friends = state.friends.filter(
						(friend) => friend._id !== action.payload.targetUser._id
				  ))
				: state.friends.unshift(action.payload.targetUser);
		});
	},
});

export default friendsSlice.reducer;
