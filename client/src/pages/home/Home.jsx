import { useEffect, useState } from "react"
import axios from "axios"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import { useLocation } from "react-router-dom"

function Home() {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })


    useEffect(() => {
        const fetchPosts = async () =>{
            const res = await axiosInstance.get("/posts" +search)
            setPosts(res.data)
        }
        fetchPosts();
    }, [search])
    return ( 
<>
        {/* <Header /> */}
        <div className="home">
            <Posts posts={posts} />
            <Sidebar />
        
        </div>
        </>
    )
}

export default Home
