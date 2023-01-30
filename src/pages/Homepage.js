import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { CircleLoader } from "react-spinners";
import Post from "../components/Post";
import TopSubreddits from "../components/Topsubreddits";
import Trending from "../components/Trending";
import { uContext } from "../context/UserContext";
import formatter from "../helpers/formatter";

function Homepage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {subreddits} = useContext(uContext);

  useEffect(() => {
    axios
      .all([
        axios.get("https://www.reddit.com/r/climbing/top.json?limit=2&t=24h"),
        axios.get("https://www.reddit.com/r/Naruto/top.json?limit=2&t=24h"),
        axios.get("https://www.reddit.com/r/eminem/top.json?limit=2&t=24h"),
      ])
      .then((resp) => {
        setPosts(
          resp
            .map((x) =>
              x.data.data.children.map((y) => ({
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
            .flat()
        );
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <CircleLoader className="loading" color="#ff4500" />;
  }

  return (
    <div>
      <div className="homepage--container">
        <Trending />
        <div className="homepage--content">
          <div className="homepage--body" >
            {posts.map((post) => (
              <Post key={post.title} post={post} />
            ))}
          </div>
          <TopSubreddits
            subreddits={subreddits}
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
