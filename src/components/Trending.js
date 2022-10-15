import axios from "axios";
import React, { useEffect, useState } from "react";

function Trending() {
  const [trending, setTreding] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get("https://www.reddit.com/r/art/top.json?limit=1&t=24h"),
        axios.get("https://www.reddit.com/r/memes/top.json?limit=1&t=24h"),
        axios.get(
          "https://www.reddit.com/r/PoliticalHumor/top.json?limit=1&t=24h"
        ),
        axios.get("https://www.reddit.com/r/drawing/top.json?limit=1&t=24h"),
      ])
      .then((resp) => {
        setTreding(
          resp.map((x) => ({
            name: x.data.data.children[0].data.title,
            subreddit: x.data.data.children[0].data.subreddit,
            image: x.data.data.children[0].data.url_overridden_by_dest,
          }))
        );
      });
  }, []);

  function displayTrending() {
    return trending.map((x) => (
      <div key={x.name}>
        {
          <div
            className="trending"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)),  url("${x.image}")`,
            }}
          >
            <p>{x.name}</p> <p>{x.subreddit}</p>
          </div>
        }
      </div>
    ));
  }

  return (
    <div className="trending--posts">
      {trending.length > 0 && displayTrending()}
    </div>
  );
}

export default Trending;
