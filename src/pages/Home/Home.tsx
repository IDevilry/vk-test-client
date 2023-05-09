import { type FC } from "react";
import Profile from "../Profile/Profile";
import Feed from "../Feed/Feed";
import Friends from "../Friends/Friends";

import cn from "./home.module.css";
import { useAppSelector } from "../../hooks/typedRedux";

const Home: FC = () => {
  const user = useAppSelector((state) => state.currentUser.user);

  const posts = useAppSelector((state) => state.posts.posts.posts);

  return (
    <div className={cn.container}>
      <div className={cn.leftSide}>
        <Profile user={user} />
        <Friends />
      </div>
      <Feed isCurrentUser={true} posts={posts} />
    </div>
  );
};

export default Home;
