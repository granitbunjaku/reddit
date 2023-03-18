import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router'
import { CircleLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { getSubreddit, joinSubreddit, updateAbout, updatePic } from '../slices/subredditSlice'

function Subreddit() {
  const {subreddit, isLoading} = useSelector(store => store.subreddit)
  const {user} = useSelector(store => store.user)
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {subreddit: subreddit_name} = useParams()

  useEffect(() => {
    dispatch(getSubreddit(subreddit_name))
  }, [])

  function handleButton() {
    if(Object.keys(user).length > 0) {
      subreddit.isModerator ? alert("You can't leave subreddit since you are the only moderator!") : dispatch(joinSubreddit(subreddit_name))
    } else {
      navigate('/login')
    }
  }

  function handleDescription(e) {
      e.preventDefault()
      setButtonVisibility(false);
  }

  function cancelHandler(e) {
      e.preventDefault();
      setButtonVisibility(true);
  }

  const changePic = (e) => {
      var formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("fileDest", e.target['id'])
      axios.post(`http://localhost:8000/api/update/subreddit/pic/${subreddit.data.id}`, formData, {
          headers: {
              "Authorization": `Bearer ${user.token}`,
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(res => {
          dispatch(updatePic({fileDest: e.target['id'], file:res.data}))
      })
  }

  function submitHandler(e) {
      e.preventDefault();
      axios.put(`http://localhost:8000/api/subreddits/${subreddit.data.id}`, {
          "about" : e.target.about.value
      }, {
          headers: {
              'Authorization': `Bearer ${user.token}`
          }
      })
      .then(res => {
          dispatch(updateAbout(res.data))
          setButtonVisibility(true)
      });
  }

  if (isLoading) {
    return <CircleLoader className="loading" color="#ff4500" />;
  }

  return (
    <div>
        <div className='subreddit--banner'>
          <div className='banner--image'>
            <img src={`http://localhost:8000/api/photos/${subreddit.data.cover_image}`} className="banner"/>
            {
              subreddit.isModerator == 1 && 

              <label className="subreddit--cover">
                  <input type="file" id="cover_image" className="cover" onChange={changePic}/>
                  <div></div>
              </label>
              
            }
          </div>

          <div className='subreddit--details'>
            <div className='subreddit--image'>
              <img src={`http://localhost:8000/api/photos/${subreddit.data.profile_image}`} />
              {
                subreddit.isModerator == 1 && 

                <label className="subreddit--pfp">
                    <input type="file" id="profile_image" className="pfp" onChange={changePic}/>
                    <div></div>
                </label>
                
              }
            </div>

            <div className='subreddit--text' style={{color: 'black'}}>
              <p className='subreddit--title'>{subreddit.data.name}</p>
              <p className='subreddit--name'>r/{subreddit.data.name}</p>
              <p className='posts'>Posts</p>
            </div>

              {!subreddit.isJoined &&
                <button className='join--buttons' onClick={handleButton} style={{backgroundColor: "blueviolet"}}>Join</button>
              }

              {subreddit.isJoined &&
                  <button className='join--buttons' style={{backgroundColor: "#B22222"}} onClick={handleButton}>Leave</button>
              }
          </div>

        </div>

        <div className="subreddit--container">
          <div className='all--content'>
            
            {/* <SubredditPosts loading={loading} setLoading={setLoading} subredditPosts={subredditPosts}/> */}

            <div className='subreddit--aboutsection'>
              <div className='about--text'><p>About Community</p></div>

              <div className='subreddit--description' style={{color: 'black'}}>
                  {subreddit.isModerator == 1 &&
                      <form onSubmit={submitHandler}>
                          <button onClick={handleDescription} className="description--button" style={{display: buttonVisibility ? 'block' : 'none'}}> {subreddit.data.about ? "Update Description" : "Add Description"}</button>
                          <div className="description--form" style={{display: buttonVisibility ? 'none' : 'block'}}>
                              <textarea className="description--input" name="about" rows="4" cols="50" maxLength="255" placeholder={subreddit.data.about ? subreddit.data.about : "Tell us about your community"}></textarea>
                              <button className="save--description" type="submit">Save</button>
                              <button className="cancel--description" onClick={cancelHandler}>Cancel</button>
                          </div>
                      </form>
                  }
                  <p>{subreddit.data.about}</p>
                  <p><i class="ph-cake"></i> Created {subreddit.data.date_created}</p>

                <div className='subreddit--members' style={{color: 'black'}}>
                    <p><span>{subreddit.data.members}</span> <span>Members</span></p>
                    <p><span>{subreddit.data.members}</span> <span>Online Users</span></p>
                </div>
              </div>

            </div>
          </div>

        </div>
    </div>
  )
}

export default Subreddit