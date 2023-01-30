import axios from "axios"
import { useContext} from "react";
import { redirect } from "react-router";
import { uContext } from "../context/UserContext";
import { useNavigate} from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();

    const {user, setUser} = useContext(uContext);
    
    function loginHandle(e) {
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            email: e.target.email.value,
            password: e.target.password.value
        })
        .then(res => {
            localStorage.setItem('jwt', res.data);
            setUser({isLoggedin: true, data: res.data})
        })
    }

    function controllUser() {
        if(!user.isLoggedin) {
            return (
                <>
                    <form method="post" action="#" className="loginform" onSubmit={loginHandle}>
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email" id="email"/>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password"/>
                        <button type="submit">Login</button>
                    </form>
                </>
            )
        } else {
            window.location.href = "http://localhost:3000/";
        }
    }
    
    return (
        <>
            {controllUser()}
        </>
    )
}