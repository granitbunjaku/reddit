import axios from "axios";
import { getUser } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Login() {
    const dispatch = useDispatch();
    
    function loginHandle(e) {
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            email: e.target.email.value,
            password: e.target.password.value
        })
        .then(res => {
            localStorage.setItem('jwt', res.data);
            dispatch(getUser())
        })
    }

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
}