import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const getUserFromStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const initialState = {
    user: getUserFromStorage,
    userDetails: null,
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
