import Post from "../Post/Post";

import { type FC } from "react";
import { type IPost } from "../../types";

import cn from "./postList.module.css"

export interface IPostListProps {
  posts: IPost[];
  totalCount: number;
  countOnPage?: number;
}

const PostList: FC<IPostListProps> = ({countOnPage, posts, totalCount}) => {
  return (
    <div className={cn.postList}>
      {posts?.map(post => (
        <Post key={post?._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
