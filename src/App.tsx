import React from 'react';
import './App.css';
import Dashboard from "./secure/Dashboard";
import {Routes, Route} from "react-router-dom";
import Users from "./secure/users/Users";
import UserCreate from "./secure/users/UserCreate";
import UserEdit from "./secure/users/UserEdit";
import Login from "./public/Login";
import Register from "./public/Register";
import RedirectToDashboard from "./secure/RedirectToDashboard";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<RedirectToDashboard/>} />
            <Route path={'/dashboard'} element={<Dashboard/>} />
            <Route path={'/login'} element={<Login/>} />
            <Route path={'/register'} element={<Register/>} />
            <Route path={'/users'} element={<Users/>} />
            <Route path={'/users/create'} element={<UserCreate/>} />
            <Route path={'/users/:id/edit'} element={<UserEdit/>} />
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>Page Not Found!</p>
                    </main>
                }
            />
        </Routes>
    </div>
  );
}

export default App;
