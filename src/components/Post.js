import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { vote } from "../slices/postSlice";
 
function Post({ post }) {
  const [copy, setCopy] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const dispatch = useDispatch()

  const {id} = useParams()

  function handleShare(e) {
    e.preventDefault();
    setCopy(!copy);
  }

  useEffect(() => {
    if(post.isVoted == "upvote") {
      setUpvote(true)
    } else if(post.isVoted == "downvote") {
      setDownvote(true)
    }
  }, [])

  const votePost = (type) => {
    if(id) {
      dispatch(vote({name: "post", type: type, id: id}))
    } else {
      dispatch(vote({name: "post", type: type, id: post.data.id}))
    }

    if(type=="upvote") {
      setUpvote(!upvote)
      setDownvote(false)
    } else {
      setUpvote(false)
      setDownvote(!downvote)
    }
  }

  return (
      <div className="post">
        <div className="upvotes">
          <i className="ph-arrow-fat-up upvote--arrow" onClick={() => votePost("upvote")} style={{color: `${upvote ? "orange" : "grey"}`}}></i>
          <p className="post--upvotes">{post.votes}</p>
          <i className="ph-arrow-fat-up upvote--arrow arrow2" onClick={() => votePost("downvote")} style={{color: `${downvote ? "blue" : "grey"}`}}></i>
        </div>

        <div className="post--content">
          <div className="top--section">
            <span className="post--details">
              <Link to={`/r/${post.subreddit}`}><p>{post.subreddit}</p></Link> &bull;
              <Link to={`/user/${post.data.user_id}`}><p>Posted by u/{post.user_name}</p></Link> &bull;
            </span>
            <p className="post--title">{post.data.title}</p>
          </div>

          {/* {post.is_video ? (
            <iframe src={post.video_url} width="100%" height="350px" />
          ) : (
            <img src={post.image} className="post--image" />
          )} */}

          <div className="post--comments">
            <i className="ph-chat-centered"></i>
            <Link to={`/post/r/${post.subreddit}/comments/${post.data.id}/${post.data.title}`}><span className="comment-num">{post.num_comments} comments </span></Link>

            <div onClick={handleShare} className="share">
              <i className="ph-share" style={{ marginLeft: "10px" }}></i>
              <span className="share--button"> Share</span>
            </div>
          </div>
          {copy && (
            <div
              className="copy"
              onClick={(e) => {
                e.preventDefault();
                handleShare(e);
                navigator.clipboard.writeText(
                  `http://localhost:3000/post/${post.subreddit}/comments/${
                    post.post_code.split("_")[1]
                  }/${post.title.replace(/ /g, "_")}`
                );
              }}
            >
              <p className="copy--text">
                <i className="ph-link"></i> Copy
              </p>
            </div>
          )}
        </div>
      </div>
  );
}

export default Post;
