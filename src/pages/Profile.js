import {useContext} from "react";
import {uContext} from "../context/UserContext";

export default function Profile() {
    const {user} = useContext(uContext);

    return (
        <div className="all--profile--content">
            <div className="post--overview"></div>
            <div className="profile">
                <div className="profile--card">
                    <div className="upper--part">
                        <div className="profile--pic"></div>
                        <label className="label--pfp">
                            <input type="file" id="pfp" className="pfp"/>
                            <div></div>
                        </label>
                        <label className="label--cover">
                            <input type="file" id="cover" className="cover"/>
                            <div></div>
                        </label>
                    </div>
                    <div className="other--part">
                        <div><small>u/{user.data.name}</small></div>
                        <div className="profile--infos">
                            <span className="karma"><p><b>Karma</b></p> <small>0</small></span>
                            <span className="cake"><p><b>Cake Day</b></p> <small>{user.data.created_at.split('T')[0]}</small></span>
                        </div>
                        <button className="new--post" type="submit">New Post</button>
                    </div>
                </div>

                <div className="moderator--infos">
                    <p><b>You're a moderator of these communities</b></p>
                    <div>
                        <div>
                            <img src="" alt="pic" />
                            Subreddit
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}