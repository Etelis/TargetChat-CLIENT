import React, { useState } from 'react';
import './ImageMessage.css';
import PopUpDisplay from './PopUpDisplay';

function ImageMessage(props) {
  const [popUp, setPopUp] = useState("");

  return (
    <>
        { popUp !== "" && <PopUpDisplay type="image" handleClick={()=> setPopUp("")} source={popUp} />}
        <img src={props.src} alt="image_message" className="image_message media_message" onClick={ (e) => { setPopUp(props.src); }} />
    </>
  )
}

export default ImageMessage