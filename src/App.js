import axios from "axios";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import PostOverview from "./pages/PostOverview";

function App() {
  const [searchActive, setSearchActive] = useState(false);
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    axios.get("https://www.reddit.com/subreddits.json?limit=100").then((resp) =>
      setSubreddits(() =>
        resp.data.data.children.map((x) => ({
          id: nanoid(),
          name: x.data.display_name,
          members: x.data.subscribers,
          icon: x.data.icon_img,
        }))
      )
    );
  }, []);

  function changeSearchActivew() {
    setSearchActive(false);
  }

  return (
    <div className="App" onClick={changeSearchActivew}>
      <Navbar
        searchActive={searchActive}
        setSearchActive={setSearchActive}
        subreddits={subreddits}
        setSubreddits={setSubreddits}
      />
      <Routes>
        <Route path="/" element={<Homepage
          searchActive={searchActive}
          setSearchActive={setSearchActive}
          subreddits={subreddits}
          setSubreddits={setSubreddits}
        />} />
        <Route path="r/:subreddit/comments/:id/:title" element={<PostOverview />}/>
      </Routes>
    </div>
  );
}

export default App;
