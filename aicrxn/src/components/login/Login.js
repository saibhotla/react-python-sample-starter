import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password)
      .catch((error) => {
        console.error(error);
        // Handle login error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
}

export default Login;