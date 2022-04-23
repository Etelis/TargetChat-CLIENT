import React, { createContext, useReducer, useContext } from "react";

export const StateContext = createContext();

// state provider uses useReducer.
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// currentUser context.
export const useStateValue = () => useContext(StateContext);