import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../actions/index';
import { login } from "../reducers/index";
import { Link, useNavigate } from "react-router-dom";

import { Container, TextField, Button, Typography } from '@mui/material';

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
            navigate('/')
        }
    };

    useEffect(() => {
        let auth = localStorage.getItem('token');
        if (auth) {
            navigate("/")
        }
    }, [])


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container maxWidth="xs">
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 3 }}
                    >
                        Sign In
                    </Button>
                </form>
                <h5>Don't have an account? <Link to='/signUp'>Sign Up</Link></h5>
            </Container>
        </div>
    );
};

export default Login;
