import React from "react";
import {Route, Routes} from "react-router-dom";
import UserCreate from "./UserCreate";
import UserEdit from "./UserEdit";
import UserIndex from "./UserIndex";

function Users() {
    return (
        <Routes>
            <Route path={'/'} element={<UserIndex/>} />
            <Route path={'create'} element={<UserCreate/>} />
            <Route path={':id/edit'} element={<UserEdit/>} />
        </Routes>
    );
}

export default Users;