 import React, { useState, useEffect, useContext, createContext } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { setUser, clearUser } from '../../reducers/userSlice';
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

export const AuthContext = createContext({
  logout: () => {},
});

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);
  
  const login = (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    return fetch('http://localhost:8000/login', {
      method: 'POST',
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      body: formData,
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      sessionStorage.setItem('currentUser', JSON.stringify(email));
      dispatch(setUser(email)); // Or get user data from data
      return { email };
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  };


  const logout = () => {
    return fetch('http://localhost:8000/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(() => {
      sessionStorage.removeItem('currentUser');
      dispatch(clearUser())
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

export {  AuthProvider, useAuth };


