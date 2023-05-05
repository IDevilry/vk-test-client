import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feed, Friends, Profile, SignIn, SignUp } from "../pages";

import Layout from "../components/Layout/Layout";
import PrivateWrapper from "../components/PrivateWrapper/PrivateWrapper";

const App: React.FC = () => {
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
            path="friends"
            element={
              <PrivateWrapper>
                <Friends />
              </PrivateWrapper>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
