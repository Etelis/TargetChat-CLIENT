import React, { useEffect, useState } from 'react';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./SidebarChat.css";
//import { useStateValue } from './StateProvider';
//import { getChatbyID } from '../controller/userDBController';



function SidebarChat({ id, name, profilePic, lastMessage}) {
	// const [lastMessages, setlastMessages] = useState({message: "", timestamp: ""});
 //  const [state, dispatch] = useStateValue();
	// useEffect(() => {
		
	// 	setlastMessages({state.messages.at(-1)});
	// },[state]);
	
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