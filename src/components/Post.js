import React from 'react'


function Post({post}) {
  return (
    <div className='post'>
        <div className='upvotes'>
          <i className="ph-arrow-fat-up upvote--arrow" ></i>
          <p className='post--upvotes'>{post.upvotes}</p>
          <i className="ph-arrow-fat-up upvote--arrow arrow2" ></i>
        </div>

        <div className='post--content'>
          <div className='top--section'>
            <span className='post--details'><p>{post.subreddit}</p> &bull; <p className='user'>Posted by u/{post.author_fullname}</p></span>
            <p className='post--title'>{post.title}</p>
          </div>

          {post.is_video ? <iframe src={post.video_url} width='100%' height='350px'/>: <img src={post.image} className='post--image'/>}

          <p className='post--comments'><i className="ph-chat-centered"></i> <span className='comment-num'>{post.num_comments} comments</span></p>
        </div>
    </div>
  )
}

export default Post