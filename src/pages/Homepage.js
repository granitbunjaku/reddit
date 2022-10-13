import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CircleLoader } from 'react-spinners'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import TopSubreddits from '../components/Topsubreddits'
import Trending from '../components/Trending'


function Homepage({searchActive, setSearchActive, subreddits, setSubreddits}) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.all([
        axios.get("https://www.reddit.com/r/climbing/top.json?limit=2&t=24h"),
        axios.get("https://www.reddit.com/r/Naruto/top.json?limit=2&t=24h"),
        axios.get("https://www.reddit.com/r/eminem/top.json?limit=2&t=24h")
    ])
    .then(resp =>  {
      setPosts(resp.map(x => x.data.data.children.map(y => ({upvotes: y.data.ups, author_fullname: y.data.author_fullname, title: y.data.title, subreddit: y.data.subreddit_name_prefixed, num_comments: y.data.num_comments, image: y.data.url_overridden_by_dest, is_video: y.data.is_video, video_url: y.data.secure_media?.reddit_video?.fallback_url}))).flat())
    }).finally(() => setLoading(false))
  }, [])

  if(loading) {
    return <CircleLoader className='loading' color="#ff4500" />
  }

  return (
    <div>
        <Navbar searchActive={searchActive} setSearchActive={setSearchActive} subreddits={subreddits} setSubreddits={setSubreddits}/>
        <div className='homepage--container'>
          <Trending />
          <div className='homepage--content'>
            <div className='homepage--body'>
              {posts.map(post => <Post key={post.title} post={post}/>)}
            </div>
            <TopSubreddits subreddits={subreddits} setSubreddits={setSubreddits} />
          </div>
        </div>
    </div>
  )
}

export default Homepage