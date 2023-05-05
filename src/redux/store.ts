import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import currentUserReducer from "./slices/currentUserSlice";
import usersReducer from "./slices/usersSlice";
import friendsReducer from "./slices/friendsSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
    currentUser: currentUserReducer,
    friends: friendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
