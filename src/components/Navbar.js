import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { uContext } from "../context/UserContext";
import DefaultIcon from "../helpers/DefaultIcon";
import nFormatter from "../helpers/formatter";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useNavigate } from "react-router-dom";

function Navbar({ searchActive, setSearchActive}) {
  const [searchResults, setSearchResults] = useState([]);
  const {user, setUser, token, subreddits} = useContext(uContext);
  const [isShown, setisShown] = useState(false);
  const [communityClicked, setCommunityClicked] = useState(false);
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if(user.isLoggedin) {
      axios.get(`http://localhost:8000/api/categories`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        setCategories(res.data);
      });
    }
  }, [user])

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

  function handleLogout() {
    axios.post(`http://localhost:8000/api/logout`,{}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      localStorage.clear();
      setUser({isLoggedin: false, data: {}});
    });
  }

  const createSubreddit = (e) => {
    e.preventDefault();
    const selected = [...e.target.categories.selectedOptions].map(option => option.value);
    axios.post(`http://localhost:8000/api/subreddit`, {
      "name" : e.target.name.value,
      "type" : e.target.type.value,
      "categories" : selected
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      navigate(`/r/${e.target.name.value}`);
      setCommunityClicked(false);
    });
  }

  communityClicked ? disableBodyScroll(document) : enableBodyScroll(document);

  function isLoggedIn() {
    if(!user.isLoggedin) {
      return (<div className="navbar--buttons">
        <Link to='/signup' className="signup">Sign Up</Link>
        <Link to='/login' className="login">Log In</Link>
        <i className="ph-user">
          <i className="ph-caret-down"></i>
        </i>
      </div>)
    } else {
      return (<div className="navbar--buttons">
        <i className="ph-plus" style={{fontSize: "23px"}}></i>
        <div className="loggedin--user" onClick={() => {setisShown(!isShown)}}>
          <img src={`http://localhost:8000/api/profilepic/${user.data.id}`} />
          <p>{user.data.name}</p>
          <i className="ph-caret-down"></i>
        </div>
        <div className="loggedin--infos" style={{display: isShown ? "block" : "none"}}>
          <div>
            <Link to={`profile/${user.data.id}`} style={{textDecoration: "none"}}><i className="ph-user-circle"></i> Profile</Link>
          </div>
          {/* <div>
            <i class="ph-circle"></i> Online Status
          </div> */}
          <div onClick={() => { setCommunityClicked(!communityClicked); setisShown(false)}} style={{cursor: "pointer"}}>
            <i className="ph-reddit-logo"></i> Create a Community
          </div>
          <div onClick={handleLogout} className="loggedin--logout">
            <i className="ph-sign-out"></i> Log out
          </div>
        </div>
      { communityClicked &&
      <div className="create--community--div" onClick={() => {setCommunityClicked(!communityClicked);}}>
        <form className="create--community" method="POST" action="#" onSubmit={createSubreddit} onClick={(e) => e.stopPropagation()}>
          <div className="bar--title">
            <p>Create a community</p>
            <i class="ph-x"></i>
            <br></br>
          </div>
          <div className="bar--infos">
            <p>Name</p>
            <small>Community names including capitalization cannot be changed.</small>
            <br></br>
            <span>r/</span>
            <input type="text" name="name"></input>
            <small>21 Characters remaining</small>
          </div>
          <div className="community--type">
            <label for="type">Community Type</label>

            <select id="type">
              <option value="public">Public</option>
              <option value="restricted">Restricted</option>
            </select>
          </div>
          <div className="community--type">
            <label for="categories">Select Categories</label>

            <select id="categories" multiple>
              {categories.map(category => {
                return (<option value={category.id} key={category.id}>{category.name.charAt(0).toUpperCase()+category.name.substring(1)}</option>);
              })}
            </select>
          </div>
          <div className="community--buttons">
            <button>Cancel</button>
            <button type="submit">Create Community</button>
          </div>
        </form>
      </div>
      }

      </div>)
    }
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
        {isLoggedIn()}
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
