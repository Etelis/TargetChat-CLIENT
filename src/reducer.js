
export const initialState = {
    user: null,
    profilePic: null,
    chats: [],
};

export const actionTypes = {
    SET_USER: "SET_USER",
    ADD_CHATS: "ADD_CHATS"
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
					console.log("Arrived at ADD_CHATS")
					console.log("arrived with action.chats: ", action.chats)
            return {
							...state,
							chats: [...state.chats, ...action.chats]
            };
        default:
            return state;
    }
};

export default reducer;