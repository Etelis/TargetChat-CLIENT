
import { Link } from "react-router-dom";
import Avatar from "./MediaComponents/Avatar";
import "./SidebarChat.css";



function SidebarChat({ id, name, profilePic, lastMessage}) {
  return (
    <Link to={`/rooms/${id}`}>
    <div className="sidebarChat">
        <div className="sidebarChat__profilePic">
        <Avatar src={profilePic} />
        </div>
        <div className="sidebarChat__info">
          <h2>
            {name}
          </h2>
					<span className="lastMessage"> {lastMessage.content} </span>
          <span className="timestamp"> {lastMessage.timestamp} </span>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;