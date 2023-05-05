import { type FC } from "react";
import { type IPost } from "../../types";

import cn from "./post.module.css";

interface PostProps {
  post: IPost;
}

const Post: FC<PostProps> = ({ post }) => {
  const { content, user, image, likes, title } = post;

  return (
    <div className={cn.container}>
      <div className={cn.top}>
        <div className={cn.user}>
          <div className={cn.userLeft}>
            {user.profile_photo && (
              <img src={user.profile_photo} alt="user avatar" />
            )}
            <p className={cn.userName}>
              {user.user_first_name} {user.user_last_name}
            </p>
          </div>
        </div>
        <div className={cn.textTop}>
          <p className={cn.textTitle}>{title}</p>
          <p className={cn.textContent}>{content}</p>
          {image && <img src={image} alt="post" />}
        </div>
      </div>
      <div className={cn.bottom}>
        <p>{likes?.length}</p>
      </div>
    </div>
  );
};

export default Post;
