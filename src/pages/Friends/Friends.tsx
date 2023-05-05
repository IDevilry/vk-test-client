import { type FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/typedRedux";
import { fetchFriends } from "../../redux/asyncThunks/user/fetchFriends";

import User from "../../components/User/User";

import cn from './friends.module.css'

const Friends: FC = () => {
  const friends = useAppSelector((state) => state.friends.friends);
  const currentUser = useAppSelector((state) => state.currentUser.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  return (
    <>
      <div className={cn.text}>
        <p>Мои друзья</p>
      </div>
      <div>
        {friends.map((friend) => (
          <User
            key={friend._id}
            user={friend}
            isFriend
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
};

export default Friends;
