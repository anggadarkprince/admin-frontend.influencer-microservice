import React, { Component, SyntheticEvent } from 'react';
import { Navigate, useParams } from "react-router-dom";
import Wrapper from "../Wrapper";
import axios from "axios";
import { Role } from "../../classes/Role";
import { User } from "../../classes/User";
import SectionTitle from "../components/SectionTitle";

class UserEdit extends Component<{ params: any }> {
    state = {
        isSubmitting: false,
        isLoading: true,
        roles: [],
        firstName: '',
        lastName: '',
        email: '',
        roleId: 0,
        redirect: false
    }
    id = 0;
    firstName = '';
    lastName = '';
    email = '';
    roleId = 0;

    componentDidMount = async () => {
        this.id = this.props.params.id;

        const rolesCall = await axios.get('roles');

        const userCall = await axios.get(`users/${this.id}`);

        const user: User = userCall.data.data;

        this.setState({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            roleId: user.role.id,
            roles: rolesCall.data.data,
            isLoading: false,
        })
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        this.setState({
            isSubmitting: true
        })

        await axios.put(`users/${this.id}`, {
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
                <SectionTitle title="Edit User" isLoading={this.state.isLoading} />
                <form onSubmit={this.submit}>
                    <fieldset disabled={this.state.isSubmitting || this.state.isLoading}>
                        <div className="row">
                            <div className="col">
                                <div className="mb-2">
                                    <label htmlFor="floatingFirstName" className="mb-2">First Name</label>
                                    <input type="text" className="form-control" id="floatingFirstName"
                                        placeholder="Your first name" required
                                        defaultValue={this.firstName = this.state.firstName}
                                        onChange={e => this.firstName = e.target.value} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="floatingLastName" className="mb-2">Last Name</label>
                                    <input type="text" className="form-control" id="floatingLastName"
                                        placeholder="Your last name" required
                                        defaultValue={this.lastName = this.state.lastName}
                                        onChange={e => this.lastName = e.target.value} />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="floatingEmail" className="mb-2">Email address</label>
                            <input type="email" className="form-control" id="floatingEmail"
                                placeholder="name@example.com" required
                                defaultValue={this.email = this.state.email}
                                onChange={e => this.email = e.target.value} />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="role_id" className="mb-2">Role</label>
                            <select name="role_id" id="role_id" className="form-control"
                                value={this.state.roleId}
                                onChange={e => {
                                    this.roleId = parseInt(e.target.value);
                                    this.setState({
                                        role_id: this.roleId
                                    });
                                }}>
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
                                    Updating...
                                </button>
                            )
                            : <button className="btn btn-primary mt-3" type="submit">Update</button>
                        }
                    </fieldset>
                </form>
            </Wrapper>
        );
    }
}

function UserWithParam() {
    let params = useParams();

    return <UserEdit params={params} />
}

export default UserWithParam;