/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, type FC } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Feed,
  Friends,
  Profile,
  SignIn,
  SignUp,
  Chat,
  UserProfile,
  UsersList,
} from "../pages";

import { PrivateWrapper, Layout } from "../components";

import { useAppDispatch, useAppSelector } from "../hooks/typedRedux";
import { fetchCurrentUser } from "../redux/asyncThunks";
import { fetchFriends } from "../redux/asyncThunks/user/fetchFriends";
import { fetchChats } from "../redux/asyncThunks/chat/fetchChats";
import { socket } from "../socket";

const App: FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.currentUser.user);

  useEffect(() => {
    socket.emit("addNewUser", user);

    return () => {
      socket.emit("userDisconnected", user);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchFriends());
    dispatch(fetchChats({ userId: user?._id }));
  }, []);

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
                <Feed />
              </PrivateWrapper>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateWrapper>
                <Profile />
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
          <Route path="friends/">
            <Route
              path="my"
              element={
                <PrivateWrapper>
                  <Friends />
                </PrivateWrapper>
              }
            />
            <Route
              path="search"
              element={
                <PrivateWrapper>
                  <UsersList />
                </PrivateWrapper>
              }
            />

            <Route />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
