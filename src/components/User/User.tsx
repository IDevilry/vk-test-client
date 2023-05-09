import { NavLink, useNavigate } from "react-router-dom";
import { toggleFriend } from "../../redux/asyncThunks/user/toggleFriend";
import { useAppDispatch } from "../../hooks/typedRedux";
import { socket } from "../../socket";
import { setOnlineUsers } from "../../redux/slices";

import { useEffect, type FC } from "react";
import { type UserProps } from "./user.props";
import { type IUser } from "../../types";

import defaultPhoto from "../../assets/default_user_photo.jpg";

import cn from "./user.module.css";
import { findChatWithUser } from "../../utils";

const API_URL = process.env.REACT_APP_API_URL;

const User: FC<UserProps> = ({ user, isFriend, currentUser }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDelete = () => {
    dispatch(toggleFriend({ currUserId: currentUser._id, targetId: user._id }));
  };

  useEffect(() => {
    socket.on("getUsers", (users: IUser[]) => {
      dispatch(setOnlineUsers(users));
    });
    return () => {
      socket.off("getUsers");
    };
  }, [dispatch]);

  return (
    <div className={cn.container}>
      <div className="widgetContainer">
        <div className={cn.left}>
          <div className={cn.img}>
            <NavLink to={`/profile/${user._id}`}>
              {
                <img
                  src={
                    user.profile_photo
                      ? `${API_URL}/${user.profile_photo}`
                      : defaultPhoto
                  }
                  alt="user avatar"
                />
              }
            </NavLink>
          </div>
          <div className={cn.text}>
            <NavLink to={`/profile/${user._id}`}>
              <p className={cn.userName}>
                {user.user_first_name} {user.user_last_name}
              </p>
            </NavLink>
            <p>{user.description}</p>
          </div>
        </div>
        <div className={cn.button}>
          <button
            className={isFriend ? cn.secondary : cn.primary}
            onClick={handleDelete}
          >
            {isFriend ? "Удалить из друзей" : "Добавить в друзья"}
          </button>
          <button
            onClick={() => findChatWithUser(navigate, user, currentUser)}
            className={cn.primary}
          >
            Написать сообщение
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
