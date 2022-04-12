
export const initialState = {
    user: null,
		displayName: null,
		password: null,
    profilePic: null,
    chats: [],
};

export const actionTypes = {
    SET_USER: "SET_USER",
		SET_ACCOUNT: "SET_ACCOUNT",
    ADD_CHATS: "ADD_CHATS",
};

const reducer = (state, action) => {
    console.log("current state is:", state);
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
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
};

export default reducer;