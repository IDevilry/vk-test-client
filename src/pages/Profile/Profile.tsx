import {
  useEffect,
  useState,
  type FC,
  type FormEventHandler,
  type ChangeEventHandler,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchUpdateUser } from "../../redux/asyncThunks";
import { fetchMyPosts } from "../../redux/asyncThunks/post/fetchPosts";

import { type IUserToUpdate } from "../../types";

import default_user_photo from "../../assets/default_user_photo.jpg";

import cn from "./profile.module.css";
import { checkOnlineStatus } from "../../utils";
import { ProfileProps } from "./profile.props";

const API_URL = process.env.REACT_APP_API_URL;

const Profile: FC<ProfileProps> = ({ user }) => {
  const onlineUsers = useAppSelector((state) => state.users.onlineUsers);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();

  const [updateUser, setUpdateUser] = useState<IUserToUpdate>();
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

  if (user === undefined) {
    return <p>Полльзователь не найден</p>;
  }

  const isOnline = checkOnlineStatus(onlineUsers, user);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (updateUser) {
      console.log(updateUser);
      dispatch(fetchUpdateUser({ ...updateUser, _id: user._id }));
      setEdit(false);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdateUser({
      ...updateUser,
      _id: user._id,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="widgetContainer">
      <div className={cn.avatarAndName}>
        <div className={cn.avatarLeftSide}>
          <div className={cn.onlineDot}></div>
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

            <span className={cn.onlineSpan}>
              {isOnline ? "В сети" : "Не в сети"}
            </span>
          </div>
        </div>
        <div className={cn.avatarRightSide}>
          {currentUser._id === user._id ? (
            <span onClick={() => setEdit(!isEdit)}>Редактировать</span>
          ) : null}
        </div>
      </div>
      <div className={cn.userInfo}>
        {isEdit ? (
          <form className={cn.inputsCol} onSubmit={handleSubmit}>
            <input
              name="description"
              placeholder="О себе"
              className="input"
              onChange={handleChange}
              defaultValue={user.description}
              type="text"
            />
            <input
              name="city"
              placeholder="Город"
              className="input"
              onChange={handleChange}
              defaultValue={user.city}
              type="text"
            />
            <input
              name="age"
              placeholder="Возраст"
              className="input"
              onChange={handleChange}
              defaultValue={user.age}
              type="text"
            />
            <button className="button" type="submit">
              Подтвердить
            </button>
          </form>
        ) : (
          <>
            <p className={cn.text}>
              О себе: <span>{user.description}</span>
            </p>
            <p className={cn.text}>
              Город: <span>{user.city}</span>
            </p>
            <p className={cn.text}>
              Возраст: <span>{user.age}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
