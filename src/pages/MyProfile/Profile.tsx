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

import { PostList, NewPost } from "../../components";

import { type IUserToUpdate } from "../../types";

import default_user_photo from "../../assets/default_user_photo.jpg";

import cn from "./profile.module.css";

const API_URL = process.env.REACT_APP_API_URL;

const Profile: FC = () => {
  const user = useAppSelector((state) => state.currentUser.user);
  const myPosts = useAppSelector((state) => state.posts.myPosts);
  const dispatch = useAppDispatch();
  const [updateUser, setUpdateUser] = useState<IUserToUpdate>();
  const [image, setImage] = useState<File>();
  useEffect(() => {
    dispatch(fetchMyPosts());
  }, [dispatch]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (updateUser || image) {
      dispatch(
        fetchUpdateUser({ ...updateUser, _id: user._id, profile_photo: image })
      );
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdateUser({
      ...updateUser,
      _id: user._id,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    setImage(file);
  };

  return (
    <div className="container">
      <div className={cn.userBlock}>
        <div className={cn.avatarBlock}>
          <img
            src={
              user.profile_photo
                ? `${API_URL}/${user.profile_photo}`
                : default_user_photo
            }
            alt="User Avatar"
            className={cn.userAvatar}
          />
          <label className={cn.avatarBlockText}>
            Изменить аватарку
            <input type="file" accept="image/*" onChange={handleImage} />
          </label>
        </div>

        <div className={cn.text}>
          <h2>
            {user.user_first_name} {user.user_last_name}
          </h2>
          <form onSubmit={handleSubmit}>
            <label>
              Почта:
              <input
                className={cn.input}
                defaultValue={user?.user_email}
                type="email"
                name="user_email"
                onChange={handleChange}
              />
            </label>
            <label>
              О себе:
              <input
                className={cn.input}
                defaultValue={user?.description}
                type="text"
                name="description"
                onChange={handleChange}
              />
            </label>
            <label>
              Возраст:
              <input
                className={cn.input}
                defaultValue={user?.age}
                type="text"
                name="age"
                onChange={handleChange}
              />
            </label>
            <label>
              Город:
              <input
                className={cn.input}
                defaultValue={user?.city}
                type="text"
                name="city"
                onChange={handleChange}
              />
            </label>
            <label>
              Учебное заведение:
              <input
                className={cn.input}
                defaultValue={user?.institution}
                type="text"
                name="institution"
                onChange={handleChange}
              />
            </label>
            {updateUser || image ? (
              <button className={cn.button} type="submit">
                Изменить данные
              </button>
            ) : null}
          </form>
        </div>
      </div>
      <div className={cn.posts}>
        <NewPost />
        <PostList totalCount={myPosts.totalCount} posts={myPosts.posts} />
      </div>
    </div>
  );
};

export default Profile;
