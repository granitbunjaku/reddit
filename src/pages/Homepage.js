import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { CircleLoader } from "react-spinners";
import Post from "../components/Post";
import TopSubreddits from "../components/Topsubreddits";

function Homepage() {
  const {subreddits, isLoading} = useSelector(store => store.subreddits)
  const {posts, postsLoading} = useSelector(store => store.posts)

  if (isLoading || postsLoading) {
    return <CircleLoader className="loading" color="#ff4500" />;
  }

  return (
    <div>
      <div className="homepage--container">
        {/* <Trending /> */}
        <div className="homepage--content">
          <div className="homepage--body" >
            {posts.map((post) => (
              <Post key={post.data.id} post={post} />
            ))}
          </div>
          <TopSubreddits subreddits={subreddits}/>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
