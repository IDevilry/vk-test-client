import {
  useEffect,
  useState,
  type FC,
  type FormEventHandler,
  type ChangeEventHandler,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchCurrentUser } from "../../redux/asyncThunks/user/fetchCurrentUser";
import { fetchUpdateUser } from "../../redux/asyncThunks";
import { fetchMyPosts } from "../../redux/asyncThunks/post/fetchPosts";

import { type IUserToUpdate } from "../../types";

import cn from "./profile.module.css";
import default_user_photo from "../../assets/default_user_photo.jpg";
import PostList from "../../components/PostList/PostList";
import NewPost from "../../components/NewPost/NewPost";

const Profile: FC = () => {
  const user = useAppSelector((state) => state.currentUser.user);
  const myPosts = useAppSelector((state) => state.posts.myPosts);
  const dispatch = useAppDispatch();
  const [updateUser, setUpdateUser] = useState<IUserToUpdate>();
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchMyPosts());
  }, [dispatch]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (updateUser) {
      dispatch(fetchUpdateUser(updateUser));
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
    <div className="container">
      <div className={cn.userBlock}>
        <img
          src={user.profile_photo ?? default_user_photo}
          alt="User Avatar"
          className={cn.userAvatar}
        />
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
            {updateUser && (
              <button className={cn.button} type="submit">
                Изменить данные
              </button>
            )}
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
