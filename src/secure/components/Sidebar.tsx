import React, {Component, SyntheticEvent} from "react";
import * as Icon from "react-feather";
import {NavLink, Navigate} from "react-router-dom";

class Sidebar extends Component {
    state = {
        redirect: false
    }

    handleSignOut = (e: SyntheticEvent) => {
        e.preventDefault();

        localStorage.clear();

        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/login'}/>;
        }

        return (
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
                <div className="position-sticky p-3">
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link d-flex align-items-center">
                                <Icon.Home size={16} className="me-2"/>
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/users'} className="nav-link d-flex align-items-center">
                                <Icon.Users size={16} className="me-2"/>
                                Users
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center" href="#">
                                <Icon.File size={16} className="me-2"/>
                                Orders
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center" href="#">
                                <Icon.ShoppingCart size={16} className="me-2"/>
                                Products
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center" href="#">
                                <Icon.BarChart2 size={16} className="me-2"/>
                                Reports
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center" href="#">
                                <Icon.Layers size={16} className="me-2"/>
                                Integrations
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center" href="#" onClick={this.handleSignOut}>
                                <Icon.LogOut size={16} className="me-2"/>
                                Sign Out
                            </a>
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
}

export default Sidebar;