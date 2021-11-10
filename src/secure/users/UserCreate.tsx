import React, {Component, SyntheticEvent} from 'react';
import {Navigate} from "react-router-dom";
import Wrapper from "../Wrapper";
import axios from "axios";
import {Role} from "../../classes/Role";

class UserCreate extends Component {
    state = {
        roles: [],
        redirect: false
    }
    firstName = '';
    lastName = '';
    email = '';
    roleId = 0;

    componentDidMount = async () => {
        const response = await axios.get('roles');

        this.setState({
            roles: response.data.data
        })
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('users', {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            role_id: this.roleId,
        });

        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/users'} />;
        }

        return (
            <Wrapper>
                <div className="pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h3 fw-bold">Create Users</h1>
                </div>
                <form onSubmit={this.submit}>
                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="floatingFirstName"
                               placeholder="Your first name" required
                               onChange={e => this.firstName = e.target.value} />
                        <label htmlFor="floatingFirstName">First Name</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="floatingLastName"
                               placeholder="Your last name" required
                               onChange={e => this.lastName = e.target.value}/>
                        <label htmlFor="floatingLastName">Last Name</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="email" className="form-control" id="floatingEmail"
                               placeholder="name@example.com" required
                               onChange={e => this.email = e.target.value}/>
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>

                    <div className="mb-2">
                        <label>Role</label>
                        <select name="role_id" className="form-control"
                                onChange={e => this.roleId = parseInt(e.target.value)}>
                            <option>Select Role</option>
                            {this.state.roles.map(
                                (role: Role) => {
                                    return <option key={role.id} value={role.id}>{role.name}</option>
                                }
                            )}
                        </select>
                    </div>
                    <button className="btn btn-primary mt-3" type="submit">Register</button>
                </form>
            </Wrapper>
        );
    }
}

export default UserCreate;