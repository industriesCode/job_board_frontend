import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../actions/index';
import { login } from "../reducers/index";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await dispatch(signin(username, password));

        if (response && response.token) {
            localStorage.setItem('token', response.token);
            dispatch(
                login({
                    username: username,
                    loggedIn: true
                })
            );
            navigate('/');
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <form action="" onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
            <h5>Don't have an account? <Link to='/signUp'>Sign Up</Link></h5>
        </div>
    );
};

export default Login;
