import { type DialogProps } from "./dialog.props";
import { type FC } from "react";

import defaultPhoto from "../../assets/default_user_photo.jpg";
import cn from "./dialog.module.css";

const API_URL = process.env.REACT_APP_API_URL;

const Dialog: FC<DialogProps> = ({ chat, currentUser, isOnline }) => {
  
  const companion = chat.members.find(
    (member) => member._id !== currentUser._id
  );

  return (
    <>
      <div className={cn.conversation}>
        <div className={cn.userBlock}>
          <div className={isOnline ? cn.onlineDot : ""}></div>
          <img
            src={
              companion?.profile_photo
                ? `${API_URL}/${companion.profile_photo}`
                : defaultPhoto
            }
            alt="user avatar"
          />
          <div className={cn.flex}>
            <span className={cn.name}>
              {companion?.user_first_name} {companion?.user_last_name}
            </span>
            <span className={cn.online}>{isOnline ? "Онлайн" :"Не в сети"}</span>
          </div>
        </div>
      </div>
      <hr className={cn.hr} />
    </>
  );
};

export default Dialog;
