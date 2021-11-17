import React from "react";
import * as Icon from "react-feather";

const Header = (props: any) => (
    <header className="navbar navbar-light sticky-top bg-light flex-md-nowrap p-0 shadow">
        <a className="navbar-brand bg-dark text-light col-md-3 col-lg-2 me-0 px-3" href="#">
            <Icon.Activity size={24} className="me-2" />Adminer
        </a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
        <div className="navbar-nav">
            <div className="nav-item text-nowrap">
                <a className="nav-link px-3" href="/logout" onClick={props.handleSignOut}>
                    Sign Out
                    <Icon.LogOut size={16} className="ms-2" />
                </a>
            </div>
        </div>
    </header>
);

export default Header;