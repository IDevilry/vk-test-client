/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, type FC, ChangeEventHandler, useState } from "react";
import { useAppSelector } from "../../hooks/typedRedux";

import { User } from "../../components";

import { type IUser } from "../../types";

const UsersList: FC = () => {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>();

  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const friends = useAppSelector((state) => state.friends.friends);

  const usersWithoutCurrent = users.filter(
    (user) => user._id !== currentUser._id
  );

  useEffect(() => {
    setFilteredUsers(usersWithoutCurrent);
  }, []);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);

    setFilteredUsers(
      usersWithoutCurrent.filter(
        (user) =>
          user.user_first_name.includes(search) ||
          user.user_last_name.includes(search)
      )
    );
  };

  return (
    <>
      <div className="container">
        <input
          className="input"
          placeholder="Поиск..."
          type="search"
          onChange={handleSearch}
        />
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
