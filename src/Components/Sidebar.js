import React, {useState,useEffect} from 'react';
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useStateValue } from './StateProvider';
import AddChatPrompt from './AddChatPrompt';
import Avatar from './MediaComponents/Avatar';
import { BsFillPersonPlusFill, BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import { Button } from 'react-bootstrap';

function Sidebar() {

  const [rooms, setRooms] = useState([]);
  const [state, dispatch] = useStateValue();
	const [searchInput,setSearchInput] = useState("");
	const [addChat, showAddChat] = useState(false);

	const searchHandle = (e) => {
		setSearchInput(e.target.value);
		setRooms(rooms.filter((element) => { return element.name.toLowerCase().includes(e.target.value.toLowerCase()) }));
	}
  
// This useEffect will be triggered once at the beginning only.
 useEffect(() =>  {
	 if(!searchInput)
    setRooms(state.chats);
  },[searchInput]);

  // this useEffect will be triggered evertime there is a change in the state object.
  useEffect(() => {
    setRooms(state.chats);
  }, [state]);
	
  return (
  <div className="sidebar">
    {addChat && <AddChatPrompt showAddChat={showAddChat} />}
      <div className="sidebar__header">
        <Avatar src={state.profilePic} />
        <div className="sidebar__headerRight">
          <Button size='sm' onClick={(e) => {showAddChat(true);}} variant="outline-light"> <BsFillPersonPlusFill size="1em" /> </Button>
          <Button size='sm' variant="outline-light"> <BsThreeDotsVertical /> </Button>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
        <BsSearch className='icon' />
        <input placeholder="Search or start a new chat" type="text" value={searchInput} onChange={searchHandle}/>
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