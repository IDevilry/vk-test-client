import { type FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import default_user_photo from "../../assets/default_user_photo.jpg";

import { fetchFriends } from "../../redux/asyncThunks";

import cn from "./friends.module.css";
import { checkOnlineStatus } from "../../utils";
import { NavLink } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Friends: FC = () => {
  const friends = useAppSelector((state) => state.friends.friends);
  const onlineUsers = useAppSelector((state) => state.users.onlineUsers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <div className="widgetContainer">
      <h2>Список друзей</h2>
      {friends.length ? (
        <>
          {friends.map((friend) => (
            <div key={friend._id}>
              <NavLink to={`profile/${friend._id}`}>
                <div className={cn.avatarLeftSide}>
                  <div
                    className={
                      checkOnlineStatus(onlineUsers, friend) ? cn.onlineDot : ""
                    }
                  ></div>
                  <img
                    src={
                      friend.profile_photo
                        ? `${API_URL}/${friend.profile_photo}`
                        : default_user_photo
                    }
                    alt="User Avatar"
                    className={cn.userAvatar}
                  />
                  <div className={cn.name}>
                    <span className={cn.userName}>
                      {friend.user_first_name} {friend.user_last_name}
                    </span>

                    <span>
                      {checkOnlineStatus(onlineUsers, friend)
                        ? "В сети"
                        : "Не в сети"}
                    </span>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>Вы ещё не добавили ни одного друга</p>
        </>
      )}
    </div>
  );
};

export default Friends;
