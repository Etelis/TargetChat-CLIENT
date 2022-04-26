import React, {useState} from 'react'
import './Avatar.css';
import PopUpDisplay from './PopUpDisplay';

// avatar component.
function Avatar({src}) {
  // useState for showing avatar in modal state.
  const [popUp, setPopUp] = useState("");


  return (
    <>
      { popUp !== "" && <PopUpDisplay type={"image"} handleClick={()=> setPopUp("")} source={popUp} />}
      <img className="avatar_message rounded-circle media_message" src={src} onClick={ (e) => { setPopUp(src); }} />
    </>
  )
}

export default Avatar