import axios from "axios"
import { useContext, useRef } from "react"
import {Link} from "react-router-dom"
import { Context } from "../../context/Contex"
import "./login.css"

function Login() {

    const userRef = useRef()
    const passwordRef = useRef()
    const {user, dispatch, isFetching} = useContext(Context)
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })

    const handleSubmit = async (e) =>{
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axiosInstance.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            })
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        } catch (e) {
            dispatch({type: "LOGIN_FAILURE"})
        }
    }

    console.log(isFetching)
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    className="loginInput" 
                    type="text" 
                    placeholder="Type your username..."
                    ref={userRef}
                    />
                <label>Password</label>
                <input 
                    className="loginInput" 
                    type="password" 
                    placeholder="Enter your password..."
                    ref={passwordRef}
                    />
            <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">
            <Link className="link" to="/register">Register</Link>
            </button>
            
        </div>
    )
}

export default Login
