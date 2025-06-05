import { Navigate, useLocation } from "react-router-dom";
import React from "react";

const isAuthenticated = () => {
  return true;
};

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
