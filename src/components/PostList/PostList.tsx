import Post from "../Post/Post";

import { type FC } from "react";
import { type IPostListProps } from "./postList.props";

import cn from "./postList.module.css";

const PostList: FC<IPostListProps> = ({ countOnPage, posts, totalCount }) => {
  return (
    <div className={cn.postList}>
      {posts?.map((post) => (
        <Post key={post?._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
