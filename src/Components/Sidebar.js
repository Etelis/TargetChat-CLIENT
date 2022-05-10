import React, {useState,useEffect} from 'react';
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useStateValue } from './StateProvider';
import AddChatPrompt from './AddChatPrompt';
import Avatar from './MediaComponents/Avatar';
import { Button } from 'react-bootstrap';
import { fetchAllContactFromDB } from '../Controllers/ContactsDBController';
import { actionTypes } from '../Utils/Constants';
import { currentUser } from '../model/UserDB';
import defaultPhoto from "../images/emptyUser.png";
import { logout } from '../Controllers/UsersDBController';

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

  const logoutHandle = (e) => {
    logout()
    dispatch({type: actionTypes.SET_USER, otherUser: currentUser})
  }
  
// This useEffect will be triggered once at the beginning only.
 useEffect(() =>  {
	 if(!searchInput)
   {
    async function fetchData(){
      const contacts = await fetchAllContactFromDB();
      setRooms(contacts);
    }
    fetchData();
   }
  },[searchInput]);

  // this useEffect will be triggered evertime there is a change in the state object.
  useEffect(() => {
    async function fetchData(){
      const contacts = await fetchAllContactFromDB();
      setRooms(contacts);
    }
    fetchData();
  }, [addChat]);
	
  return (
  <div className="sidebar">
    {addChat && <AddChatPrompt showAddChat={showAddChat} />}
      <div className="sidebar__header">
        <Avatar src={state.photo} />
        <div className="sidebar__headerRight">
          <Button size='sm' onClick={(e) => {showAddChat(true);}} variant="outline-light"> 
						<i class="bi bi-person-plus-fill" size="1em" />
					</Button>
					<Button size='sm' variant="outline-light" onClick={logoutHandle}>
						<i class="bi bi-slash-circle" size="1em" />
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
          <SidebarChat profilePic={room.photo ? (room.photo) : (defaultPhoto)} id={room.id} name={room.name} lastMessage={room.last ? ({content: room.last, timestamp: room.lastdate}) : ({content: "", timestamp: ""})} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;