import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultIcon from "../helpers/DefaultIcon";
import nFormatter from "../helpers/formatter";

function Navbar({ searchActive, setSearchActive, subreddits, setSubreddits }) {
  const [searchResults, setSearchResults] = useState([]);

  function searchHandler(e) {
    let inputValue = e.target.value

    let results = subreddits.filter((subreddit) => subreddit.name.includes(inputValue));
    
    if(inputValue == ""){
      results = results.slice(0, 5)
    }

    setSearchResults(results);
  }

  function handleSearchActive(e) {
    e.stopPropagation();
    setSearchActive(true);
  }

  return (
    <>
      <div className="navbar">
        <div className="navbar--logo">
          <Link to='/'><img src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png" /></Link>
        </div>
        <div className="navbar--search">
          <i className="ph-magnifying-glass"></i>
          <input
            type="search"
            placeholder="Search Reddit"
            onKeyUp={searchHandler}
            onClick={handleSearchActive}
          />
        </div>
        <div className="navbar--buttons">
          <button className="signup" type="button">
            Sign Up
          </button>
          <button className="login" type="button">
            Log In
          </button>
          <i className="ph-user">
            <i className="ph-caret-down"></i>
          </i>
        </div>
      </div>

        {searchResults &&
          searchActive &&
          <div className="search--results">
            {
              searchResults.map((res) => {
                return (
                  <Link to={`r/${res.name}`}>
                    <div className="results">
                      {res.icon.length ? <img src={res.icon} /> : DefaultIcon}
                      <p key={res.name}>
                        <p>{res.name}</p>
                        <p>Community &bull; {nFormatter(res.members, 1)} members</p>
                      </p>
                    </div>
                  </Link>
                );
              })
            }
          </div>
          }
    </>
  );
}

export default Navbar;
