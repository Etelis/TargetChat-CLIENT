import { Link } from "react-router-dom";
import Avatar from "./MediaComponents/Avatar";
import "./SidebarChat.css";
import { BsPlayCircle } from "react-icons/bs";

function SidebarChat({ id, name, profilePic, lastMessage}) {

  // validate content of message, if audio print icon instead of bar.
  const lastMessage_Content = (content) => {
    if (content.type === "audio")
      return <BsPlayCircle />;
    return content;
  };

  
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
					<span className="lastMessage"> {lastMessage_Content(lastMessage.content)} </span>
          <span className="timestamp"> {lastMessage.timestamp} </span>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;