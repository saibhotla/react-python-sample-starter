import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/login/AuthProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './components/login/Login';
import rootReducer from './reducers/rootReducer';
import { createStore } from 'redux';
import App from './components/App';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();