import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../actions/index';
import {Link} from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await dispatch(signup(username, password));
        if (response && response.token) {
            localStorage.setItem('token', response.token);
        }
    };

    console.log("Render!")
    return (
        <div>
            <form action="" onSubmit={handleSignup}>
                <h2>Signup</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Signup</button>
            </form>
            <h5>Already have an account? <Link to='/login'>Sign In</Link></h5>
        </div>
    );
};

export default Signup;
