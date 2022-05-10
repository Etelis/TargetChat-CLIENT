import constants from '../Utils/Constants';

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
        "server": 'localhost:7180'
        })};
  
    await fetch(constants(null, null, contactServer).API_URL_INVITE_MEMBER, requestOptions)
          .then(response => {
            if (response.ok)
              returnVal = true
          })
          .catch((error) => {returnVal = false;})
  
    return returnVal
  }

export const createNewContactDB = async (userID, contactID, contactName, contactServer) => {
    let returnVal = null
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}` },
      body: JSON.stringify({
        "id": contactID,
        "name": contactName,
        "server": contactServer
        })};
  
    await fetch(constants().API_URL_CREATE_CONTACT, requestOptions)
          .then(async response => {
            if (response.ok){
              if(await inviteMemberRemote(userID, contactID, contactServer) == null)
                throw new Error ('failed inviting user')
              returnVal = true;
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