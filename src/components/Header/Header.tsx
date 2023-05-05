import { FC, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchCurrentUser } from "../../redux/asyncThunks/user/fetchCurrentUser";

import cn from "./header.module.css";

const Header: FC = () => {
  const user = useAppSelector((state) => state.currentUser.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
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
            to="/messages"
          >
            Сообщения
          </NavLink>
        </ul>
        <div className={cn.right}>
          <div className={cn.user}>
            {user?.profile_photo && (
              <NavLink to="/profile">
                <img
                  src={user?.profile_photo}
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
