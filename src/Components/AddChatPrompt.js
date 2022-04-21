import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { actionTypes } from '../controller/userDBController';
import { useStateValue } from './StateProvider';
import DefaultProfilePic from '../images/Amit.png';
import './AddChatPrompt.css'

function AddChatPrompt(props) {
    const [input, setInput] = useState("");
    const [state, dispatch] = useStateValue();


    const handleClose = () =>  props.showAddChat(false);

    const handleSubmit = () => {
        dispatch
        ({
          type: actionTypes.ADD_CHATS,
          chats: [{id: state.chats.length + 1, name: input, profilePic: DefaultProfilePic, messages: []}]
        });

        props.showAddChat(false);
    }

    return (
        <>
          <Modal show={true} centered={true} onHide={handleClose}>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                  <div class="input-group mb-2 mr-sm-3">
                    <div class="input-group-prepend">
                    <div class="input-group-text">@</div>
      
                    </div>
                    <Form.Control
                        type="username"
                        placeholder="Username"
                        autoFocus
                        value={input}
                        onChange={(e) => {setInput(e.target.value)}}
                    />
                 </div>
                </Form.Group>
                <Form.Group>
                    <Form.Text className="text-muted" id='form-text'>
                        Add your friend on TargetChat
                    </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button size="sm" variant="primary" onClick={handleSubmit}>
                Add Friend
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default AddChatPrompt