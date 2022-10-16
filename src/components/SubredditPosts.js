import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import formatter from '../helpers/formatter'
import Post from './Post'

function SubredditPosts() {

    const [subredditPosts, setSubredditPosts] = useState([])

    const {subreddit} = useParams()

    useEffect(() => {
        axios.get(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=10`)
        .then(res => setSubredditPosts(
                res.data.data.children.map((y) => ({
                  upvotes: formatter(y.data.ups),
                  author_fullname: y.data.author,
                  title: y.data.title,
                  subreddit: y.data.subreddit_name_prefixed,
                  num_comments: formatter(y.data.num_comments),
                  image: y.data.is_gallery ? y.data.thumbnail : y.data.url_overridden_by_dest,
                  is_video: y.data.is_video,
                  video_url: y.data.secure_media?.reddit_video?.fallback_url,
                  post_code: y.data.name
                }))
              )
            )
    }, [])

  return (
    <div className='subreddit--container'>
        <div className='subreddit--posts'>
            {subredditPosts.map((subredditPost) => (
            <Post key={subredditPost.title} post={subredditPost} />
            ))}
        </div>
    </div>
  )
}

export default SubredditPosts