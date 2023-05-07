import { useEffect, type FC, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../api";

import { type IUser, type IUserById } from "../../types";

import { toggleFriend } from "../../redux/asyncThunks/user/toggleFriend";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";

import { PostList } from "../../components";

import default_user_photo from "../../assets/default_user_photo.jpg";

import cn from "./userProfile.module.css";

const API_URL = process.env.REACT_APP_API_URL;

const UserProfile: FC = () => {
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [user, setUser] = useState<IUserById>();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get<IUserById>(`/users/id/${id}`);
      setUser({
        user: res.data.user,
        isFriend: !!res.data.user.friends?.includes(
          currentUser?._id as unknown as IUser
        ),
        totalCount: res.data.totalCount,
      });
    };
    fetchUser();
  }, [currentUser?._id, dispatch, id, user?.isFriend]);

  const handleDelete = () => {
    dispatch(
      toggleFriend({
        currUserId: currentUser._id,
        targetId: user?.user._id ?? "",
      })
    );
    setUser({
      totalCount: user?.totalCount ?? 0,
      user: user?.user ?? ({} as IUser),
      isFriend: !user?.isFriend,
    });
  };

  return (
    <div className="container">
      <div className={cn.userBlock}>
        <img
          src={`${API_URL}/${user?.user.profile_photo}` ?? default_user_photo}
          alt="User Avatar"
          className={cn.userAvatar}
        />
        <div className={cn.text}>
          <h2>
            {user?.user?.user_first_name} {user?.user.user_last_name}
          </h2>
          <p>О себе: {user?.user?.description}</p>
          <p>Возраст: {user?.user?.age}</p>
          <p>Город: {user?.user?.city}</p>
          <p>Учебное заведение: {user?.user?.institution}</p>
        </div>
        <button
          className={user?.isFriend ? cn.secondary : cn.primary}
          onClick={handleDelete}
        >
          {user?.isFriend ? "Удалить из друзей" : "Добавить в друзья"}
        </button>
      </div>
      <div className={cn.posts}>
        {user?.totalCount && user?.user.posts ? (
          <PostList totalCount={user?.totalCount} posts={user?.user?.posts} />
        ) : null}
      </div>
    </div>
  );
};

export default UserProfile;
