import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../actions/index';
import { Link, useNavigate } from "react-router-dom";

import { Container, TextField, Button, Typography } from '@mui/material';

const Login = () => {
    /*
        This code defines a React component named `Login`, which is responsible for rendering a login form and handling
        user authentication.

        ### Dependencies:
        - React: JavaScript library for building user interfaces.
        - react-redux: Library for managing application state in React.
        - @mui/material: Material-UI library for React components.
        - react-router-dom: Library for declarative routing in React applications.
    */

    // Hook from `react-redux` used to dispatch actions.
    const dispatch = useDispatch();

    // Hook from `react-router-dom` used to navigate between routes.
    const navigate = useNavigate();

    /*
        - State:
        - `username`: Stores the value of the username input field.
        - `password`: Stores the value of the password input field.
    */
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async (e) => {
        /*
            Handles the form submission event. Dispatches a `signin` action with the provided username and password.
            If authentication is successful, stores the user data and token in local storage and navigates to the
            dashboard.
         */
        e.preventDefault();
        const response = await dispatch(signin(username, password));


        if (response && response.token) {
            const userData = {
                'username': response.username,
                'pk': response.user_pk
            }
            // Uses local storage to store authentication token and user data upon successful login.
            localStorage.setItem('token', response.token);
            localStorage.setItem('userData', JSON.stringify(userData));

            // Navigates to the signup page when the "Sign Up" link is clicked.
            navigate('/')
        }
    };

    useEffect(() => {
        /*
            Executes the provided callback function when the component mounts.
            Checks if the user is already authenticated by checking the presence of a token in local storage.
            If authenticated, navigates to the dashboard.
        */
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
