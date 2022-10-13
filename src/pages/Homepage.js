import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import Trending from '../components/Trending'

function Homepage({searchActive, setSearchActive}) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.all([
        axios.get("https://www.reddit.com/r/climbing/top.json?limit=2&t=24h"),
        axios.get("https://www.reddit.com/r/Naruto/top.json?limit=2&t=24h"),
        axios.get("https://www.reddit.com/r/eminem/top.json?limit=2&t=24h")
    ])
    .then(resp =>  {
      setPosts(resp.map(x => x.data.data.children.map(y => ({upvotes: y.data.ups, author_fullname: y.data.author_fullname, title: y.data.title, subreddit: y.data.subreddit_name_prefixed, num_comments: y.data.num_comments, image: y.data.url_overridden_by_dest, is_video: y.data.is_video, video_url: y.data.secure_media?.reddit_video?.fallback_url}))).flat())
    })
  }, [])

  return (
    <div>
        <Navbar searchActive={searchActive} setSearchActive={setSearchActive}/>
        <div className='homepage--body'>
          <Trending />
          {posts.map(post => <Post post={post}/>)}
        </div>
    </div>
  )
}

export default Homepage