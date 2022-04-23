import React, { useEffect, useState } from 'react';
import {Modal, Button, Image} from 'react-bootstrap';
import './PopUpDisplay.css';

// popUp Display component, in charge of showing large image modal.
function PopUpDisplay(props) {
  return (
    <div onClick={props.handleClick}>
      <Modal
        show={true}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          {props.type === "video" && <video type="video/mp4" controls className='popup_media' src={props.source} />}
          {props.type === "image" && <img alt='image_popup' className='popup_media' src={props.source} />}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PopUpDisplay;