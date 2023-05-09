import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, IUserToUpdate } from "../../../types";
import { axiosInstance } from "../../../api";

export const fetchUpdateUser = createAsyncThunk<IUser, IUserToUpdate>(
  "currentUser/fetchUpdateUser",
  async (userToUpdate) => {
    const res = await axiosInstance.patch<IUser>(
      `/users/update/${userToUpdate._id}`,
      userToUpdate,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );
    return res.data;
  }
);
