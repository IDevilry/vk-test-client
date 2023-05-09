import { type FC, type ChangeEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchNewPost } from "../../redux/asyncThunks/post/fetchNewPost";

import { type INewPost } from "../../types";

import cn from "./newpost.module.css";

const NewPost: FC = () => {
  const { _id } = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();

  const [newPost, setNewPost] = useState<INewPost>();
  const [image, setNewImage] = useState<File | null>();

  const handleSubmit = () => {
    const formData = new FormData();
    console.log("submit")
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
    <div className={cn.newPost}>
      <div className={cn.top}>
        <input
          className={`${cn.postInput} input`}
          placeholder="Что нового?"
          type="text"
          name="content"
          required
          onChange={handleChange}
        />
      </div>
      <div className={cn.bottom}>
        <div className={cn.left}>
          <label htmlFor="files" className="button">
            Выберите изображение
          </label>
          <input id="files" style={{ visibility: "hidden" }} type="file" onChange={handleFile} />
        </div>
        <div className={cn.right}>
          <button onClick={handleSubmit} type="button" className="button">
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
