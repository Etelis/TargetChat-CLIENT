import React, {useState,useEffect} from 'react';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import SidebarChat from "./SidebarChat";
import { useStateValue } from './StateProvider';


function Sidebar() {
	const exampleRoom = {
		id: 0,
		name: ""
	}
	
  const [rooms, setRooms] = useState([exampleRoom]);
  const [{ user }, dispatch] = useStateValue();

  const addPerson = () => {
    const chatName = prompt("Enter desired user");
    if(chatName) {
      // ADD NEW CHAT LOGIC
    }
  }


  useEffect(() => { //setRooms() // SET ROOMS 
									},[]);
  
  return (
  <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <div onClick={addPerson}>
          <IconButton>
            <PersonAddTwoToneIcon />
          </IconButton>
          </div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
        <SearchIcon />
        <input placeholder="Search or start a new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <div className="sidebar__chatsContainer">
					{rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;