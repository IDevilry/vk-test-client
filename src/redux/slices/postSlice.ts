import { createSlice } from "@reduxjs/toolkit";
import { type IPostList } from "../../types";
import { fetchMyPosts, fetchPosts } from "../asyncThunks/post/fetchPosts";
import { fetchNewPost } from "../asyncThunks/post/fetchNewPost";

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
  reducers: {},
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
