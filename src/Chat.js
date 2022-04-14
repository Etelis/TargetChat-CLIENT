import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';
import { Avatar, IconButton, Badge } from '@material-ui/core';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import { useParams } from "react-router-dom";
import { useStateValue } from './StateProvider';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import UploadFileIcon from '@mui/icons-material/UploadFile';


function Chat() {
	const [input, setInput] = useState('');
	const [state, dispatch] = useStateValue();
	const { roomId } = useParams();
	const [roomPic, setRoomPic] = useState(null);
	const [roomName, setRoomName] = useState('');
	const [messages, setMessages] = useState([]);
	const [emojis, setEmojis] = useState(false);
	const [showAttachMenu, setAttachMenu] = useState(false);
	const messageEndRef = useRef(null);

	useEffect (() => {
	if (roomId)
    {
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
	}, [roomId,input]);

	useEffect (() =>{
		messageEndRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
	}, [messages,input]);

	const sendMessage = (e) => {
		e.preventDefault();
    const newMessage = {name: state.user, content: input, time: 1, reciever: false}
    state.chats.find((e) => {
        return e.id == roomId
			}).messages.push(newMessage);
  setInput("");
	};

	return (
		<div className="chat">
			<div className="chat__header">
									<div className='chat__headerIcon'>
					<Avatar src={roomPic} />
					</div>
				<div className="chat__headerInfo">
					<h3> {roomName}</h3>
					<p> Last seen: { //new Date( messages[messages.length -1].timestamp?.toDate()).toUTCString()} 
					}</p>
				</div>
			</div>
			<div className="chat__body">
				{messages.map((message) => (
				<p className={`chat__message ${ message.name == state.user && `chat__messageReceived` }`}>
					{message.content}
					<span className="chat__name">{message.name}</span>
				</p>
				))}
				<span ref={messageEndRef} />
			</div>
			<div className="chat__footer">
				<div className="chat__footerIcons">
					<div onMouseEnter={() => setAttachMenu(true)}
						 onMouseLeave={() => setAttachMenu(false)}>
						<IconButton>
							<AttachFileIcon />
						{showAttachMenu && 
							<span className='attachmentMenu'>
								<ul>
									<li>
										<Badge color="secondary" overlap="circular" badgeContent=" ">
											<InsertPhotoIcon />
										</Badge>
									</li>
									<li>
										<UploadFileIcon />
									</li> 
								</ul>
							</span>}
						</IconButton>
					</div>
					<div onMouseEnter={() => setEmojis(true)}
						 onMouseLeave={() => setEmojis(false)}>
				   <div className='chat__footerEmoji'>
					{emojis && 
					<span className='emoji__selection'> 
						<Picker onEmojiClick={(event, emojiObject) => { setInput(input + emojiObject.emoji);}} 
						skinTone={SKIN_TONE_MEDIUM_DARK} /> 
					</span> }
				   </div>
					<IconButton>
						<SentimentSatisfiedOutlinedIcon />
					</IconButton>
					</div>
				</div>
				<form>
					<input
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder="Type a message"
						type="text"
					/>
					<button onClick={sendMessage} type="submit" />
				</form>
				<MicRoundedIcon />
			</div>
		</div>
	);
}

export default Chat;
