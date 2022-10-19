import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { CircleLoader } from 'react-spinners'
import SubredditPosts from '../components/SubredditPosts'
import convertToDate from '../helpers/convertToDate'
import DefaultIcon from '../helpers/DefaultIcon'
import formatter from '../helpers/formatter'

function Subreddit() {
  const [subredditData, setSubredditData] = useState({})
  const [subredditPosts, setSubredditPosts] = useState([])
  const [loading, setLoading] = useState(false);

  const {subreddit} = useParams()
  
  useEffect(() => {
    setLoading(true)
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
        theme_color : data.key_color ? data.key_color : "#0077d3",
        banner : data.mobile_banner_image,
        subreddit_icon : data.icon_img ? data.icon_img : DefaultIcon
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
  }, [subreddit])

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

            <button className='join--buttons' style={{backgroundColor: subredditData.theme_color}}>Join</button>
          </div>

        </div>

        <div  style={{backgroundColor: subredditData.theme_color}} className="subreddit--container">
          <div className='all--content'>
            
            <SubredditPosts loading={loading} setLoading={setLoading} subredditPosts={subredditPosts}/>

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