import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../actions/index';
import {Link, useNavigate} from "react-router-dom";
import {Button, Container, TextField, Typography} from "@mui/material";

const Signup = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        let auth = localStorage.getItem('token');
        if (auth) {
            navigate("/")
        }
    }, [])


    const handleSignup = async (e) => {
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
