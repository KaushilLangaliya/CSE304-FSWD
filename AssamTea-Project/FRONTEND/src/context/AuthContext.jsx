// src/context/AuthContext.jsx
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState({ name: 'Admin' });
  const [user, setUser] = useState({ name: 'User' });
  const [userOrders, setUserOrders] = useState([]); // <-- Add this line

  return (
    <AuthContext.Provider
      value={{
        admin,
        setAdmin,
        user,
        setUser,
        userOrders,
        setUserOrders, // <-- And this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
