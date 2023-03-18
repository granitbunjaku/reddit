import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'

const VerifiedEmail = () => {
    const {id} = useParams();
    axios.put(`http://localhost:8000/api/verifyemail/${id}`)
    .then(res => console.log("verified"))
    return (
        <div className="email--verified">
            <img src="https://cdn-icons-png.flaticon.com/512/2188/2188859.png" width="150px" height="150px"/>
            <h2>Your email was successfully verified!</h2>
            <h3>You can login now!</h3>
            <a className='second--login--button' href='/login'>Login</a>
        </div>
    )
}

export default VerifiedEmail