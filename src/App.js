import './App.css';
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
    /*
        Purpose: Acts as the main component for the application, providing routing functionality using React Router.
        Dependencies:
            React: JavaScript library for building user interfaces.
            react-router-dom: Library for declarative routing in React applications.
        Routes:
            login: Renders the Login component when the URL matches /login.
            signup: Renders the Signup component when the URL matches /signup.
            /: Renders the Dashboard component when the URL matches /.
    */
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;