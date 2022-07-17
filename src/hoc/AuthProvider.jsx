import { createContext, useState } from 'react';
export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const signIn = (newUser, callback) => {
    console.log('loggined', newUser);
    setUser(newUser);
  };
  const signOut = (callback) => {
    setUser(null);
    localStorage.clear();
    if (callback) {
      callback();
    }
  };
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
