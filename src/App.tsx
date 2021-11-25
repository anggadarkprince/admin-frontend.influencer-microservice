import React, {Component, Dispatch} from 'react';
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
import axios from "axios";
import {User} from "./classes/User";
import setUser from "./redux/actions/setUserAction";
import {connect} from "react-redux";
import Reports from "./secure/reports/Reports";
import ReportCurrentMonth from "./secure/reports/ReportCurrentMonth";
import ReportLastQuarter from "./secure/reports/ReportLastQuarter";

class App extends Component<{ user: User, isUserLoading: boolean, isAuthenticated: boolean, setUser: any }> {

    componentDidMount = async () => {
        if (!this.props.isAuthenticated && this.props.isUserLoading && this.props.user.id === 0) {
            try {
                const response = await axios.get('user');

                const user: User = Object.assign(new User(), response.data.data);

                this.props.setUser(user);
            } catch (e) {
                this.props.setUser(new User());
            }
        }
    }

    render() {
        return (
            <div className="App">
                <Routes>
                    <Route path={'/'} element={<RedirectToDashboard/>}/>
                    <Route path={'/dashboard'} element={<Dashboard/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/users/*'} element={<Users/>}/>
                    <Route path={'/roles/*'} element={<Roles/>}/>
                    <Route path={'/products/*'} element={<Products/>}/>
                    <Route path={'/orders'} element={<Orders/>}/>
                    <Route path={'/orders/:id'} element={<OrderItems/>}/>
                    <Route path={'/reports/*'} element={<Reports/>}/>
                    <Route
                        path="*"
                        element={
                            <main className="text-center" style={{padding: "1rem"}}>
                                <h1 className="text-danger">404</h1>
                                <p className="h4">Page Not Found!</p>
                            </main>
                        }
                    />
                </Routes>
            </div>
        );
    }
}

const mapStateToProps = (state: {user: User, isLoading: boolean, isAuthenticated: boolean}) => {
    return {
        user: state.user,
        isUserLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

const connectToRedux = connect(mapStateToProps, mapDispatchToProps)

export default connectToRedux(App);
