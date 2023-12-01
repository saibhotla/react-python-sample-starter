 import React, { useState, useEffect, useContext, createContext } from 'react';

 const fakeAuth = {
  onAuthStateChanged: (callback) => {
    // Simulate user authentication state change
    const user = localStorage.getItem('currentUser') ? { email: 'test@example.com' } : null;
    callback(user);
    return () => {};
  },
  signInWithEmailAndPassword: (email, password) => {
    // Simulate sign in with email and password
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = { email };
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve(user);
      }, 1000);
    });
  },
  signOut: () => {
    // Simulate sign out
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.removeItem('currentUser');
        resolve();
      }, 1000);
    });
  },
};

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  const login = (email, password) => {
    return fakeAuth.signInWithEmailAndPassword(email, password).then((user) => {
      setCurrentUser(user);
      return user;
    });
  };

  const logout = () => {
    return fakeAuth.signOut().then(() => {
      setCurrentUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };


