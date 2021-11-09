import React, {Component, SyntheticEvent} from 'react';
import './Public.css';
import * as Icon from "react-feather";
import axios from "axios";
import {Navigate} from "react-router-dom";

class Login extends Component<any, any> {
    email = '';
    password = '';
    state = {
        redirect: false
    }

    submitLoginForm = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.post('login', {
            email: this.email,
            password: this.password
        });

        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/'} />;
        }
        return (
            <main className="form-signin text-center mt-5">
                <form onSubmit={this.submitLoginForm}>
                    <Icon.Lock size={48} className="mb-3 text-primary"/>
                    <h1 className="h3 fw-normal mb-1">Please Sign In</h1>
                    <p className="text-muted mb-4">Continue to admin area</p>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInputEmail"
                               placeholder="name@example.com"
                        onChange={e => this.email = e.target.value}/>
                        <label htmlFor="floatingInputEmail">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password"
                               onChange={e => this.email = e.target.value}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign in</button>
                    <p className="mt-4 mb-3 text-muted">&copy; Copyright all rights reserved</p>
                </form>
            </main>
        );
    }
}

export default Login;