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

  const [file, setFile] = useState<File>();

  const [chekPass, setCheckPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setError("");
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("password", user.password);
      formData.append("user_email", user.user_email);
      formData.append("user_first_name", user.user_first_name);
      formData.append("user_last_name", user.user_last_name);
      formData.append("image", file);
      const res = await axiosInstance.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        localStorage.setItem("token", res.data.jwt);
        navigate("/");
        window.location.reload();
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

  const handleFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFile(e.target.files?.length ? e.target.files[0] : undefined);
  };

  return (
    <div className={cn.container}>
      <h1>Регистрация</h1>
      {error && <p>{error}</p>}
      <form className={cn.form} onSubmit={handleSubmit}>
        <input
          className="input"
          onChange={handleChange}
          name="user_first_name"
          type="text"
          placeholder="Имя"
          required
        />
        <input
          className="input"
          onChange={handleChange}
          name="user_last_name"
          type="text"
          placeholder="Фамилия"
          required
        />
        <input
          className="input"
          onChange={handleChange}
          name="user_email"
          type="email"
          placeholder="Электронная почта"
          required
        />
        <label htmlFor="files" className={cn.inputLabel}>
          Выберите изображение
        </label>
        <input
          id="files"
          style={{ visibility: "hidden", position: "absolute", bottom: "0" }}
          type="file"
          onChange={handleFile}
        />
        <input
          className="input"
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Пароль"
          required
        />
        <input
          className="input"
          onChange={checkPasswords}
          name="secondPassword"
          type="password"
          placeholder="Повторите пароль"
          required
        />
        {chekPass && <p>{chekPass}</p>}
        <button className="button" type="submit">
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
