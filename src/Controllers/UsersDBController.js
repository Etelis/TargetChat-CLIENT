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

export const logout = (dispatch) => {
  localStorage.removeItem('jwt_token');
  dispatch({type: actionTypes.SET_USER, otherUser: null})
}

// Authenticate on first entry by local storage token.
export const AuthenticateByToken = async (dispatch) =>{
  const requestOptions =
  {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`},
    credentials: 'include',
  };

  return await fetch(constants().API_URL_AUTHENTICATE_USER, requestOptions)
        .then(response => response.json())
        .then(jsonResponse =>  dispatch({type: actionTypes.SET_USER, otherUser: jsonResponse}))
}


// Fetch user from DB, by using API request.
export const fetchUserFromDB = async (userName, password, dispatch, setErrorField) =>
{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      "Username": userName,
      "Password": password
      })};

    return await fetch(constants().API_URL_LOGIN_USER, requestOptions)
    .then(response => {
      if (response.ok)
        return response.json()
      setErrorField({userName: " - invalid Username or Password!", password: " - invalid Username or Password!" })
      return {token:"", user:null}
    })
    .then(jsonResponse => {
      localStorage.setItem('jwt_token', jsonResponse.token);
      dispatch({type: actionTypes.SET_USER, otherUser: jsonResponse.user})
    })
    .catch((error) => {
        setErrorField({userName: " - Server is unreachable"})
    })
  }

export const createUserDB = async (user, dispatch, setFormErrors) => {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(user)};

  return await fetch(constants().API_URL_REGISTER_USER, requestOptions)
        .then(response => {
          if (response.ok)
            dispatch({type: actionTypes.SET_USER, otherUser: user})
          setFormErrors({userName: " - User already exists!" });
        })
        .catch(error => setFormErrors({userName: " - Server is unreachable"}))
}


export const currentUserSetter = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {...action.otherUser, contactConnection: "", chatConnection: ""}

		case actionTypes.RENDER:
      return {
				...state,
			}

    case actionTypes.SET_CHAT_CONNECTION:
      return {
        ...state,
        chatConnection: action.chatConnection,
      }

    case actionTypes.SET_CONTACT_CONNECTION:
        return {
          ...state,
          contactConnection: action.contactConnection,
        }

    default:
      return state;
  }
}