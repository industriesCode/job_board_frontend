import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RoutingComponents from "./Routes";

function App() {

    return (
        <BrowserRouter>
            <RoutingComponents/>
        </BrowserRouter>
    );
}

export default App;