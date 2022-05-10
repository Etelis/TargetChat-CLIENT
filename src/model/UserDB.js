import amitProfilePic from "../images/Amit.png";
import yuvalProfilePic from "../images/Yuval.png";
import orelProfilePic from "../images/Orel.png";
import itayProfilePic from "../images/Itay.png";
import emptyUser from "../images/emptyUser.png";
import ImageMessage from "../Components/MediaComponents/ImageMessage";
import VideoMessage from "../Components/MediaComponents/VideoMessage";
import audio from "../images/Kalimba.mp3";
import video from "../images/sd.mp4";
import golden from "../images/golden.jpg"
import sassiProfilePic from "../images/Sassi.jpg"

const sampleRooms = 
[
  {
    id: 1,
    name: "Orel",
    profilePic: orelProfilePic,
    messages: 
          [
            { name: "Orel", timestamp: "12:48", content: "Hey Maayan. did u do the recent assigment given?", reciver: true },
            { name: "Maayan", timestamp: "12:50", content: "Yes sure! here you go:", reciver: false },
            { name: "Maayan", timestamp: "12:53", content: <audio src={audio} controls />, reciver: false },
            { name: "orel", timestamp: "12:55", content: <ImageMessage src={golden}/>, reciver: true },
            { name: "Maayan", timestamp: "12:56", content: <VideoMessage src={video}/>, reciver: false }
          ]
  },
  {
    id: 2,
    name: "Itay",
    profilePic: itayProfilePic,
    messages: 
      [
          { name: "Itay", timestamp: "13:48", content: "There is no place like 127.0.0.1", reciver: true },
          { name: "Maayan", timestamp: "13:53", content: <audio src={audio} controls />, reciver: false },
          { name: "Maayan", timestamp: "13:56", content: <VideoMessage src={video}/>, reciver: false },
          { name: "Itay", timestamp: "13:55", content: <ImageMessage src={golden}/>, reciver: true }
      ]
  },
  {
    id: 3,
    name: "Amit",
    profilePic: amitProfilePic,
    messages: 
      [
          { name: "Amit", timestamp: "13:48", content: "There is no place like 127.0.0.1", reciver: true },
          { name: "Maayan", timestamp: "13:53", content: <audio src={audio} controls />, reciver: false },
          { name: "Amit", timestamp: "13:56", content: <VideoMessage src={video}/>, reciver: true },
          { name: "Maayan", timestamp: "13:55", content: <ImageMessage src={golden}/>, reciver: false }
      ]
  },
  {
    id: 4,
    name: "Yuval",
    profilePic: yuvalProfilePic,
    messages:
    [
          { name: "Yuval", timestamp: "13:48", content: "There is no place like 127.0.0.1", reciver: true },
          { name: "Yuval", timestamp: "13:53", content: <audio src={audio} controls />, reciver: true },
          { name: "Yuval", timestamp: "13:56", content: <VideoMessage src={video}/>, reciver: true },
          { name: "Maayan", timestamp: "13:55", content: <ImageMessage src={golden}/>, reciver: false }
    ]
  },
  {
    id: 5,
    name: "Sassi",
    profilePic: sassiProfilePic,
    messages:
    [
          { name: "Sassi", timestamp: "13:48", content: "There is no place like 127.0.0.1", reciver: true },
          { name: "Maayan", timestamp: "13:53", content: <audio src={audio} controls />, reciver: false },
          { name: "Maayan", timestamp: "13:56", content: <VideoMessage src={video}/>, reciver: false },
          { name: "Maayan", timestamp: "13:55", content: <ImageMessage src={golden}/>, reciver: false }
    ]
  },
]


export const currentUser = { username: null, displayName: null, password: null, profilePic: emptyUser};

