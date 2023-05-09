import { type FC } from "react";
import { type PostProps } from "./post.props";

import { FcLike, FcLikePlaceholder } from "react-icons/fc";

import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { toggleFriend } from "../../redux/asyncThunks";
import { toggleLike } from "../../redux/slices/post/postSlice";
import { checkOnlineStatus } from "../../utils";

import default_user_photo from "../../assets/default_user_photo.jpg";
import cn from "./post.module.css";

const API_URL = process.env.REACT_APP_API_URL;

const Post: FC<PostProps> = ({ post }) => {
  const { user, content, image, likes, _id } = post;

  const currentUser = useAppSelector((state) => state.currentUser.user);
  const onlineUsers = useAppSelector((state) => state.users.onlineUsers);
  const dispatch = useAppDispatch();

  const handleToggleFriend = () => {
    dispatch(toggleFriend({ currUserId: currentUser._id, targetId: user._id }));
  };

  const handleToggleLike = () => {
    dispatch(toggleLike({ userId: currentUser._id, postId: _id }));
  };

  const isFriend = true;
  return (
    <div className={cn.container}>
      <div className={cn.top}>
        <div className={cn.leftSide}>
          <div className={cn.avatarLeftSide}>
            <div
              className={
                checkOnlineStatus(onlineUsers, user) ? cn.onlineDot : ""
              }
            ></div>
            <img
              src={
                user.profile_photo
                  ? `${API_URL}/${user.profile_photo}`
                  : default_user_photo
              }
              alt="User Avatar"
              className={cn.userAvatar}
            />
            <div className={cn.name}>
              <span className={cn.userName}>
                {user.user_first_name} {user.user_last_name}
              </span>

              <span>
                {checkOnlineStatus(onlineUsers, user) ? "В сети" : "Не в сети"}
              </span>
            </div>
          </div>
        </div>
        <div className={cn.rightSide}>
          {user._id === currentUser._id ? null : (
            <button
              onClick={handleToggleFriend}
              type="button"
              className={`button ${isFriend ? cn.primary : cn.secondary}`}
            >
              {isFriend ? "Удалить из друзей" : "Добавить в друзья"}
            </button>
          )}
        </div>
      </div>
      <div className={cn.middle}>
        <p>{content}</p>
        <img src={`${API_URL}/${image}`} alt={content} />
      </div>
      <div className={cn.bottom}>
        <div className={cn.like}>
          {likes?.find((user) => user === currentUser._id) ? (
            <FcLike
              style={{ width: "25px", height: "25px" }}
              onClick={handleToggleLike}
            />
          ) : (
            <FcLikePlaceholder
              style={{ width: "25px", height: "25px" }}
              onClick={handleToggleLike}
            />
          )}

          <p>{likes?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
