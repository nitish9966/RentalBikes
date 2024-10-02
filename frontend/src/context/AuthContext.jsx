// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: localStorage.getItem("token") || null,
    userType: localStorage.getItem("userType") || null,
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setAuthData({ token: null, userType: null });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    if (token && userType) {
      setAuthData({ token, userType });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authData, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
