import amitProfilePic from "../images/Amit.png";
import yuvalProfilePic from "../images/Yuval.png";
import orelProfilePic from "../images/Orel.png";
import itayProfilePic from "../images/Itay.png";
import emptyUser from "../images/emptyUser.png";
import ImageMessage from "../Components/MediaComponents/ImageMessage";
import audio from "../images/Kalimba.mp3"

//<audio src={record} controls />
const sampleRooms = 
[
  {
    id: 1,
    name: "Orel",
    profilePic: orelProfilePic,
    messages: 
            [
            { name: "Orel", timestamp: "12:48", content: "Hey Maayan. did u do the recent assigment given?", reciver: true }
      ,
            { name: "Maayan", timestamp: "12:50", content: "Yes sure! here you go:", reciver: false }
      ,
            { name: "Maayan", timestamp: "12:53", content: <audio src={audio} controls />, reciver: true }]
  },
  {
    id: 2,
    name: "Itay",
    profilePic: itayProfilePic,
    messages: [
            { name: "Itay", timestamp: "13:48", content: "There is no place like 127.0.0.1", reciver: true }
        ,
            { name: "Maayan", timestamp: "13:52", content: "?????", reciver: false }
        ]
  },
  {
    id: 3,
    name: "Amit",
    profilePic: amitProfilePic,
    messages: [{ name: "Itay", timestamp: "13:48", content: "There is no place like 127.0.0.1", reciver: true }]
  },
  {
    id: 4,
    name: "Yuval",
    profilePic: yuvalProfilePic,
    messages: [{ name: "Itay", timestamp: "13:48", content:  <ImageMessage src={itayProfilePic} /> , reciver: true }]
  },
]


export const usersDB = [ {user: "Maayan", displayName: "Maayan", password: "Maayan12345", profilePic: amitProfilePic, chats: sampleRooms } ]
export const currentUser = { user: null, displayName: null, password: null, profilePic: emptyUser, chats: [] };

