import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';
import imageAttachment from "../images/photoAttachment.svg";
import { fetchContactByIDFromDB } from '../Controllers/ContactsDBController';
import { createNewMessageDB, fetchAllMessagesByContactFromDB } from '../Controllers/MessagesDBController';
import { useParams } from "react-router-dom";
import { useStateValue } from './StateProvider';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import { actionTypes } from '../Utils/Constants';
import PopUpDisplay from './MediaComponents/PopUpDisplay';
import RecordPopUp from './MediaComponents/RecordPopUp';
import ImageMessage from './MediaComponents/ImageMessage';
import VideoMessage from './MediaComponents/VideoMessage';
import Avatar from './MediaComponents/Avatar';
import emptyUser from "../images/emptyUser.png";
import { Button, Fade } from 'react-bootstrap';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function Chat() {
  // state for the submit of a message
  const [isSubmited, setIsSubmited] = useState(false);
  // reference to the submit button
  const attachmentSubmitRef = useRef(null);
  // reference to the input file button
  const inputFile = useRef(null);
  const [input, setInput] = useState('');
  const [state, dispatch] = useStateValue();
  const { roomId } = useParams();
  // state for the room pic
  const [roomPic, setRoomPic] = useState(null);
  // // state for the room name
  // const [roomName, setRoomName] = useState('');
  // state for the messages
  const [messages, setMessages] = useState([]);
  // state for the emojis menu
  const [emojis, setEmojis] = useState(false);
  // state for the attachment menu
  const [showAttachMenu, setAttachMenu] = useState(false);
  const messageEndRef = useRef(null);
  // a state for the image modal for displaying images and videos
  const [imageModal, setImageModal] = useState("");
  // state for the record submit
  const [record, setRecord] = useState("");
  // state for the record button, is set to true after the record button is clicked
  const [showRecord, setShowRecord] = useState(false);
  
  const [contact, setContact] = useState("");


  const joinRoom = async (username, contactID) => {
    try{
      const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:7180/chat_connect")
          .build();

      connection.on("ReceiveMessage", (message) => {
            console.log(message);
            setMessages(messages => [...messages, message]);
          });

      console.log(contactID);
      await connection.start();
      await connection.invoke("ConnectClientToChat", { username: username, contactID: contactID});
    }

    catch{}
  }
  // adjusts the chat (messages, name, profile pic) 
  useEffect(() => {
    if (roomId) {
      async function fetchData(){
        setContact(await fetchContactByIDFromDB(roomId));
        setMessages(await fetchAllMessagesByContactFromDB(roomId));
        // setRoomName(contact.name);
        setRoomPic(emptyUser)
        await joinRoom(state.username, roomId);
    }
    fetchData();
  }
  }, [roomId]);

  // scroll into view when new message is sent or entered chat.
  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, [messages, input]);


  // submits the message and adds it to the chat's messages
  useEffect(() => {
    if (isSubmited && input != "") {
      console.log("entered submited")
      async function fetchData(){
      if (await createNewMessageDB(state.username, contact.id, input, contact.server)){
        setMessages(await fetchAllMessagesByContactFromDB(roomId));
        dispatch({type: actionTypes.RENDER});
      }
      setInput(""); 
      setIsSubmited(false);
    }
    fetchData()
  }
  }, [isSubmited]);

  // sets the input to the new record input
  useEffect(() => {
    if(record != "") {
    setInput(<audio src={record} controls />);
    // click on submit.
    attachmentSubmitRef.current.click();
    setRecord("");
    }
  }, [record]);

  // sends a message
  const sendMessage = (e) => {
    e.preventDefault();
    setIsSubmited(true);
  };

  // triggers the input file click
  const uploadFile = () => {
    inputFile.current.click();
  };

  // on image/video change
  const onImageChange = (event) => {
   if (validateFileIsImg(event.target.files[0].name)) {
     setInput(<ImageMessage src={URL.createObjectURL(event.target.files[0])} />);
     attachmentSubmitRef.current.click();
  } else if(validateFileIsVideo(event.target.files[0].name)) {
    setInput(<VideoMessage src={URL.createObjectURL(event.target.files[0])} />);
    attachmentSubmitRef.current.click();  
  } else {
      alert("Only videos or images are valid!");
  }
};

  // validator for the image file
  function validateFileIsImg(fileName) {
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      return true;
    } else {
      return false;
    }
  }

  // validator for the video file
  function validateFileIsVideo(fileName) {
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "mp4" || extFile === "mvk" || extFile === "avi") {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="chat">
      { imageModal != "" && <PopUpDisplay handleClick={()=> setImageModal("")} source={imageModal} />}
      <div className="chat__header">
        <div className='chat__headerIcon'>
          <Avatar src={roomPic} />
        </div>
        <div className="chat__headerInfo">
          <h3> {contact.name}</h3>
          <p> Last seen: {contact.lastdate ? (contact.lastdate) : ("...")} </p>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p className={`chat__message ${!message.sent && `chat__messageReceived`}`}>
            {message.content}
            <span className="chat__timestamp">{message.created}</span>
          </p>
        ))}
        <span ref={messageEndRef} />
      </div>
      <div className="chat__footer">
			{!showRecord ? 
					(<>
					<div className="chat__footerIcons">
          <div className='attachmentMenu' onMouseEnter={() => setAttachMenu(!showAttachMenu)} 
               														onMouseLeave={() => setAttachMenu(!showAttachMenu)}>
                 
             <Button size='sm' variant="outline-secondary"> 
							<i class="bi bi-paperclip" />
            </Button>
            
            {showAttachMenu &&
              <Fade in={showAttachMenu}> 
                  <ul>  
                    <li className="attachmentMenu__item">
                      <input type='file' id='file' ref={inputFile} onChange={onImageChange} style={{ display: 'none' }} accept="image/*, video/*" multiple="false" />
                      <Button  variant="none">
                      <img src={imageAttachment} alt="" onClick={uploadFile} />
                      </Button>
                    </li>
                  </ul>
                </Fade>}
        
          </div>
          <div onMouseEnter={() => setEmojis(true)}
            onMouseLeave={() => setEmojis(false)}>
            <div className='chat__footerEmoji'>
              {emojis &&
                <span className='emoji__selection'>
                  <Picker onEmojiClick={(event, emojiObject) => { setInput(input + emojiObject.emoji); }}
                    skinTone={SKIN_TONE_MEDIUM_DARK} />
                </span>}
            </div>
            <Button size='sm' variant="outline-secondary"> 
               <i class="bi bi-emoji-smile-upside-down" size="1.5em" />
            </Button>
          </div>
        </div>
				<form>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} ref={attachmentSubmitRef} type="submit" />
        </form>
					</>) 
					:
					(<div>
            <RecordPopUp setRecord={setRecord} setRecordMenu={setShowRecord} />
            </div>)}
          <Button size='sm' onClick={() => setShowRecord(!showRecord)} variant="outline-secondary"> 
               <i class="bi bi-mic" size="1.5em" />
        </Button> 
      </div>
    </div>
  );
}

export default Chat;
