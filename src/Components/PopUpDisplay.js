import React, { useEffect, useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import './PopUpDisplay.css';

function PopUpDisplay(props) {
  return (
    <div onClick={props.handleClick}>
      <Modal
        show={true}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
					{console.log(props.source.type)}
          {(props.source.id == "video") ? (<video src={props.source.src} className="popUp" type="video/mp4" controls/>) : (<img src={props.source.src} className="popUp" />)}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PopUpDisplay;