import {
  type FormEventHandler,
  type FC,
  type ChangeEventHandler,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchNewPost } from "../../redux/asyncThunks/post/fetchNewPost";

import { type INewPost } from "../../types";

import cn from "./newpost.module.css";

const NewPost: FC = () => {
  const { _id } = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();

  const [newPost, setNewPost] = useState<INewPost>();
  const [image, setNewImage] = useState<File | null>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("image", image || "");
    formData.append("content", newPost?.content || "");
    formData.append("title", newPost?.title || "");
    formData.append("user", _id);

    dispatch(fetchNewPost(formData));
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewPost({
      [e.target.name]: e.target.value,
    });
  };

  const handleFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewImage(file);
  };

  return (
    <div className={cn.container}>
      <div className={cn.top}>
        <h2 className={cn.topText}>Новый пост</h2>
      </div>
      <div className={cn.bottom}>
        <form onSubmit={handleSubmit} className={cn.form}>
          <input
            name="title"
            onChange={handleChange}
            type="text"
            placeholder="Заголовок (необязательно)"
          />
          <input
            name="content"
            onChange={handleChange}
            type="text"
            required
            placeholder="Что нового?"
          />
          <input
            name="image"
            onChange={handleFile}
            accept="image/*"
            type="file"
            placeholder="Ссылка на изображение (необязательно)"
          />

          <button type="submit">Создать</button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
