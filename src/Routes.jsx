import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from "./components/Signup";

const RoutingComponents = () => {
    const token = localStorage.getItem('token');

    return (
        <Routes>
            {token ? (
                <>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route exact path="/login" element={<Dashboard />} />
                </>
            ) : (
                <>
                    <Route exact path="/" element={<Navigate to="/login" />} />
                    <Route exact path="/login" element={<Login />} />
                </>
            )}
            <Route exact path="/signup" element={<Signup />} />
        </Routes>
    );
};

export default RoutingComponents;

