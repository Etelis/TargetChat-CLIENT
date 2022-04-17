import React, {useState,useEffect} from 'react';
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import SidebarChat from "./SidebarChat";
import { useStateValue } from './StateProvider';
import { actionTypes } from '../controller/userDBController';
import background from "../images/background.jpg";

function Sidebar() {

  const [rooms, setRooms] = useState([]);
  const [state, dispatch] = useStateValue();
  
  // once addPerson was triggered, a prompt will pop and the current logged-in user will add new chat to his chats.
  const addPerson = () => {
    const chatName = prompt("Enter desired user");
    if(chatName) {
      dispatch
    ({
      type: actionTypes.ADD_CHATS,
      chats: [{id: state.chats.length + 1, name: chatName, profilePic: background, messages: []}]
    });
    }
  }

// This useEffect will be triggered once at the beginning only.
 useEffect(() =>  {
    setRooms(state.chats);
  },[]);

  // this useEffect will be triggered evertime there is a change in the state object.
  useEffect(() => {
    setRooms(state.chats);
  }, [state]);
	
  return (
  <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={state.profilePic} />
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
          <SidebarChat profilePic={room.profilePic} id={room.id} name={room.name} lastMessage={room.messages.at(-1) ? (room.messages.at(-1)) : ({content: "", timestamp: ""})} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;