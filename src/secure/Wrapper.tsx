import React, {Component, SyntheticEvent} from 'react';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import axios from 'axios';
import {Navigate} from "react-router-dom";

class Wrapper extends Component {
    state = {
        redirect: false
    }

    componentDidMount = async () => {
        try {
            const response = await axios.get('user')
            console.log(response);
        } catch(e) {
            this.setState({
                redirect: true
            });
        }
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
            return <Navigate to={'/login'} />;
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

export default Wrapper;