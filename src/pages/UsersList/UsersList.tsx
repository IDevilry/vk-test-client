/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, type FC, ChangeEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchAllUsers } from "../../redux/asyncThunks/user/fetchAllUsers";

import { User } from "../../components";

import { type IUser } from "../../types";

import cn from "./usersList.module.css";

const UsersList: FC = () => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>();

  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const friends = useAppSelector((state) => state.friends.friends);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());

    const usersWithoutCurrentUser = users?.filter(
      (user) => user?._id !== currentUser?._id
    );

    const filtered = usersWithoutCurrentUser?.filter(
      (user) =>
        user?.user_first_name.toLowerCase().includes(search.toLowerCase()) ||
        user?.user_last_name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [currentUser]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className={cn.container}>
        <input placeholder="Поиск..." type="search" onChange={handleSearch} />
        {filteredUsers?.map((user) => (
          <User
            key={user._id}
            currentUser={currentUser}
            user={user}
            isFriend={
              friends?.find((friend) => friend._id === user._id) ? true : false
            }
          />
        ))}
      </div>
    </>
  );
};

export default UsersList;
