import { useState, type FC, type ChangeEventHandler, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";

import { User } from "../../components";

import cn from "./friends.module.css";
import { fetchFriends } from "../../redux/asyncThunks";

const Friends: FC = () => {
  const [search, setSearch] = useState("");

  const friends = useAppSelector((state) => state.friends.friends);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();

  const filtered = friends.filter(
    (user) =>
      user.user_first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.user_last_name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={cn.container}>
      <div className={cn.text}>
        <p>Мои друзья</p>
      </div>
      <input type="search" onChange={handleSearch} />
      <div>
        {filtered.map((friend) => (
          <User
            key={friend._id}
            user={friend}
            isFriend
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Friends;
