import { type FC, useState } from "react";
import Profile from "../Profile/Profile";
import Feed from "../Feed/Feed";

import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { useNavigate, useParams } from "react-router-dom";

import { findChatWithUser } from "../../utils";
import { toggleFriend } from "../../redux/asyncThunks";

import cn from "../Home/home.module.css";

const UserProfile: FC = () => {
  const users = useAppSelector((state) => state.users.users);
  const currUser = useAppSelector((state) => state.currentUser.user);
  const friends = useAppSelector((state) => state.friends.friends);
  const posts = useAppSelector((state) => state.posts.posts.posts);

  const [isFriend, setFriend] = useState<boolean>(
    friends?.find((friend) => friend._id === currUser._id) ? true : false
  );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = () => {
    if (id) {
      dispatch(toggleFriend({ currUserId: currUser._id, targetId: id }));
      setFriend(!isFriend);
    }
  };

  const user = users.find((user) => user._id === id);

  const userPosts = posts.filter((post) => post.user._id === id);

  return user ? (
    <div className="container">
      <div className={cn.container}>
        <div className={cn.leftSide}>
          <Profile user={user} />
          <div className={cn.button}>
            <button
              className={`${isFriend ? cn.secondary : cn.primary}`}
              onClick={handleDelete}
            >
              {isFriend ? "Удалить из друзей" : "Добавить в друзья"}
            </button>
            <button
              onClick={() => findChatWithUser(navigate, user, currUser)}
              className="button"
            >
              Написать сообщение
            </button>
          </div>
        </div>
        <Feed isCurrentUser={false} posts={userPosts} />
      </div>
    </div>
  ) : null;
};

export default UserProfile;
