import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { update } from "../slices/userSlice";

export default function Profile() {
    const {user} = useSelector(store => store.user)
    const {id} = useParams()
    const dispatch = useDispatch()
    const [userToRead, setUserToRead] = useState(null)

    useEffect(() => {
        if(user.id != id) {
            axios.get(`http://localhost:8000/api/user/${id}`)
            .then(res => setUserToRead(res.data))
            return
        }
        setUserToRead(user)
    }, [id])
    
    
    if (!userToRead) {
        return <CircleLoader className="loading" color="#ff4500" />;
    }
    
    const changePic = (e) => {
        var formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("fileDest", e.target['id'])
        axios.post(`http://localhost:8000/api/update/profile/pic/${id}`, formData, {
            headers: {
                "Authorization": `Bearer ${userToRead.token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            dispatch(update({fileDest: e.target['id'], file:res.data}))
        })
    }

    return (
        <div className="all--profile--content">
            <div className="post--overview"></div>
            <div className="profile">
                <div className="profile--card">
                    <div className="upper--part">
                        <img src={`http://localhost:8000/api/photos/${userToRead.cover}`} className="cover--pic" />
                        <img src={`http://localhost:8000/api/photos/${userToRead.avatar}`} className="profile--pic" />
                        {user.id == id &&
                        <>
                            <label className="label--pfp">
                                <input type="file" id="avatar" className="pfp" onChange={changePic}/>
                                <div></div>
                            </label>
                            <label className="label--cover">
                                <input type="file" id="cover" className="cover" onChange={changePic}/>
                                <div></div>
                            </label>
                        </>
                        }
                    </div>
                    <div className="other--part">
                        <div><small>u/{userToRead.name}</small></div>
                        <div className="profile--infos">
                            <span className="karma"><p><b>Karma</b></p> <small>0</small></span>
                            <span className="cake"><p><b>Cake Day</b></p> <small>{userToRead.created_at.split('T')[0]}</small></span>
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