import React, {Component, useState} from "react";
import * as Icon from "react-feather";
import {NavLink, useLocation} from "react-router-dom";

function Sidebar(props: any) {
    const location = useLocation();
    const isUserAccessOpen = ['/users', '/roles'].some(path => location.pathname.includes(path));
    const [userAccess, setUserAccess] = useState(isUserAccessOpen);

    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
            <div className="position-sticky p-3">
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link d-flex align-items-center">
                            <Icon.Home size={16} className="me-2"/>
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="#submenu-auth" className="nav-link d-flex pe-1 align-items-center" data-bs-toggle="collapse" onClick={() => setUserAccess(!userAccess)}>
                            <Icon.Shield size={16} className="me-2"/>
                            User Access
                            {
                                userAccess
                                    ? <Icon.ChevronUp size={16} className="ms-auto mt-2"/>
                                    : <Icon.ChevronDown size={16} className="ms-auto mt-2"/>
                            }
                        </a>
                        <ul className={`ps-4 mb-2 collapse ${isUserAccessOpen ? 'show' : ''}`} id="submenu-auth">
                            <li className="nav-item">
                                <NavLink to={'/users'} className="nav-link d-flex align-items-center">
                                    <Icon.Users size={16} className="me-2"/>
                                    Users
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/roles'} className="nav-link d-flex align-items-center">
                                    <Icon.Lock size={16} className="me-2"/>
                                    Roles
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <NavLink to={'/products'} className="nav-link d-flex align-items-center">
                            <Icon.ShoppingCart size={16} className="me-2"/>
                            Products
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/orders'} className="nav-link d-flex align-items-center">
                            <Icon.File size={16} className="me-2"/>
                            Orders
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/reports'} className="nav-link d-flex align-items-center">
                            <Icon.BarChart2 size={16} className="me-2"/>
                            Reports
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/logout'} className="nav-link d-flex align-items-center" onClick={props.handleSignOut}>
                            <Icon.LogOut size={16} className="me-2"/>
                            Logout
                        </NavLink>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Saved reports</span>
                    <a className="link-secondary" href="#" aria-label="Add a new report">
                        <Icon.PlusCircle size={16} className="me-2"/>
                    </a>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <a className="nav-link d-flex align-items-center" href="#">
                            <Icon.FileText size={16} className="me-2"/>
                            Current month
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link d-flex align-items-center" href="#">
                            <Icon.FileText size={16} className="me-2"/>
                            Last quarter
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;