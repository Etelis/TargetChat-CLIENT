import { usersDB, currentUser } from '../model/UserDB';

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ACCOUNT: "SET_ACCOUNT",
  ADD_CHATS: "ADD_CHATS",
	RENDER: "RENDER",
};

export const getUser = (userName, password) => {
  return usersDB.find((element) => {
    return (element.user === userName && element.password === password);
  });
};

export const getChatbyID = (chatID) => {
  return currentUser.chats.find((element) => {
    return (element.id == chatID);
  });
};

export const currentUserSetter = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.otherUser;

		case actionTypes.RENDER:
      return {
				...state,
			}
			
    case actionTypes.ADD_CHATS:
      return {
        ...state,
        chats: [...state.chats, ...action.chats]
      };
    case actionTypes.SET_ACCOUNT:
      return {
        ...state,
        user: action.user,
        displayName: action.displayName,
        password: action.password,
        profilePic: action.profilePic
      };

    default:
      return state;
  }
}