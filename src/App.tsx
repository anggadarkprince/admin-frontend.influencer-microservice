import React from 'react';
import './App.css';
import Dashboard from "./secure/Dashboard";
import {Routes, Route} from "react-router-dom";
import Users from "./secure/Users";
import Login from "./public/Login";
import Register from "./public/Register";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<Dashboard/>} />
            <Route path={'/users'} element={<Users/>} />
            <Route path={'/login'} element={<Login/>} />
            <Route path={'/register'} element={<Register/>} />
        </Routes>
    </div>
  );
}

export default App;
