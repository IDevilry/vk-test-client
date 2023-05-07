import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/post/postSlice";
import currentUserReducer from "./slices/user/currentUserSlice";
import usersReducer from "./slices/user/usersSlice";
import friendsReducer from "./slices/user/friendsSlice";
import chatReducer from "./slices/chat/chatSlice";
import messagesReducer from "./slices/chat/messagesSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
    currentUser: currentUserReducer,
    friends: friendsReducer,
    chats: chatReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
