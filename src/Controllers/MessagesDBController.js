import constants, {actionTypes} from '../Utils/Constants';
import { HubConnectionBuilder} from '@microsoft/signalr';

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

export const transferMessageRemote = async (userID, contactID, content, contactServer) => {
  let returnVal = false
  console.log(contactServer);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
    body: JSON.stringify({
      "from": userID,
      "to": contactID,
      "content": content
      })};

  await fetch(constants(null, null, contactServer).API_URL_TRANSFER_MESSAGE, requestOptions)
        .then(response => {
          if(response.ok)
            returnVal = true
        })
        .catch((error) => {returnVal = false});

  return returnVal
  
}

export const deleteMessageDB = async (contactID, messageID) =>{
  let returnVal = false

  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` }};

 await fetch(constants(contactID, messageID, null).API_URL_GET_ALL_MESSAGES_BY_CONTACT, requestOptions)
          .then(response => {
            if (response.ok)
              returnVal = true
          })
          .catch((error) => {returnVal = false});
}

export const createNewMessageDB = async (userID, contactID, content, contactServer) =>
{
  let returnVal = false

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
    body: JSON.stringify({
      "content": content
      })};

    if (!await isAvailable(constants(contactID, null, null).API_URL_CREATE_MESSAGE_BY_CONTACT)){
      return;
    }
    
    if(!await transferMessageRemote(userID, contactID, content, contactServer)){
      return
    }      

  await fetch(constants(contactID, null, null).API_URL_CREATE_MESSAGE_BY_CONTACT, requestOptions)
        .then(async response => returnVal = true)
        .catch((error) => {returnVal = false});

  return returnVal
}

export const fetchAllMessagesByContactFromDB = async (contactID, setMessages) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
      };
  
    await fetch(constants(contactID, null, null).API_URL_GET_ALL_MESSAGES_BY_CONTACT, requestOptions)
          .then(response => response.json())
          .then(responseJson => {setMessages(responseJson)})
          .catch((error) => {setMessages([])});
  }

export const establishMessagesListener = async (username, contactID, setMessages, dispatch) => {
    try{
      const connection = new HubConnectionBuilder()
          .withUrl(constants().API_URL_CHAT_CONNECTION)
          .build();

      connection.on("ReceiveMessage", (message) => {
            setMessages(messages => [...messages, message]);
          });

      await connection.start();
      await connection.invoke("ConnectClientToChat", { username: username, contactID: contactID});
      dispatch({type: actionTypes.SET_CHAT_CONNECTION, chatConnection: connection})
    }
    catch(e) {console.log(e)}
}

export const closeConnection = async (connection) => {
  try { await connection.stop(); } 
  catch (e) { }
}
