import React, { useState } from 'react';
import './VideoMessage.css';
import PopUpDisplay from './PopUpDisplay';


// video message component.
function VideoMessage(props) {
  const [popUp, setPopUp] = useState("");

  return (
    <>
        { popUp !== "" && <PopUpDisplay type="video" handleClick={()=> setPopUp("")} source={popUp} />}
        <video src={props.src} type="video/mp4" controls className="video_message media_message" onClick={ (e) => { setPopUp(props.src); }} />
    </>
  )
}

export default VideoMessage