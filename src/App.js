import React, { useState } from 'react'
import './App.css';
import Homepage from "./pages/Homepage"

function App() {
  const [searchActive, setSearchActive] = useState(false)

  function changeSearchActivew() {
    setSearchActive(false)
  }

  return (
    <div className="App" onClick={changeSearchActivew}>
      <Homepage searchActive={searchActive} setSearchActive={setSearchActive}/>
    </div>
  );
}

export default App;
