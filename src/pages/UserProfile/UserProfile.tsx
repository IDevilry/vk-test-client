import { useEffect, type FC, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../api";

import { type IUserById } from "../../types";

import PostList from "../../components/PostList/PostList";

import default_user_photo from "../../assets/default_user_photo.jpg";
import cn from "./userProfile.module.css";

const UserProfile: FC = () => {
  const { id } = useParams();

  const [user, setUser] = useState<IUserById>();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get<IUserById>(`/users/id/${id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [id]);
  return (
    <div className="container">
      <div className={cn.userBlock}>
        <img
          src={default_user_photo}
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
