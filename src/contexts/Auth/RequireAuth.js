import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "./AuthContext";
export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useContext(AuthContext);
  if (!auth.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};
