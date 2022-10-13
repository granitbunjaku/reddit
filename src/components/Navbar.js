import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DefaultIcon from '../helpers/DefaultIcon'
import nFormatter from '../helpers/formatter'

function Navbar({searchActive, setSearchActive, subreddits, setSubreddits}) {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  function searchHandler(e) {
    setSearch(e.target.value)

    let results;

    results = subreddits.filter(subreddit => {
      if (subreddit.name.includes(search)) {
        return subreddit
      }
    })

    results && setSearchResults(results)

  }

  function handleSearchActive(e) {
    e.stopPropagation()
    setSearchActive(true)
  }

  return (
    <>
      <div className='navbar'>
        <div className='navbar--logo'>
          <img src='https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png' />
        </div>
        <div className='navbar--search'>
          <i className="ph-magnifying-glass"></i>
          <input type="search" placeholder='Search Reddit' onKeyUp={searchHandler} onClick={handleSearchActive}/>
        </div>
        <div className='navbar--buttons'>
          <button className='signup' type="button">Sign Up</button>
          <button className='login' type="button">Log In</button>
          <i className="ph-user"><i className="ph-caret-down"></i></i>
        </div>
      </div>

      <div className='search--results'>
        {searchResults && searchActive && searchResults.map(res => { return <div className='results'> {res.icon.length ? <img src={res.icon} /> : DefaultIcon} <p key={res.name}><p>{res.name}</p> <p>Community &bull; {nFormatter(res.members, 1)} members</p></p> </div> })}
      </div>
    </>
  )
}

export default Navbar;