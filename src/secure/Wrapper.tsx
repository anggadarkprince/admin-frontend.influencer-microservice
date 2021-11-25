import React, {Component, Dispatch, PropsWithChildren, SyntheticEvent} from 'react';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import axios from 'axios';
import {Navigate} from "react-router-dom";
import {User} from "../classes/User";
import {connect} from 'react-redux';
import setUser from "../redux/actions/setUserAction";

class Wrapper extends Component<PropsWithChildren<{ user: User, isUserLoading: boolean, isAuthenticated: boolean, setUser: any }>> {
    state = {
        redirectIfUnauthenticated: !this.props.isUserLoading && !this.props.isAuthenticated,
        user: new User()
    }

    componentDidMount = async () => {
        //if (!localStorage.getItem('token')) {
        //    window.location.href = '/login';
        //} else {
            /*try {
                if (this.props.user.id === 0) {
                    const response = await axios.get('user');

                    const user: User = Object.assign(new User(), response.data.data);

                    this.props.setUser(user);

                    this.setState({
                        user: user
                    });
                }
            } catch (e) {
                this.setState({
                    redirect: true
                });
            }*/
        //}
    }

    componentDidUpdate(prevProps: Readonly<React.PropsWithChildren<{ user: User; isUserLoading: boolean; isAuthenticated: boolean; setUser: any }>>) {
        if (!this.props.isUserLoading && !this.props.isAuthenticated) {
            this.setState({
                redirectIfUnauthenticated: true
            });
        }
    }

    handleSignOut = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('logout', {});

        //localStorage.clear();

        this.setState({
            redirectIfUnauthenticated: true
        }, () => {
            this.props.setUser(new User());
        });
    }

    render() {
        if (this.state.redirectIfUnauthenticated) {
            return <Navigate to={'/login'}/>;
        }
        return (
            <>
                <Header handleSignOut={this.handleSignOut}/>
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar handleSignOut={this.handleSignOut}/>

                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: { user: User, isLoading: boolean, isAuthenticated: boolean }) => {
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

const connectToRedux = connect(mapStateToProps, mapDispatchToProps);

export default connectToRedux(Wrapper);