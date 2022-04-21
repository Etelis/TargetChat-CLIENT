import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';
import imageAttachment from "../images/photoAttachment.svg";
import { actionTypes } from '../controller/userDBController';
import { useParams } from "react-router-dom";
import { useStateValue } from './StateProvider';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import PopUpDisplay from './MediaComponents/PopUpDisplay';
import RecordPopUp from './MediaComponents/RecordPopUp';
import ImageMessage from './MediaComponents/ImageMessage';
import VideoMessage from './MediaComponents/VideoMessage';
import Avatar from './MediaComponents/Avatar';
import { BsPaperclip, BsEmojiSmileUpsideDown, BsMic} from "react-icons/bs";
import { Button, Collapse, Fade } from 'react-bootstrap';

function Chat() {
  const [isSubmited, setIsSubmited] = useState(false);
  const attachmentSubmitRef = useRef(null);
  const inputFile = useRef(null);
  const [input, setInput] = useState('');
  const [state, dispatch] = useStateValue();
  const { roomId } = useParams();
  const [roomPic, setRoomPic] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [emojis, setEmojis] = useState(false);
  const [showAttachMenu, setAttachMenu] = useState(false);
  const messageEndRef = useRef(null);
  const [popUp, setPopUp] = useState("");
  const [record, setRecord] = useState("");
  const [showRecord, setShowRecord] = useState(false);
  
  useEffect(() => {
    if (roomId) {
      setMessages(state.chats.find((e) => {
        return e.id == roomId
      }).messages);
      setRoomName(state.chats.find((e) => {
        return e.id == roomId
      }).name);
      setRoomPic(state.chats.find((e) => {
        return e.id == roomId
      }).profilePic);
    }
  }, [roomId, input]);

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, [messages, input]);

  useEffect(() => {
    const time = new Date().getHours() + ':' + new Date().getMinutes();
    if (isSubmited && input != "") {
      const newMessage = { name: state.user, content: input, timestamp: time, reciever: false }
      state.chats.find((e) => {
        return e.id == roomId
      }).messages.push(newMessage);
			dispatch({type: actionTypes.RENDER});
      setInput("");
    }
    setIsSubmited(false);
  }, [isSubmited]);

  useEffect(() => {
    if(record != "") {
    console.log(record);
    setInput(<audio src={record} controls />);
    attachmentSubmitRef.current.click();
    setRecord("");
    }
  }, [record]);
  
  const sendMessage = (e) => {
    e.preventDefault();
    setIsSubmited(true);
  };

  const uploadFile = () => {
    inputFile.current.click();
  };

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

  function validateFileIsImg(fileName) {
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      return true;
    } else {
      return false;
    }
  }

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
      { popUp != "" && <PopUpDisplay handleClick={()=> setPopUp("")} source={popUp} />}
      <div className="chat__header">
        <div className='chat__headerIcon'>
          <Avatar src={roomPic} />
        </div>
        <div className="chat__headerInfo">
          <h3> {roomName}</h3>
          <p> Last seen: {messages.at(-1) ? (messages.at(-1).timestamp) : ("...")} </p>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p className={`chat__message ${message.name === state.user && `chat__messageReceived`}`}>
            {message.content}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
        <span ref={messageEndRef} />
      </div>
      <div className="chat__footer">
			{!showRecord ? 
					(<>
					<div className="chat__footerIcons">
          <div onClick={() => setAttachMenu(!showAttachMenu)}>
             <Button size='sm' variant="outline-secondary"> 
               <BsPaperclip size="1.5em" />
            </Button>
            
            {showAttachMenu &&
              <Fade in={showAttachMenu}> 
                <span className='attachmentMenu'>
                  <ul>  
                    <li className="attachmentMenu__item">
                      <input type='file' id='file' ref={inputFile} onChange={onImageChange} style={{ display: 'none' }} accept="image/* video/*" multiple="false" />
                      <Button  variant="none">
                      <img src={imageAttachment} alt="" onClick={uploadFile} />
                      </Button>
                    </li>
                  </ul>
                </span>
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
               <BsEmojiSmileUpsideDown size="1.5em" />
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
        <Button size='sm' onClick={() => setShowRecord(true)} variant="outline-secondary"> 
               <BsMic size="1.5em" />
        </Button> 
					</>) 
					:
					(<div>
            <RecordPopUp setRecord={setRecord} setRecordMenu={setShowRecord} />
            </div>)}
        {console.log(record)}
      </div>
    </div>
  );
}

export default Chat;
