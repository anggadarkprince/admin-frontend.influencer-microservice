import React, {Component} from 'react';
import axios from "axios";
import {Role} from "../../classes/Role";
import Wrapper from "../Wrapper";
import {Link} from "react-router-dom";
import * as Icon from "react-feather";
import Delete from "../components/Delete";
import Edit from "../components/Edit";

class Roles extends Component {
    state = {
        roles: []
    }

    componentDidMount = async () => {
        const response = await axios.get('roles');

        this.setState({
            roles: response.data.data
        });
    }

    handleDelete = async (id: number) => {
        this.setState({
            roles: this.state.roles.filter((r: Role) => r.id !== id)
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
                            <Icon.Plus size={16} className="me-1"/>
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
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.roles.map(
                            (role: Role) => {
                                return (
                                    <tr key={role.id}>
                                        <td>{role.id}</td>
                                        <td>{role.name}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <Edit id={role.id} endpoint={'roles'} />
                                                <Delete id={role.id} endpoint={'roles'} handleDelete={this.handleDelete}/>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        );
    }
}

export default Roles;