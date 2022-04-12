
import React, {useState,useEffect} from 'react';
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import SidebarChat from "./SidebarChat";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import background from "./background.jpg";

function Sidebar() {

  const [newContact, setNewContact] = useState("");
  const [rooms, setRooms] = useState([]);
  const [state, dispatch] = useStateValue();
  const [add, setAdd] = useState(true);
  
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
	const initalizeChats = () => {
    const sampleRooms = 
    [
      {
        id: 1,
        name: "Orel",
				profilePic: background,
        messages: 
				[
				{
					name: "Orel",
					timestamp: 2231,
					content: "orel",
					reciver: true
        }
          ,
				{
					name: state.user,
					timestamp: 231213,
					content: "NAH",
					reciver: false
				}
          
				]
      },
      {
        id: 2,
        name: "Itay",
				profilePic: background,
        messages: [
				{
					name: "Itay",
					timestamp:231231,
					content: "ahhhhh",
					reciver: true
				}
	        ,
				{
					name: state.user,
					timestamp:231231,
					content: "fuck meee",
					reciver: false
				}]
      },
      {
        id: 3,
        name: "Amit",
				profilePic: background,
        messages: []
      },
      {
        id: 4,
        name: "Maayan",
				profilePic: background,
        messages: []
      },
      {
        id: 5,
        name: "Yuval",
				profilePic: background,
        messages: []
      },
    ];
    dispatch
    ({
      type: actionTypes.ADD_CHATS,
      chats: sampleRooms
    });
  }
  
 useEffect(() =>  {
	  initalizeChats();
    setRooms(state.chats);
  },[]);

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
          <SidebarChat profilePic={room.profilePic} id={room.id} name={room.name} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;