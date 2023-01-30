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

function App() {
  const [searchActive, setSearchActive] = useState(false);
  const {user, token, subreddits} = useContext(uContext);

  function changeSearchActive() {
    setSearchActive(false);
  }

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
          <Route path="r/:subreddit" element={<Subreddit />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/profile/:id" element={<Profile />}/>
        </Routes>
      </div>
    </UserContext>
  );
}

export default App;
