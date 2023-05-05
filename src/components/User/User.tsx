import { NavLink } from "react-router-dom";
import { toggleFriend } from "../../redux/asyncThunks/user/toggleFriend";
import { useAppDispatch } from "../../hooks/typedRedux";

import { type FC } from "react";
import { type IUser } from "../../types";

import defaultPhoto from "../../assets/default_user_photo.jpg";

import cn from "./user.module.css";

interface UserListProps {
  user: IUser;
  currentUser: IUser;
  isFriend: boolean;
}

const User: FC<UserListProps> = ({ user, isFriend, currentUser }) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(toggleFriend({ currUserId: currentUser._id, targetId: user._id }));
  };

  return (
    <div className={cn.container}>
      <div className={cn.left}>
        <div className={cn.img}>
          <NavLink to={`/profile/${user._id}`}>
            {<img src={user.profile_photo ?? defaultPhoto} alt="user avatar" />}
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
      </div>
    </div>
  );
};

export default User;
