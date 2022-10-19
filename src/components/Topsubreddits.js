import React from "react";
import DefaultIcon from "../helpers/DefaultIcon";

function TopSubreddits({ subreddits }) {

  return (
    <div className="top--subreddits">
      <img
        className="banner"
        src="https://styles.redditmedia.com/t5_3gcwj/styles/bannerBackgroundImage_xb79tkanji141.jpg?format=pjpg&s=f3b989950120f6aef4fd1a76cebadfdd526035fc"
      />
      {subreddits
        .sort((a, b) => b.members - a.members)
        .slice(0, 5)
        .map((s, i) => (
          <div key={i} className="top--subreddit">
            <div className="top--details">
              <p>{++i}</p>
              <i className="ph-caret-up" style={{ color: "green" }}></i>
              {s.icon ? <img src={s.icon} /> : DefaultIcon}
              <p>r/{s.name}</p>
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
