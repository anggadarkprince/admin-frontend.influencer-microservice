import React from "react";
import * as Icon from "react-feather";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {User} from "../../classes/User";

const Header = (props: { user: User, handleSignOut: any }) => (
    <header className="navbar navbar-light navbar-expand sticky-top bg-light p-0 shadow">
        <Link to={'/dashboard'} className="navbar-brand bg-dark text-light col-md-3 col-lg-2 me-0 px-3">
            <Icon.Activity size={24} className="me-2" />Adminer
        </Link>
        <button className="navbar-togglers position-absolutes d-md-none collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
        <div className="navbar-nav">
            <li className="nav-item dropdown me-2">
                <a className="nav-link dropdown-toggle" href="/profile" id="navbarDropdown" role="button"
                   data-bs-toggle="dropdown" aria-expanded="false">
                    {props.user?.name || 'My Account'}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                        <Link to={'/profile'} className="dropdown-item">
                            <Icon.User size={16} className="me-2" />Profile
                        </Link>
                    </li>
                    <li><hr className="dropdown-divider"/></li>
                    <li>
                        <Link to={'/logout'} className="dropdown-item" onClick={props.handleSignOut}>
                            <Icon.LogOut size={16} className="me-2" />Sign Out
                        </Link>
                    </li>
                </ul>
            </li>
        </div>
    </header>
);

const mapStateToProps = (state: {user: User}) => {
    return {
        user: state.user
    }
}

const connectToRedux = connect(mapStateToProps);

export default connectToRedux(Header);