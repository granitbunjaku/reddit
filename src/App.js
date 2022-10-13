import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react'
import './App.css';
import Homepage from "./pages/Homepage"

function App() {
  const [searchActive, setSearchActive] = useState(false)
  const [subreddits, setSubreddits] = useState([])

  useEffect(() => {
    axios.get('https://www.reddit.com/subreddits.json?limit=100')
      .then(resp => setSubreddits(() => resp.data.data.children.map(x => ({ id: nanoid(), name: x.data.display_name, members: x.data.subscribers, icon: x.data.icon_img }))))
  }, [])

  function changeSearchActivew() {
    setSearchActive(false)
  }

  return (
    <div className="App" onClick={changeSearchActivew}>
      <Homepage searchActive={searchActive} setSearchActive={setSearchActive} subreddits={subreddits} setSubreddits={setSubreddits}/>
    </div>
  );
}

export default App;
