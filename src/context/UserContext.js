import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners';

export const uContext = React.createContext({});

export const UserContext = (props) => {
    const [user, setUser] = useState({isLoggedin: false, data: {}});
    const [loading, setLoading] = useState(true);
    const [subreddits, setSubreddits] = useState([]);
    const token = localStorage.getItem('jwt');
    
    useEffect(() => {
        if(token) {
            axios.get(`http://localhost:8000/api/user`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
            .then(res => {
                setUser({data: res.data, isLoggedin: true});
            })
        }
        setLoading(false);
    }, [])

    useEffect(() => {
        if(user.isLoggedin) {
            axios.get("http://localhost:8000/api/subreddit", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            }).then((resp) =>
            setSubreddits(() =>
                resp.data.map((x) => ({
                    id: x.id,
                    name: x.name,
                    members: x.members,
                    icon: x.profile_image
                }))
            )
            );
        }
    }, [user]);

    if (loading) {
        return <CircleLoader className="loading" color="#ff4500" />;
    }

    return (
        <uContext.Provider value={{user, setUser, token, subreddits}}>
            {props.children}
        </uContext.Provider>
    )
}
