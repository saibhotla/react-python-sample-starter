import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { connect } from 'react-redux';
import LoginAction from '../actions/LoginAction';
import { useSelector, useDispatch } from 'react-redux';
const rootElement = document.getElementById('root');


const Login = () => {
    const currentUser = useSelector(state => state.currentUser)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
        const [isLogged, setIsLogged] = useState(false);
            const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Username:', username);
        console.log('Password:', password);
        setIsLogged(true);
        
        dispatch(LoginAction.setUser(username))
        handleSuccess();
    };

    const handleSuccess = () => {
        // Add your success logic here
        console.log('Login successful');

    };

    return (
        <div className="Login">{
            !currentUser.loggedIn ? 
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
        :
        <App></App>
}
    </div>
        );
    
};

export default Login;
