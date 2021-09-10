import Sidebar from "../../components/sidebar/Sidebar"
import SinglePost from "../../components/singlePost/SinglePost"
import Milestone from "../../components/milestone.jsx/Milestone"
import "./single.css"

function Single() {
    return (
        <div className="single">
            <Milestone />
            <SinglePost />
            <Sidebar />
        </div>
    )
}

export default Single
