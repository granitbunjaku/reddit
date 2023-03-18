import React from "react";

function TopSubreddits({subreddits}) {
  return (
    <div className="top--subreddits">
      <img
        className="banner"
        src="https://styles.redditmedia.com/t5_3gcwj/styles/bannerBackgroundImage_xb79tkanji141.jpg?format=pjpg&s=f3b989950120f6aef4fd1a76cebadfdd526035fc"
      />
      {subreddits.slice(0, 5)
        .map((s, i) => (
          <div key={i} className="top--subreddit">
            <div className="top--details">
              <p>{++i}</p>
              <i className="ph-caret-up" style={{ color: "green" }}></i>
              <img src={`http://localhost:8000/api/photos/${s.data.profile_image}`} />
              <p>r/{s.data.name}</p>
            </div>

            <div className="join--section">
              <button className="join--button">Join</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TopSubreddits;
