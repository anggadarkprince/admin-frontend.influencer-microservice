import React, { Component } from 'react';
import axios from "axios";
import { Role } from "../../classes/Role";
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import Delete from "../components/Delete";
import Edit from "../components/Edit";
import LoadingRow from "../components/LoadingRow";

class RoleIndex extends Component {
    state = {
        isLoading: true,
        roles: []
    }

    componentDidMount = async () => {
        this.setState({
            isLoading: true
        });

        const response = await axios.get('roles');

        this.setState({
            isLoading: false,
            roles: response.data.data,
        });
    }

    handleDelete = async (id: number) => {
        this.setState({
            roles: this.state.roles.filter((r: Role) => r.id !== id)
        })
    }

    renderRoleTableContent() {
        return this.state.roles.map((role: Role, index: number) => {
            return (
                <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>{role.name}</td>
                    <td className="text-end">
                        <Edit id={role.id} endpoint={'/roles'} />
                        <Delete id={role.id} endpoint={'/roles'} handleDelete={this.handleDelete} />
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Wrapper>
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h3 fw-bold">Roles</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link to={'/roles/create'} className="btn btn-sm btn-primary">
                            <Icon.Plus size={16} className="me-1" />
                            ADD
                        </Link>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isLoading ? <LoadingRow colSpan={3} /> : this.renderRoleTableContent()}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        );
    }
}

export default RoleIndex;