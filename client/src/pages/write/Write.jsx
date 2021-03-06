import axios from "axios"
import { useContext, useState } from "react"
import {Context} from "../../context/Contex"
import "./write.css"

function Write() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const {user} = useContext(Context)
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })
    
    const handleSubmit = async e =>{
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        }
        if(file){
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            newPost.photo = fileName;
            try {
               await axiosInstance.post("/upload", data) 
            } catch (e) {
                console.log(e.message)
            }
        }
        try {
            const res = await axiosInstance.post("/posts", newPost)
            window.location.replace("/post/" + res.data._id)
        } catch (e) {
            console.log(e.message)
        }
    }
    return (
        <div className="write">
            {file && 
            <img 
                className="writeImg" 
                src={URL.createObjectURL(file)} alt="" />
            }
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input 
                        type="file" 
                        id="fileInput" 
                        style={{display:"none"}}
                        onChange={e =>setFile(e.target.files[0])}
                        />
                    <input 
                        className="writeInput" 
                        type="text" 
                        placeholder="Title" 
                        autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                        />
                </div>
                <div className="writeFormGroup">
                    <textarea 
                        className="writeInput 
                        writeText" 
                        placeholder="Tell your story..." 
                        type="text"
                        onChange={e => setDesc(e.target.value)}
                        />
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}

export default Write
