import React from "react";
import {Route, Routes} from "react-router-dom";
import RoleCreate from "./RoleCreate";
import RoleEdit from "./RoleEdit";
import RoleIndex from "./RoleIndex";

function Roles() {
    return (
        <Routes>
            <Route path={'/'} element={<RoleIndex/>} />
            <Route path={'create'} element={<RoleCreate/>} />
            <Route path={':id/edit'} element={<RoleEdit/>} />
        </Routes>
    );
}

export default Roles;