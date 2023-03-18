import axios from "axios";
import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import { uContext, UserContext } from "./context/UserContext";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PostOverview from "./pages/PostOverview";
import Signup from "./pages/Signup";
import Subreddit from "./pages/Subreddit";
import Profile from "./pages/Profile";
import Protected from "./components/Protected";
import VerifiedEmail from "./pages/VerifiedEmail";
import VerifyEmail from "./pages/VerifyEmail";
import { getSubreddits } from "./slices/subredditsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./slices/postsSlice";

function App() {
  const [searchActive, setSearchActive] = useState(false);
  const dispatch = useDispatch()
  const {subreddit} = useSelector(store => store.subreddit)

  function changeSearchActive() {
    setSearchActive(false);
  }

  useEffect(() => {
      dispatch(getSubreddits())
  }, [subreddit])

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <UserContext>
      <div className="App" onClick={changeSearchActive}>
        <Navbar
          searchActive={searchActive}
          setSearchActive={setSearchActive}
        />
        <Routes>
          <Route path="/" element={<Homepage
            searchActive={searchActive}
            setSearchActive={setSearchActive}
          />} />
          <Route path="/post/r/:subreddit/comments/:id/:title" element={<PostOverview />}/>
          <Route
            path="/signup"
            element={
              <Protected shouldBeLoggedin={false}>
                <Signup />
              </Protected>
            }
          />
          <Route
            path="/login"
            element={
              <Protected shouldBeLoggedin={false}>
                <Login />
              </Protected>
            }
          />
          <Route path="/r/:subreddit" element={<Subreddit />}/>
          <Route path="/user/:id" element={<Profile />}/>
          <Route path="/verifyemail" element={<VerifyEmail />}/>
          <Route path="/emailverified/:id" element={<VerifiedEmail />}/>
        </Routes>
      </div>
    </UserContext>
  );
}

export default App;
