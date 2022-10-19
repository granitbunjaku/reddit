import React from 'react'
import Post from './Post'

function SubredditPosts({subredditPosts}) {

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