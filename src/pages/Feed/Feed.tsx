/* eslint-disable array-callback-return */
import { PostList } from "../../components";

import { useAppSelector } from "../../hooks/typedRedux";

import { type FC } from "react";
import { type IPost } from "../../types";


const Feed: FC = () => {
  const friends = useAppSelector((state) => state.friends.friends);

  const collectFriendsPosts = () => {
    const friendsPosts: IPost[] = [];
    friends.map((friend) => {
      friend.posts?.map((post) => {
        friendsPosts.push(post);
      });
    });
    return friendsPosts;
  };
  const friendsPosts = collectFriendsPosts();
  return (
    <div>
      <PostList totalCount={friendsPosts.length} posts={friendsPosts} />
    </div>
  );
};

export default Feed;
