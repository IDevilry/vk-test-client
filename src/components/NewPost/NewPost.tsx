import {
  type FormEventHandler,
  type FC,
  type ChangeEventHandler,
  useState,
} from "react";
import cn from "./newpost.module.css";
import { type INewPost } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchNewPost } from "../../redux/asyncThunks/post/fetchNewPost";

const NewPost: FC = () => {
  const { _id } = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();
  const [newPost, setNewPost] = useState<INewPost>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (newPost) {
      dispatch(fetchNewPost(newPost));
    }
    setNewPost({
      content: "",
      image: "",
      title: "",
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewPost({
      ...newPost,
      user: _id,
      [e.target.name]: e.target.value,
    });
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
            onChange={handleChange}
            type="url"
            required
            placeholder="Ссылка на изображение (необязательно)"
          />

          <button type="submit">Создать</button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
