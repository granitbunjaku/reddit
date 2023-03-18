import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { CircleLoader } from "react-spinners";
import { getPost } from "../slices/postSlice";
import Post from "../components/Post"

function PostOverview() {
  const {post, postLoading} = useSelector(store => store.post)
  const dispatch = useDispatch()
  // const [comments, setComments] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id))
  },[])

  if (postLoading) {
    return <CircleLoader className="loading" color="#ff4500" />;
  }

  return (
    <>
          <div className="show--single--post">
            <Post post={post}/>
          </div>

          {/* <div className="comments">
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
          </div> */}
    </>
  );
}

export default PostOverview;
