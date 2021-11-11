import React, {Component, PropsWithRef, SyntheticEvent} from 'react';
import {Navigate} from "react-router-dom";
import Wrapper from "../Wrapper";
import axios from "axios";
import {Role} from "../../classes/Role";
import {User} from "../../classes/User";
import SectionTitle from "../components/SectionTitle";

class UserEdit extends Component<{match: PropsWithRef<any>}> {
    state = {
        roles: [],
        first_name: '',
        last_name: '',
        email: '',
        role_id: 0,
        redirect: false
    }
    id = 0;
    firstName = '';
    lastName = '';
    email = '';
    roleId = 0;

    componentDidMount = async () => {
        this.id = this.props.match.params.id;

        const rolesCall = await axios.get('roles');

        const userCall = await axios.get(`users/${this.id}`);

        const user: User = userCall.data.data;

        this.setState({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role_id: user.role.id,
            roles: rolesCall.data.data
        })
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

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
                <SectionTitle title="Edit User"/>
                <form onSubmit={this.submit}>
                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="floatingFirstName"
                               placeholder="Your first name" required
                               defaultValue={this.firstName = this.state.first_name}
                               onChange={e => this.firstName = e.target.value} />
                        <label htmlFor="floatingFirstName">First Name</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="text" className="form-control" id="floatingLastName"
                               placeholder="Your last name" required
                               defaultValue={this.lastName = this.state.last_name}
                               onChange={e => this.lastName = e.target.value}/>
                        <label htmlFor="floatingLastName">Last Name</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="email" className="form-control" id="floatingEmail"
                               placeholder="name@example.com" required
                               defaultValue={this.email = this.state.email}
                               onChange={e => this.email = e.target.value}/>
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>

                    <div className="mb-2">
                        <label>Role</label>
                        <select name="role_id" className="form-control"
                                value={this.roleId = this.state.role_id}
                                onChange={e => this.roleId = parseInt(e.target.value)}>
                            <option>Select Role</option>
                            {this.state.roles.map(
                                (role: Role) => {
                                    return <option key={role.id} value={role.id}>{role.name}</option>
                                }
                            )}
                        </select>
                    </div>
                    <button className="btn btn-primary mt-3" type="submit">Update</button>
                </form>
            </Wrapper>
        );
    }
}

export default UserEdit;