import React, {useState,useEffect} from 'react';
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useStateValue } from './StateProvider';
import AddChatPrompt from './AddChatPrompt';
import Avatar from './MediaComponents/Avatar';
import { Button } from 'react-bootstrap';

function Sidebar() {

  // useState for all chats of current user.
  const [rooms, setRooms] = useState([]);
  // useState for current user.
  const [state, dispatch] = useStateValue();
  // useState for search input field.
	const [searchInput,setSearchInput] = useState("");
  // useState for showing add new chat modal.
	const [addChat, showAddChat] = useState(false);

  // handles search bar.
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
          <Button size='sm' onClick={(e) => {showAddChat(true);}} variant="outline-light"> 
						<i class="bi bi-person-plus-fill" size="1em" />
					</Button>
          <Button size='sm' variant="outline-light">
						<i class="bi bi-three-dots-vertical" /> 
					</Button>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
        <i class="bi bi-search" className='icon' />
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