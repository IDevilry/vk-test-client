import { useEffect, type FC, ChangeEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchAllUsers } from "../../redux/asyncThunks/user/fetchAllUsers";

import { User } from "../../components";

import cn from "./usersList.module.css";

const UsersList: FC = () => {
  const [search, setSearch] = useState("");

  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const friends = useAppSelector((state) => state.friends.friends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUser._id
  );

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  const filtered = usersWithoutCurrentUser.filter(
    (user) =>
      user.user_first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.user_last_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className={cn.container}>
        <input placeholder="Поиск..." type="search" onChange={handleSearch} />
        {filtered.map((user) => (
          <User
            key={user._id}
            currentUser={currentUser}
            user={user}
            isFriend={
              friends.find((friend) => friend._id === user._id) ? true : false
            }
          />
        ))}
      </div>
    </>
  );
};

export default UsersList;
