import axios from "axios"
import React from "react";
import {useNavigate} from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    function registerHandle(e) {
        e.preventDefault();

        var formData = new FormData();
        formData.append("name", e.target.name.value);
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value);
        formData.append("gender", e.target.gender.value);
        formData.append("avatar", e.target.avatar.files[0]);
        axios.post('http://localhost:8000/api/register', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            navigate('/verifyemail');
        })
    }

    return (
        <div>
            <form method="post" action="#" className="loginform" onSubmit={registerHandle} encType="multipart/form-data">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name"/>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email"/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"/>
                <label htmlFor="gender">Gender:</label>
                <select id="gender">
                    <option value="M">M</option>
                    <option value="F">F</option>
                </select>
                <label htmlFor="avatar" className="avatarLabel">
                    <input type="file" name="avatar" id="avatar" className="avatarInput"/>
                    Upload Avatar
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}