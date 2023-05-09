import { type FC } from "react";
import Profile from "../Profile/Profile";
import Feed from "../Feed/Feed";

import { useAppSelector } from "../../hooks/typedRedux";
import { useParams } from "react-router-dom";

import cn from "../Home/home.module.css";

const UserProfile: FC = () => {
  const users = useAppSelector((state) => state.users.users);
  const posts = useAppSelector((state) => state.posts.posts.posts);

  const { id } = useParams();

  const user = users.find((user) => user._id === id);
  const userPosts = posts.filter((post) => post.user._id === id);

  return (
    <div className="container">
      <div className={cn.container}>
        <div className={cn.leftSide}>
          <Profile user={user} />
        </div>
        <Feed isCurrentUser={false} posts={userPosts} />
      </div>
    </div>
  );
};

export default UserProfile;
