import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../actions/index';
import {Link, useNavigate} from "react-router-dom";
import {Button, Container, TextField, Typography} from "@mui/material";

const Signup = () => {
    // Renders a sign-up form and handles user registration.

    /*
        Hooks:
            useDispatch: Hook from react-redux used to dispatch actions.
            useNavigate: Hook from react-router-dom used to navigate between routes.
    */
    const dispatch = useDispatch();
    const navigate = useNavigate()

    /*
        State:
            username: Stores the value of the username input field.
            password: Stores the value of the password input field.
    */
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        /*
             Checks if the user is already authenticated by checking the presence of a token in local storage.
             If authenticated, navigates to the dashboard.
         */
        let auth = localStorage.getItem('token');
        if (auth) {
            navigate("/")
        }
    }, [])


    const handleSignup = async (e) => {
        /*
             Handles the form submission event. Dispatches a signup action with the provided username and password.
             If registration is successful, stores the authentication token in local storage and navigates to the
             dashboard.
         */
        e.preventDefault();
        const response = await dispatch(signup(username, password));
        if (response && response.token) {
            localStorage.setItem('token', response.token);
            navigate('/')
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container maxWidth="xs">
                <Typography variant="h4" align="center" gutterBottom>
                    SignUp
                </Typography>
                <form onSubmit={handleSignup}>
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
                        Sign Up
                    </Button>
                </form>
                <h5>Already have an account? <Link to='/login'>Sign In</Link></h5>
            </Container>
        </div>
    );
};

export default Signup;
