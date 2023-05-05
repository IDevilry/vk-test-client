import { type FC, useEffect } from "react";

import { fetchPosts } from "../../redux/asyncThunks/post/fetchPosts";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";

import PostList from "../../components/PostList/PostList";
import NewPost from "../../components/NewPost/NewPost";

const Feed: FC = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  return (
    <div>
      <NewPost />
      <PostList
        countOnPage={posts.countOnPage}
        totalCount={posts.totalCount}
        posts={posts.posts}
      />
    </div>
  );
};

export default Feed;
