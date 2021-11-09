import React, {Component} from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import {User} from "../../classes/User";
import * as Icon from "react-feather";
import {Link} from "react-router-dom";

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount = async () => {
        const response = await axios.get('users');

        this.setState({
            users: response.data.data
        })
    }

    render() {
        return (
            <Wrapper>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h3 fw-bold">Users</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link to={'/users/create'} className="btn btn-sm btn-primary">
                            <Icon.Plus size={16} className="me-1" />
                            ADD
                        </Link>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col" className="text-end">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map((user: User) => {
                            return (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.name}</td>
                                    <td className="text-end">
                                        <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-success me-1">
                                            <Icon.Edit3 size={16} />
                                        </Link>
                                        <Link to={`/users/${user.id}`} className="btn btn-sm btn-danger">
                                            <Icon.Trash2 size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        );
    }
}

export default Users;