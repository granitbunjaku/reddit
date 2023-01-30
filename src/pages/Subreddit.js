import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { CircleLoader } from 'react-spinners'
import SubredditPosts from '../components/SubredditPosts'
import convertToDate from '../helpers/convertToDate'
import DefaultIcon from '../helpers/DefaultIcon'
import formatter from '../helpers/formatter'
import {uContext} from "../context/UserContext";
import {Link} from "react-router-dom";

function Subreddit() {
  const [subredditData, setSubredditData] = useState({})
  const [subredditPosts, setSubredditPosts] = useState([])
  const [loading, setLoading] = useState(false);
  const {token} = useContext(uContext);
  const [isJoined, setIsJoined] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [members, setMembers] = useState();
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const [about, setAbout] = useState();

  const {subreddit} = useParams()

  useEffect(() => {
    setLoading(true);

    axios.get(`http://localhost:8000/api/subreddit/${subreddit}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => setSubredditData(() => {
      const data = res.data.data;
      setIsJoined(res.data.isJoined);
      setIsModerator(res.data.isModerator);
      const date_created = data.created_at.split('T');
      return {
        id : data.id,
        subreddit_title : data.name,
        subreddit_name : data.name,
        subscribers : setMembers(formatter(data.members)),
        online_users : formatter(data.members),
        date_created : date_created[0],
        subreddit_description : setAbout(data.about),
        font_color : "white",
        theme_color : data.key_color ? data.key_color : "#0077d3",
        banner : data.cover_image,
        subreddit_icon : data.profile_image
      }
    }))
    .then(() => {
      axios.get(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=26`)
      .then(res => setSubredditPosts(
              res.data.data.children.map((y) => ({
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
          ).finally(() => setLoading(false))
  })
  },[subreddit]);

  function handleButton() {
      axios.post(`http://localhost:8000/api/subreddit/join/${subreddit}`, {}, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then(data => {
              if(isJoined) {
                  setMembers(members-1)
              } else {
                  setMembers(members+1)
              }
              setIsJoined(!isJoined)
          })
          .catch(e => alert(e.response.data));
  }

  function handleDescription(e) {
      e.preventDefault()
      setButtonVisibility(false);
  }

  function cancelHandler(e) {
      e.preventDefault();
      setButtonVisibility(true);
  }

  function submitHandler(e) {
      e.preventDefault();
      axios.put(`http://localhost:8000/api/subreddit/${subredditData.id}`, {
          "about" : e.target.about.value
      }, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then(res => {
              setAbout(res.data)
              setButtonVisibility(true)
          });
  }

  if (loading) {
    return <CircleLoader className="loading" color="#ff4500" />;
  }

  return (
    <div style={{color: subredditData.font_color}}>
        <div className='subreddit--banner'>
          <div className='banner--image'>
            <div className='banner' style={{background: subredditData.banner ? `url(${subredditData.banner})` : subredditData.theme_color}}></div>
          </div>

          <div className='subreddit--details'>
            <div className='subreddit--image'>
              {subredditData.subreddit_icon?.length ? <img src={subredditData.subreddit_icon} /> : DefaultIcon}
            </div>

            <div className='subreddit--text' style={{color: 'black'}}>
              <p className='subreddit--title'>{subredditData.subreddit_title}</p>
              <p className='subreddit--name'>{subredditData.subreddit_name}</p>
              <p className='posts'>Posts</p>
            </div>

              {!isJoined &&
                <button className='join--buttons' style={{backgroundColor: subredditData.theme_color}} onClick={handleButton}>Join</button>
              }

              {isJoined &&
                  <button className='join--buttons' style={{backgroundColor: "#B22222"}} onClick={handleButton}>Leave</button>
              }
          </div>

        </div>

        <div  style={{backgroundColor: subredditData.theme_color}} className="subreddit--container">
          <div className='all--content'>
            
            <SubredditPosts loading={loading} setLoading={setLoading} subredditPosts={subredditPosts}/>

            <div className='subreddit--aboutsection'>
              <div className='about--text' style={{backgroundColor: subredditData.theme_color}}><p>About Community</p></div>

              <div className='subreddit--description' style={{color: 'black'}}>
                  {!subredditData.subreddit_description && isModerator == 1 &&
                      <form onSubmit={submitHandler}>
                          <button onClick={handleDescription} className="description--button" style={{display: buttonVisibility ? 'block' : 'none'}}> Add Description</button>
                          <div className="description--form" style={{display: buttonVisibility ? 'none' : 'block'}}>
                              <textarea className="description--input" name="about" rows="4" cols="50" maxLength="255" placeholder={about ? about : "Tell us about your community"}></textarea>
                              <button className="save--description" type="submit">Save</button>
                              <button className="cancel--description" onClick={cancelHandler}>Cancel</button>
                          </div>
                      </form>
                  }
                  <p>{about}</p>
                  <p><i class="ph-cake"></i> Created {subredditData.date_created}</p>

                <div className='subreddit--members' style={{color: 'black'}}>
                    <p><span>{members}</span> <span>Members</span></p>
                    <p><span>{subredditData.online_users}</span> <span>Online Users</span></p>
                </div>
              </div>

            </div>
          </div>

        </div>
    </div>
  )
}

export default Subreddit