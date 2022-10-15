import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function PostOverview() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  let { subreddit, id, title } = useParams();

  function reduce(array) {
    return array.length > 1 ? array.reduce((a,b) => a+b) : 0
  }

  useEffect(() => {
    axios
      .get(
        `https://www.reddit.com/r/${subreddit}/comments/${id}/${title}/.json`
      )
      .then((res) => {
        const postRes = res.data[0].data.children[0].data;
        setPost({
          subreddit: postRes.subreddit,
          author: postRes.author,
          title: postRes.title,
          upvotes: postRes.ups,
          image: postRes.url_overridden_by_dest,
          is_video: postRes.is_video,
          video_url: postRes.is_video
            ? postRes.secure_media.reddit_video.fallback_url
            : "",
        });

        const commentsRes = res.data[1].data.children;

        setComments(() =>
          commentsRes.map((comment) => ({
            comment_author: comment.data.author,
            comment: comment.data.body,
            comment_upvotes: comment.data.ups,
            replies: comment.data.replies,
            reply_upvotes: comment.data.replies,
          }))
        );
      });
  }, []);

  return (
    <>
      <div className="center">
        <div className="whole--post">
          <div className="container">
            <div className="post--overview">
              <div className="upvotes2">
                <i className="ph-arrow-fat-up upvote--arrow"></i>
                <p className="post--upvotes">{post.upvotes}</p>
                <i className="ph-arrow-fat-up upvote--arrow arrow2"></i>
              </div>

              <div className="post--content2">
                <div className="top--section">
                  <span className="post--details">
                    <p>{post.subreddit}</p> &bull;
                    <p className="user">Posted by u/{post.author}</p>
                  </span>
                  <p className="post--title">{post.title}</p>
                </div>

                {post.is_video ? (
                  <iframe src={post.video_url} width="100%" height="350px" />
                ) : (
                  <img src={post.image} className="post--image" />
                )}

                <p className="post--comments">
                  <i className="ph-chat-centered"></i>
                  <span className="comment-num">{comments.length + reduce(comments.map(comment => comment.replies ? comment.replies.data.children.length : 0))} comments</span>
                </p>
              </div>
            </div>
          </div>

          <div className="comments">
            {comments &&
              comments.map((comment) => {
                return (
                  <div className="comment" key={comment.comment}>
                    <p className="comment--author">{comment.comment_author}</p>
                    <p className="comment--content">{comment.comment}</p>
                    <p className="comment--upvotes">
                      <i className="ph-arrow-fat-up upvote--arrow"></i>
                      {comment.comment_upvotes}
                      <i className="ph-arrow-fat-up upvote--arrow arrow2"></i>
                    </p>
                    <div className="replies">
                      {comment.replies &&
                        comment.replies.data.children.map((x, i) => (
                          <div key={i}>
                            <p className="reply--author" key={x.data.author}>
                              {x.data.author}
                            </p>
                            <p className="reply--content" key={x.data.body}>
                              {x.data.body}
                            </p>
                            <p className="reply--upvotes">
                              <i className="ph-arrow-fat-up upvote--arrow"></i>
                              {x.data.ups}
                              <i className="ph-arrow-fat-up upvote--arrow arrow2"></i>
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostOverview;
