import React, {Component} from 'react';
import './Public.css';
import * as Icon from "react-feather";

class Login extends Component<any, any> {
    render() {
        return (
            <main className="form-signin text-center mt-5">
                <form>
                    <Icon.Lock size={48} className="mb-3 text-primary"/>
                    <h1 className="h3 fw-normal mb-1">Please Sign In</h1>
                    <p className="text-muted mb-4">Continue to admin area</p>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput"
                               placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               placeholder="Password"/>
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