import { useStateValue } from '../Components/StateProvider';
import { usersDB, currentUser } from '../model/UserDB';
import constants, { actionTypes } from '../Utils/Constants';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';


export const logout = () => {
  localStorage.removeItem('jwt_token');
}

export const AuthenticateByToken = async () =>{
  let returnVal = null

  const requestOptions =
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`},
    credentials: 'include',
  };

  await fetch(constants().API_URL_AUTHENTICATE_USER, requestOptions)
        .then(response => response.json())
        .then(jsonResponse => {returnVal = jsonResponse})
        .catch((error) => {returnVal = null})

  console.log(returnVal)

  return returnVal
}
export const fetchUserFromDB = async (userName, password) =>
{
  let returnVal = null

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      "Username": userName,
      "Password": password
      })};

    await fetch(constants().API_URL_LOGIN_USER, requestOptions)
    .then(response => response.json())
    .then(jsonResponse => {
      returnVal = jsonResponse.user
      localStorage.setItem('jwt_token', jsonResponse.token);
    })
    .catch((error) => {returnVal = null;})

  return returnVal
};

export const createUserDB = async (user) => {
  let returnVal = null;
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(user)};

  await fetch(constants().API_URL_REGISTER_USER, requestOptions)
        .then(response => {
          if (response.ok)
            returnVal = true
        })
        .catch((error) => {returnVal = false});
  return returnVal
}


export const currentUserSetter = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.otherUser;

		case actionTypes.RENDER:
      return {
				...state,
			}

    default:
      return state;
  }
}