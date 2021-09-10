import axios from "axios"
import { useState } from "react"
import {Link} from "react-router-dom"
import "./register.css"

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })

    const handleSubmit =async e =>{
        e.preventDefault();
        setError(false)   
        try {
            const res = await axiosInstance.post("/auth/register", {
                username,
                email,
                password
            })
            res.data && window.location.replace("/login")
        } catch (e) {
            setError(true)            
        }
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input 
                    className="registerInput" 
                    type="text" 
                    placeholder="Type your username..."
                    onChange={e => setUsername(e.target.value)}
                    />
                <label>Email</label>
                <input 
                    className="registerInput" 
                    type="text" 
                    placeholder="Type your email..."
                    onChange={e => setEmail(e.target.value)}
                    />
                <label>Password</label>
                <input 
                    className="registerInput" 
                    type="password" 
                    placeholder="Enter your password..."
                    onChange={e => setPassword(e.target.value)}
                    />
            <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
            <Link className="link" to="/login">Login</Link>
            </button>
        {error && <span style={{color: "white", marginTop: "10px"}}>Something went wrong</span>}
        </div>
    )
}

export default Register
