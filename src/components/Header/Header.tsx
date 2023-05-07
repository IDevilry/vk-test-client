import { type FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/typedRedux";

import cn from "./header.module.css";

const API_URL = process.env.REACT_APP_API_URL;

const Header: FC = () => {
  const user = useAppSelector((state) => state.currentUser.user);

  const navigate = useNavigate();

  const logOut = () => {
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
            Лента
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? cn.active : "")}
            to="/profile"
          >
            Моя страница
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? cn.active : "")}
            to="/friends/search"
          >
            Люди
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? cn.active : "")}
            to="/friends/my"
          >
            <p>Мои друзья</p>
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? cn.active : "")}
            to="/chat"
          >
            Сообщения
          </NavLink>
        </ul>
        <div className={cn.right}>
          <div className={cn.user}>
            {user?.profile_photo && (
              <NavLink to="/profile">
                <img
                  src={`${API_URL}/${user.profile_photo}`}
                  alt="User Avatar"
                  className={cn.userAvatar}
                />
              </NavLink>
            )}

            <NavLink to="/profile">{user?.user_first_name}</NavLink>
          </div>
          <button className={cn.button} onClick={logOut} type="button">
            Выйти
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
