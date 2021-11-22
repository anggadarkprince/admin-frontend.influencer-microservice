import React, { Component, SyntheticEvent } from 'react';
import { Navigate } from "react-router-dom";
import Wrapper from "../Wrapper";
import axios from "axios";
import { Role } from "../../classes/Role";
import SectionTitle from "../components/SectionTitle";

class UserCreate extends Component {
    state = {
        isSubmitting: false,
        roles: [],
        redirect: false
    }
    firstName = '';
    lastName = '';
    email = '';
    roleId = 0;

    componentDidMount = async () => {
        document.title = 'Create User';

        const response = await axios.get('roles');

        this.setState({
            roles: response.data.data
        })
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        this.setState({
            isSubmitting: true
        })

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
                <SectionTitle title="Create User" />
                <form onSubmit={this.submit}>
                    <fieldset disabled={this.state.isSubmitting}>
                        <div className="row">
                            <div className="col">
                                <div className="mb-2">
                                    <label htmlFor="floatingFirstName" className="mb-2">First Name</label>
                                    <input type="text" className="form-control" id="floatingFirstName"
                                        placeholder="Your first name" required
                                        onChange={e => this.firstName = e.target.value} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="floatingLastName" className="mb-2">Last Name</label>
                                    <input type="text" className="form-control" id="floatingLastName"
                                        placeholder="Your last name" required
                                        onChange={e => this.lastName = e.target.value} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="floatingEmail" className="mb-2">Email address</label>
                            <input type="email" className="form-control" id="floatingEmail"
                                placeholder="name@example.com" required
                                onChange={e => this.email = e.target.value} />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="role_id" className="mb-2">Role</label>
                            <select name="role_id" id="role_id" className="form-select"
                                onChange={e => this.roleId = parseInt(e.target.value)}>
                                <option>Select Role</option>
                                {this.state.roles.map(
                                    (role: Role) => {
                                        return <option key={role.id} value={role.id}>{role.name}</option>
                                    }
                                )}
                            </select>
                        </div>
                        
                        {this.state.isSubmitting
                            ? (
                                <button className="btn btn-primary mt-3" disabled type="submit">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Saving...
                                </button>
                            )
                            : <button className="btn btn-primary mt-3" type="submit">Save</button>
                        }
                    </fieldset>
                </form>
            </Wrapper>
        );
    }
}

export default UserCreate;