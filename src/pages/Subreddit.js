import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SubredditPosts from '../components/SubredditPosts'
import convertToDate from '../helpers/convertToDate'
import DefaultIcon from '../helpers/DefaultIcon'
import formatter from '../helpers/formatter'

function Subreddit() {
  const [subredditData, setSubredditData] = useState({})

  const {subreddit} = useParams()
  
  useEffect(() => {
    axios.get(`https://www.reddit.com/r/${subreddit}/about/.json`)
    .then(res => setSubredditData(() => {
      const data = res.data.data;
      return {
        subreddit_title : data.title,
        subreddit_name : data.display_name_prefixed,
        subscribers : formatter(data.subscribers),
        online_users : formatter(data.active_user_count),
        date_created : convertToDate(data.created),
        subreddit_description : data.public_description,
        font_color : "white",
        theme_color : data.key_color ? data.key_color : "white",
        banner : data.mobile_banner_image,
        subreddit_icon : data.icon_img ? data.icon_img : DefaultIcon
      }
    }))
  }, [subreddit])

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

            <button className='join--buttons' style={{backgroundColor: subredditData.theme_color}}>Join</button>
          </div>

        </div>

        <div  style={{backgroundColor: subredditData.theme_color}} className="subreddit--container">
          <div className='all--content'>
            
            <SubredditPosts />

            <div className='subreddit--aboutsection'>
              <div className='about--text' style={{backgroundColor: subredditData.theme_color}}><p>About Community</p></div>
              
              <div className='subreddit--description' style={{color: 'black'}}>
                  <p>{subredditData.subreddit_description}</p>
                  <p><i class="ph-cake"></i> Created {subredditData.date_created}</p>

                <div className='subreddit--members' style={{color: 'black'}}>
                    <p><span>{subredditData.subscribers}</span> <span>Members</span></p>
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