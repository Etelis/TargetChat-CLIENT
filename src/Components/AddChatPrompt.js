import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { createNewContactDB } from '../Controllers/ContactsDBController';
import { useStateValue } from './StateProvider';
import './AddChatPrompt.css'

// modal for showing new chat add.
function AddChatPrompt(props) {
  // state for the input
  const [input, setInput] = useState({contactID: "", contactName: "", server: ""});
  const [state, dispatch] = useStateValue();
  const [errorField, setErrorField] = useState("Add your friend on TargetChat")
  // handles the closing of the addChat popup
  const handleClose = () =>  props.showAddChat(false);

  // handles the submit 
  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.contactID !== "" && input.server !== "") {
      async function fetchData(){
        if(await createNewContactDB(state.username, input.contactID, input.contactName, input.server, setErrorField))
          props.showAddChat(false);
      }
      fetchData()
    }
  }

    return (
        <>
          <Modal show={true} onHide={handleClose}>
          <Form>
            <Modal.Body>
                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                  <div class="input-group mb-2 mr-sm-3">
                    <div class="input-group-prepend">
                    <div class="input-group-text">@</div>
      
                    </div>
                    <Form.Control
                        className="input"
                        type="username"
                        placeholder="Username"
                        autoFocus
                        value={input.contactID}
                        onChange={(e) => {setInput({...input, contactID: e.target.value})}}
                    />
                 </div>
                 <div class="input-group mb-2 mr-sm-3">
                    <div class="input-group-prepend">
                    <div class="input-group-text">➤</div>
      
                    </div>
                    <Form.Control
                        className="input"
                        type="username"
                        placeholder="Contact Name"
                        autoFocus
                        value={input.contactName}
                        onChange={(e) => {setInput({...input, contactName: e.target.value})}}
                    />
                 </div>
                 <div class="input-group mb-2 mr-sm-3">
                    <div class="input-group-prepend">
                    <div class="input-group-text">➤</div>
      
                    </div>
                    <Form.Control
                        className="input"
                        type="username"
                        placeholder="Server"
                        autoFocus
                        value={input.server}
                        onChange={(e) => {setInput({...input, server: e.target.value})}}
                    />
                 </div>
                </Form.Group>
                <Form.Group>
                    <Form.Text className="text-muted" id='form-text'>
                        {errorField}
                    </Form.Text>
                </Form.Group>
              
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button size="sm" variant="primary" type="submit" onClick={handleSubmit}>
                Add Friend
              </Button>
            </Modal.Footer>
            </Form>
          </Modal>
        </>
      );
}

export default AddChatPrompt