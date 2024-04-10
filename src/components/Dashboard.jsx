import React, { useState } from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUSer} from "../reducers";

const Login = () => {
    const user = useSelector(selectUSer)

    const handleLogout = () => {
        localStorage.removeItem('token')
        return <Navigate to="/login" />
    }
    return (
        <div>
            <h2>Hi {}, welcome to the Job Board.</h2>
            <span onClick={handleLogout}>LogOut</span>
        </div>
    );
};

export default Login;
