import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchMyPosts, fetchPosts } from "../../asyncThunks/post/fetchPosts";
import { fetchNewPost } from "../../asyncThunks/post/fetchNewPost";

import { IPost, type IPostList } from "../../../types";
import { axiosInstance } from "../../../api";

interface PostState {
  posts: IPostList;
  myPosts: Omit<IPostList, "countOnPage">;
  isLoading: boolean;
}

const initialState: PostState = {
  posts: { countOnPage: 0, totalCount: 0, posts: [] },
  myPosts: { totalCount: 0, posts: [] },
  isLoading: false,
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
    deletePost(state, action: PayloadAction<{ postId: string }>) {
      const postToDelete = state.myPosts.posts.find(
        (post) => post._id === action.payload.postId
      );

      state.myPosts.posts = state.myPosts.posts.filter(
        (post) => post._id !== action.payload.postId
      );
      state.posts.posts = state.posts.posts.filter(
        (post) => post._id !== action.payload.postId
      );

      axiosInstance.delete(`/posts/delete/${postToDelete?._id}`);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchMyPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.myPosts = action.payload;
    });
    builder.addCase(fetchNewPost.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNewPost.fulfilled, (state, action) => {
      const postWithUser: IPost = {
        ...action.payload.post,
        user: action.payload.user,
      };

      state.posts.posts.unshift(postWithUser);
      state.myPosts.posts.unshift(postWithUser);

      state.isLoading = false;
    });
  },
});

export default postSlice.reducer;
export const { toggleLike, deletePost } = postSlice.actions;
