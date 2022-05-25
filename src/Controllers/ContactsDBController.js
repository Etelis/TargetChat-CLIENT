import {HubConnectionBuilder } from '@microsoft/signalr';
import constants from '../Utils/Constants';


const isAvailable = (server) => {
  const timeout = new Promise((resolve, reject) => {
      setTimeout(reject, 300, 'Request timed out');
  });

  const request = fetch(server);

  return Promise
      .race([timeout, request])
      .then(response => alert('It worked :)'))
      .catch(error => alert('It timed out :('));
}

export const fetchAllContactFromDB = async () => {
  let returnVal = []

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
    };

  await fetch(constants().API_URL_GET_ALL_CONTACTS, requestOptions)
        .then(response => response.json())
        .then(responseJson => {returnVal = responseJson})
        .catch((error) => {returnVal = []});

  return returnVal
  
}

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

export const createNewContactDB = async (userID, contactID, contactName, contactServer) => {
    let returnVal = false

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
      body: JSON.stringify({
        "id": contactID,
        "name": contactName,
        "server": contactServer
        })};

    await isAvailable()
  
    await fetch(constants().API_URL_CREATE_CONTACT, requestOptions)
          .then(async response => {
            if (response.ok){
              if(await inviteMemberRemote(userID, contactID, contactServer))
                  returnVal = true
              else 
                await deleteContactDB(contactID);
            }
          })
          .catch((error) => {returnVal = false});
  
  return returnVal
  }

export const fetchContactByIDFromDB = async (contactID) => {
    let returnVal = null
  
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
      };
  
    await fetch(constants(contactID, null, null).API_URL_GET_CONTACT_BY_ID, requestOptions)
          .then(response => response.json())
          .then(responseJson => {returnVal = responseJson})
          .catch((error) => {returnVal = null});
  
    return returnVal;
  }

export const contactsConnection = async (username, contacts, setContacts) => {
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
      return connection
    }
    catch(e) {console.log(e)}
  }