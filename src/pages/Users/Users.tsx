import { useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchAllUsers } from "../../redux/asyncThunks/user/fetchAllUsers";
import { fetchFriends } from "../../redux/asyncThunks/user/fetchFriends";
import { fetchCurrentUser } from "../../redux/asyncThunks";

import User from "../../components/User/User";

const Users: FC = () => {
  const users = useAppSelector((state) => state.users.users);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const friends = useAppSelector((state) => state.friends.friends);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchFriends());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const usersWithoutCurrentUser = users.filter(
    (user) => user._id !== currentUser._id
  );

  return (
    <>
      <div>
        {usersWithoutCurrentUser.map((user) => (
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

export default Users;
