import React, { useState } from "react";
import { Link } from "react-router-dom";

function Post({ post }) {
  const [copy, setCopy] = useState(false);

  function handleShare(e) {
    e.preventDefault();
    setCopy(!copy);
  }

  return (
    <Link to={`/post/${post.subreddit}/comments/${
      post.post_code.split("_")[1]
    }/${post.title.replace(/ /g, "_").replace(/\//g, "%")}`}>
      <div className="post">
        <div className="upvotes">
          <i className="ph-arrow-fat-up upvote--arrow"></i>
          <p className="post--upvotes">{post.upvotes}</p>
          <i className="ph-arrow-fat-up upvote--arrow arrow2"></i>
        </div>

        <div className="post--content">
          <div className="top--section">
            <span className="post--details">
              <p>{post.subreddit}</p> &bull;
              <p className="user">Posted by u/{post.author_fullname}</p>
            </span>
            <p className="post--title">{post.title}</p>
          </div>

          {post.is_video ? (
            <iframe src={post.video_url} width="100%" height="350px" />
          ) : (
            <img src={post.image} className="post--image" />
          )}

          <div className="post--comments">
            <i className="ph-chat-centered"></i>
            <span className="comment-num">{post.num_comments} comments </span>

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
    </Link>
  );
}

export default Post;
