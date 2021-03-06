import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar"
import { useContext, useState } from "react"
import { Context } from "../../context/Contex"
import axios from "axios"

function Settings() {
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false)

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })

    const {user,dispatch} = useContext(Context)
    const PF = "http://localhost:5000/images/"
    

    const handleSubmit = async e =>{
        e.preventDefault();
        dispatch({type:"UPDATE_START"})
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if(file){
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            updatedUser.profilePic = fileName;
            try {
               await axiosInstance.post("/upload", data)
            } catch (e) {
                console.log(e.message)
            }
        }
        try {
            const res = await axiosInstance.put("/users/" + user._id, updatedUser)
            dispatch({type:"UPDATE_SUCCESS", payload: res.data})
            setSuccess(true)
        } catch (e) {
            console.log(e.message)
            dispatch({type:"UPDATE_FAILURE"})
        }
    }
    console.log(user.profilePic)
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">
                        Update Your Account
                    </span>
                    <span className="settingsDeleteTitle">
                        Delete Account
                    </span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                    <label htmlFor="fileInput">
                        <i className="settingsPPIcon far fa-user-circle"></i>
                    </label>
                    <input 
                        type="file" 
                        id="fileInput" 
                        style={{display: "none"}}
                        onChange={e => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
                    <label>Email </label>
                    <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && <span style={{color: 'teal', textAlign: 'center', marginTop: "20px"}}>Profile has been updated</span>}
                </form>
            </div>
            <Sidebar />

        </div>
    )
}

export default Settings
