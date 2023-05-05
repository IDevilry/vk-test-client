import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api";
import { IUser } from "../../../types";

interface IToggleFriend {
  targetUser: IUser;
  currentUser: IUser;
}

export const toggleFriend = createAsyncThunk<
IToggleFriend,
  { targetId: string; currUserId: string }
>("friends/toggleFriend", async ({ currUserId, targetId }) => {
  const res = await axiosInstance.post<IToggleFriend>("/users/togglefriend", {
    targetId,
    userId: currUserId,
  });
  return res.data;
});
