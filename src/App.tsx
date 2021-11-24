import React from 'react';
import './App.css';
import Dashboard from "./secure/Dashboard";
import {Routes, Route} from "react-router-dom";
import Users from "./secure/users/Users";
import Login from "./public/Login";
import Register from "./public/Register";
import RedirectToDashboard from "./secure/RedirectToDashboard";
import Roles from "./secure/roles/Roles";
import Products from "./secure/products/Products";
import Orders from "./secure/orders/Orders";
import OrderItems from "./secure/orders/OrderItems";
import Profile from "./secure/profile/Profile";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path={'/'} element={<RedirectToDashboard/>} />
            <Route path={'/dashboard'} element={<Dashboard/>} />
            <Route path={'/profile'} element={<Profile/>} />
            <Route path={'/login'} element={<Login/>} />
            <Route path={'/register'} element={<Register/>} />
            <Route path={'/users/*'} element={<Users/>} />
            <Route path={'/roles/*'} element={<Roles/>} />
            <Route path={'/products/*'} element={<Products/>} />
            <Route path={'/orders'} element={<Orders/>} />
            <Route path={'/orders/:id'} element={<OrderItems/>} />
            <Route
                path="*"
                element={
                    <main className="text-center" style={{ padding: "1rem" }}>
                        <h1 className="text-danger">404</h1>
                        <p className="h4">Page Not Found!</p>
                    </main>
                }
            />
        </Routes>
    </div>
  );
}

export default App;
