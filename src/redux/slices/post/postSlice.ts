import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchMyPosts, fetchPosts } from "../../asyncThunks/post/fetchPosts";
import { fetchNewPost } from "../../asyncThunks/post/fetchNewPost";

import { type IPostList } from "../../../types";
import { axiosInstance } from "../../../api";

interface PostState {
  posts: IPostList;
  myPosts: Omit<IPostList, "countOnPage">;
}

const initialState: PostState = {
  posts: { countOnPage: 0, totalCount: 0, posts: [] },
  myPosts: { totalCount: 0, posts: [] },
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    toggleLike(
      state,
      action: PayloadAction<{ userId: string; postId: string }>
    ) {
      const post = state.posts.posts.find(
        (post) => post._id === action.payload.postId
      );
      if (post) {
        post.likes?.includes(action.payload.userId)
          ? (post.likes = post.likes.filter(
              (id) => id !== action.payload.userId
            ))
          : post.likes?.push(action.payload.userId);
      }

      axiosInstance.post("/posts/like", {
        postId: action.payload.postId,
        userId: action.payload.userId,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(fetchMyPosts.fulfilled, (state, action) => {
      state.myPosts = action.payload;
    });
    builder.addCase(fetchNewPost.fulfilled, (state, action) => {
      state.posts.posts.unshift(action.payload.post);
      state.myPosts.posts.unshift(action.payload.post);
    });
  },
});

export default postSlice.reducer;
export const { toggleLike } = postSlice.actions;
