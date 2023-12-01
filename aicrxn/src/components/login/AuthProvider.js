 import React, { useState, useEffect, useContext, createContext } from 'react';

const fakeAuth = {
    onAuthStateChanged: (callback) => {
        // Simulate user authentication state change
        const user = { email: 'test@example.com' };
        callback(user);
        return () => {};
    },
    signInWithEmailAndPassword: (email, password) => {
        // Simulate sign in with email and password
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = { email };
                resolve(user);
            }, 1000);
        });
    },
    signOut: () => {
        // Simulate sign out
        return new Promise((resolve, reject) => {
            setTimeout(() => {
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
  
    useEffect(() => {
      const unsubscribe = fakeAuth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          localStorage.removeItem('currentUser');
        }
      });
  
      // Cleanup subscription on unmount
      return unsubscribe;
    }, []);
  
    const login = (email, password) => {
      return fakeAuth.signInWithEmailAndPassword(email, password);
    };
  
    const logout = () => {
      return fakeAuth.signOut().then(() => {
        localStorage.removeItem('currentUser');
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


