import React, {useState} from 'react'
import './Avatar.css';
import PopUpDisplay from './PopUpDisplay';
import emptyUser from "../../images/emptyUser.png";
// avatar component.
function Avatar({src}) {
  // useState for showing avatar in modal state.
  const [popUp, setPopUp] = useState("");

  src = src ? src : emptyUser;

  return (
    <>
      { popUp !== "" && <PopUpDisplay type={"image"} handleClick={()=> setPopUp("")} source={popUp} />}
      <img className="avatar_message rounded-circle media_message" src={src} onClick={ () => { setPopUp(src); }} />
    </>
  )
}

export default Avatar