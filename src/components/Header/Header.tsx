import { socket } from "../../socket";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/typedRedux";
import { GrLogout } from "react-icons/gr";

import { type FC } from "react";

import cn from "./header.module.css";

const API_URL = process.env.REACT_APP_API_URL;

const Header: FC = () => {
  const user = useAppSelector((state) => state.currentUser.user);

  const navigate = useNavigate();

  const logOut = () => {
    socket.emit("userDisconnected", user);
    localStorage.clear();
    navigate("/auth/login");
    window.location.reload();
  };
  return (
    <div className={cn.container}>
      <nav className={cn.nav}>
        <ul className={cn.navList}>
          <NavLink
            className={({ isActive }) => (isActive ? cn.active : "")}
            to="/"
          >
            Моя страница
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? cn.active : "")}
            to="/users"
          >
            Люди
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? cn.active : "")}
            to="/chat"
          >
            Сообщения
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? cn.active : "")}
            to="/feed"
          >
            Лента
          </NavLink>
        </ul>
        <div className={cn.right}>
          <div className={cn.user}>
            {user?.profile_photo && (
              <NavLink to="/">
                <img
                  src={`${API_URL}/${user.profile_photo}`}
                  alt="User Avatar"
                  className={cn.userAvatar}
                />
              </NavLink>
            )}

            <NavLink to="/">{user?.user_first_name}</NavLink>
          </div>
          <button className={cn.button} onClick={logOut} type="button">
            <GrLogout
              className="fillWhite"
              style={{ width: "25px", height: "25px" }}
            />
            Выйти
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
