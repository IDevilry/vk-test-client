import { useState, type ChangeEventHandler, type FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { type IUserRegister } from "../authorization";

import { axiosInstance } from "../../../api";

import cn from "../authorization.module.css";

const SignUp: FC = () => {
  const [user, setUser] = useState<IUserRegister>({
    password: "",
    user_email: "",
    user_first_name: "",
    user_last_name: "",
  });

  const [chekPass, setCheckPass] = useState("");
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
      const res = await axiosInstance.post("/auth/register", user);
      if (res.status === 201) {
        localStorage.setItem("token", res.data.jwt);
        navigate("/");
      }
    } catch (error: Error | any) {
      setError(error?.response?.data);
    }
  };

  const checkPasswords: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value !== user.password) {
      setCheckPass("Пароли не совпадают");
    } else {
      setCheckPass("");
    }
  };

  return (
    <div className={cn.container}>
      <h1>Регистрация</h1>
      {error && <p>{error}</p>}
      <form className={cn.form} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="user_first_name"
          type="text"
          placeholder="Имя"
          required
        />
        <input
          onChange={handleChange}
          name="user_last_name"
          type="text"
          placeholder="Фамилия"
          required
        />
        <input
          onChange={handleChange}
          name="user_email"
          type="email"
          placeholder="Электронная почта"
          required
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Пароль"
          required
          className={chekPass ? cn.red : cn.white}
        />
        <input
          onChange={checkPasswords}
          name="secondPassword"
          type="password"
          placeholder="Повторите пароль"
          required
          className={chekPass ? cn.red : cn.white}
        />
        {chekPass && <p>{chekPass}</p>}
        <button className={cn.button} type="submit">
          Зарегистрироваться
        </button>
        <NavLink className={cn.link} to="/auth/login">
          Уже есть аккаунт? Войти
        </NavLink>
      </form>
    </div>
  );
};

export default SignUp;
