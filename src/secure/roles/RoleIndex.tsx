import React, { Component } from 'react';
import axios from "axios";
import { Role } from "../../classes/Role";
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import Delete from "../components/Delete";
import Edit from "../components/Edit";
import LoadingRow from "../components/LoadingRow";
import {User} from "../../classes/User";
import {connect} from "react-redux";
import SectionTitleAction from "../components/SectionTitleAction";

class RoleIndex extends Component<{user: User}> {
    state = {
        isLoading: true,
        roles: []
    }

    componentDidMount = async () => {
        document.title = 'Roles';

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
        if (this.state.roles.length === 0) {
            return <tr><td colSpan={3}>No data available</td></tr>
        }
        return this.state.roles.map((role: Role, index: number) => {
            return (
                <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>{role.name}</td>
                    <td className="text-md-end">
                        {
                            this.props.user.canEdit('roles') &&
                            <Edit id={role.id} endpoint={'/roles'}/>
                        }
                        {
                            this.props.user.canDelete('roles') &&
                            <Delete id={role.id} endpoint={'/roles'} handleDelete={this.handleDelete}/>
                        }
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Wrapper>
                <SectionTitleAction title={"Roles"}>
                    {
                        this.props.user.canCreate('roles') &&
                        <Link to={'/roles/create'} className="btn btn-sm btn-primary">
                            <Icon.Plus size={16} className="me-1"/>
                            ADD
                        </Link>
                    }
                </SectionTitleAction>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th className="text-md-end">Action</th>
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

const mapStateToProps = (state: {user: User}) => {
    return {
        user: state.user
    }
}

const connectToRedux = connect(mapStateToProps);

export default connectToRedux(RoleIndex);