import React, { useState, type ChangeEventHandler } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { type IUserLogin } from "../authorization";
import { axiosInstance } from "../../../api";

import cn from "../authorization.module.css";

const SignIn: React.FC = () => {
  const [user, setUser] = useState<IUserLogin>({
    password: "",
    user_email: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setError("")
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", user);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.jwt);
        navigate("/");
        window.location.reload();
      }
    } catch (error: Error | any) {
      console.log(error);
      setError(error?.response?.data);
    }
  };

  return (
    <div className={cn.container}>
      <h1>Авторизация</h1>
      {error && <p>{error}</p>}
      <form className={cn.form} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="user_email"
          type="email"
          placeholder="Электронная почта"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Пароль"
        />
        <button className={cn.button} type="submit">
          Войти
        </button>
        <NavLink className={cn.link} to="/auth/register">
          Зарегистрироваться
        </NavLink>
      </form>
    </div>
  );
};

export default SignIn;
