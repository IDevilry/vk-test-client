/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, type FC } from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SignIn, SignUp, Chat, UserProfile, UsersList, Feed } from "./pages";

import { PrivateWrapper, Layout } from "./components";

import { useAppDispatch, useAppSelector } from "./hooks/typedRedux";
import {
  fetchAllUsers,
  fetchCurrentUser,
  fetchPosts,
} from "./redux/asyncThunks";
import { fetchFriends } from "./redux/asyncThunks/user/fetchFriends";
import { fetchChats } from "./redux/asyncThunks/chat/fetchChats";
import { socket } from "./socket";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home/Home";
import { IUser } from "./types";
import { setOnlineUsers } from "./redux/slices";
import OnlyPosts from "./pages/Feed/OnlyPosts";

const App: FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.currentUser.user);
  const allPosts = useAppSelector((state) => state.posts.posts.posts);
  const isAuth = useAuth();

  useEffect(() => {
    if (user) {
      socket.emit("addNewUser", user);
    }
  }, [user]);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCurrentUser());
    }

    if (user._id) {
      dispatch(fetchFriends());
      dispatch(fetchAllUsers());
      dispatch(fetchChats({ userId: user?._id }));
    }
  }, [dispatch, isAuth, user._id]);

  useEffect(() => {
    socket.on("getUsers", (users: IUser[]) => {
      dispatch(setOnlineUsers(users));
    });
    return () => {
      socket.off("getUsers");
    };
  }, []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/">
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<SignIn />} />
        </Route>
        <Route
          path="/"
          element={
            <PrivateWrapper>
              <Layout />
            </PrivateWrapper>
          }
        >
          <Route
            index
            element={
              <PrivateWrapper>
                <Home />
              </PrivateWrapper>
            }
          />
          <Route
            path="feed"
            element={
              <PrivateWrapper>
                <OnlyPosts>
                  <Feed posts={allPosts} />
                </OnlyPosts>
              </PrivateWrapper>
            }
          />
          <Route
            path="profile/:id"
            element={
              <PrivateWrapper>
                <UserProfile />
              </PrivateWrapper>
            }
          />
          <Route
            path="chat"
            element={
              <PrivateWrapper>
                <Chat />
              </PrivateWrapper>
            }
          />
          <Route
            path="users"
            element={
              <PrivateWrapper>
                <UsersList />
              </PrivateWrapper>
            }
          />
          <Route />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
