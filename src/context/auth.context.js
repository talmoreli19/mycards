// auth.context.js
import { createContext, useContext, useState } from 'react';
import usersService from '../services/userService';

const AuthContext = createContext();
AuthContext.displayName = 'Auth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(usersService.getUser());

  const login = async (credentials) => {
    const response = await usersService.login(credentials);
    setUser(usersService.getUser());
    return response;
  };

  const logout = () => {
    usersService.logout();
    setUser(null);
  };

  const signUp = async (userData) => {
    const response = await usersService.createUser(userData);
    setUser(usersService.getUser());
    return response;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
