
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
      chats: [{id: state.chats.length + 1, name: chatName, message: []}]
    });
    }
  }
	const initalizeChats = () => {
    const sampleRooms = 
    [
      {
        id: 1,
        name: "Orel",
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
        messages: []
      },
      {
        id: 4,
        name: "Maayan",
        messages: []
      },
      {
        id: 5,
        name: "Yuval",
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
        <Avatar src={state.user?.photoURL} />
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