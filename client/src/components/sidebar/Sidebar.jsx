import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./sidebar.css"

function Sidebar() {
    const [cats, setCats] = useState([])

    useEffect(() => {
        const getCats = async () =>{
            const res = await axios.get("/categories")
            setCats(res.data)
        }
        getCats();
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/Osamu_Dazai.jpg" alt="" />
                <p>Lorem ipsum dolor sis amet consectur adisipcing elit. Volupte qui necessitatibus nostrum illum reprehendit, libero eligerndi expedita quis laudantium quia saepe.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map(c => (
                        <Link to={`/?cat=${c.name}`} className="link">
                        <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                        
                </ul>
            </div>
            <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
            </div>
            </div>
        </div>
    )
}

export default Sidebar
