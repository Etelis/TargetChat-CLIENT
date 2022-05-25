import {HubConnectionBuilder } from '@microsoft/signalr';
import constants, { actionTypes } from '../Utils/Constants';

const isAvailable = (server) => {
  const timeout = new Promise((resolve, reject) => {
      setTimeout(reject, 300, 'Request timed out');
  });

  const request = fetch(server);

  return Promise
      .race([timeout, request])
      .then(function() {
        return true;
      })
      .catch(function() {
        return false;
      });
}

export const fetchAllContactFromDB = async (setRooms) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
    };

  return await fetch(constants().API_URL_GET_ALL_CONTACTS, requestOptions)
        .then(response => response.json())
        .then(responseJson => {setRooms(responseJson)})
        .catch((error) => {setRooms([])}); 
}

//Send invitation after posting contact.
export const inviteMemberRemote = async (userID, contactID, contactServer) => {
    let returnVal = false
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
      body: JSON.stringify({
        "from": userID,
        "to": contactID,
        "server": 'localhost:7129'
        })};
  
    await fetch(constants(null, null, contactServer).API_URL_INVITE_MEMBER, requestOptions)
          .then(response => {
            if (response.ok)
              returnVal = true
          })
          .catch((error) => {returnVal = false;})
  
    return returnVal
  }

// Not used currently.
export const deleteContactDB = async (contactID) =>{
  let returnVal = false

  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` }};

 await fetch(constants(contactID, null, null).API_URL_GET_CONTACT_BY_ID, requestOptions)
          .then(response => {
            if (response.ok)
              returnVal = true
          })
          .catch((error) => {returnVal = false});
}

export const createNewContactDB = async (userID, contactID, contactName, contactServer, setErrorField) => {
    let returnVal = false

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
      body: JSON.stringify({
        "id": contactID,
        "name": contactName,
        "server": contactServer
        })};

    if (!await isAvailable(constants().API_URL_CREATE_CONTACT)){
      setErrorField("Error Reaching Server! Try again later.")
      return;
    }

    if(!await inviteMemberRemote(userID, contactID, contactServer)){
      setErrorField("Error Reaching! " + contactServer + " Try again later.")
      return
    }

    await fetch(constants().API_URL_CREATE_CONTACT, requestOptions)
          .then(response => returnVal = true)
          .catch((error) => {setErrorField("Error Reaching Server! Try again later.")});

  return returnVal
  }

export const fetchContactByIDFromDB = async (contactID, setContact) => {

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
      };
  
   return await fetch(constants(contactID, null, null).API_URL_GET_CONTACT_BY_ID, requestOptions)
          .then(response => response.json())
          .then(responseJson => {setContact(responseJson)})
          .catch((error) => setContact(null));
  }

export const contactsConnection = async (username, contacts, setContacts, dispatch) => {
    try{
      const connection = new HubConnectionBuilder()
          .withUrl(constants().API_URL_CONTACT_CONNECTION)
          .build();

      connection.on("ReceiveContact", (contact) => {
        setContacts(contacts => [...contacts, contact]);
          });

      connection.on("ContactUpdate", async (contactID) => {
        var filtered = contacts.filter(function(contact){ 
          return contact.id !== contactID;
      });
        filtered = [...filtered, await fetchContactByIDFromDB(contactID)]
        setContacts(filtered);
      })

      await connection.start();
      await connection.invoke("ConnectClientToChat", username);
      dispatch({type: actionTypes.SET_CONTACT_CONNECTION, contactsConnection: connection})
    }
    catch(e) {console.log(e)}
  }