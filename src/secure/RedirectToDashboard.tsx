import {Navigate} from "react-router-dom";
import React from "react";

const RedirectToDashboard = () => <Navigate to={'/dashboard'} />;

export default RedirectToDashboard;