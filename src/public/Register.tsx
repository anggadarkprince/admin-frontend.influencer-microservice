import React, {Component, SyntheticEvent} from 'react';
import './Public.css';
import * as Icon from "react-feather";
import axios from "axios";
import {Link, Navigate} from 'react-router-dom';

class Register extends Component {
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    passwordConfirm = '';

    state = {
        redirect: false
    }

    submitRegisterData = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('register', {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirm: this.passwordConfirm
        });

        this.setState({
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/login'} />;
        }

        return (
            <main className="form-signup text-center mt-5">
                <form onSubmit={this.submitRegisterData}>
                    <Icon.Lock size={48} className="mb-3 text-primary"/>
                    <h1 className="h3 fw-normal mb-1">Register</h1>
                    <p className="text-muted mb-4">Registering your account</p>

                    <div className="row gx-2">
                        <div className="col">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingFirstName"
                                       placeholder="Your first name" required
                                       onChange={e => this.firstName = e.target.value} />
                                <label htmlFor="floatingFirstName">First Name</label>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="floatingLastName"
                                       placeholder="Your last name" required
                                       onChange={e => this.lastName = e.target.value}/>
                                <label htmlFor="floatingLastName">Last Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="email" className="form-control" id="floatingEmail"
                               placeholder="name@example.com" required
                               onChange={e => this.email = e.target.value}/>
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password" required
                               onChange={e => this.password = e.target.value}/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPasswordConfirmation"
                               placeholder="Confirm your password" required
                               onChange={e => this.passwordConfirm = e.target.value}/>
                        <label htmlFor="floatingPasswordConfirmation">Password Confirmation</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Register</button>
                    <p className="mt-3">Already have an account? <Link to="/login">Login here</Link></p>
                    <p className="mt-4 mb-3 text-muted">&copy; Copyright all rights reserved</p>
                </form>
            </main>
        );
    }
}

export default Register;