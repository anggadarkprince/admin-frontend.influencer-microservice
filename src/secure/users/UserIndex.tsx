import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/User";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import LoadingRow from "../components/LoadingRow";
import Paginator from "../components/Paginator";
import {connect} from "react-redux";
import SectionTitleAction from "../components/SectionTitleAction";

class UserIndex extends Component<{user: User}> {
    state = {
        isLoading: true,
        fromPageOrder: 1,
        lastPage: 1,
        users: []
    }
    page = 1;

    componentDidMount = async () => {
        document.title = 'Users';

        this.setState({
            isLoading: true
        });

        const response = await axios.get(`users?page=${this.page}`);

        this.setState({
            isLoading: false,
            users: response.data.data,
            fromPageOrder: response.data.meta.from,
            lastPage: response.data.meta.last_page
        });
    }

    handlePageChange = async (page: number) => {
        this.page = page;

        await this.componentDidMount();
    }

    delete = async (e: SyntheticEvent, id: number) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this user?")) {
            await axios.delete(`users/${id}`);

            this.setState({
                users: this.state.users.filter((user: User) => user.id !== id)
            });
        }
    }

    renderUserTableContent() {
        if (this.state.users.length === 0) {
            return <tr><td colSpan={5}>No data available</td></tr>
        }
        return this.state.users.map((user: User, index: number) => {
            return (
                <tr key={user.id}>
                    <td>{this.state.fromPageOrder + index}</td>
                    <td>{user.first_name}</td>
                    <td>{user.email}</td>
                    <td>{user.role?.name ?? '-'}</td>
                    <td className="text-md-end">
                        {
                            this.props.user.canEdit('users') &&
                            <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-success me-1">
                                <Icon.Edit3 size={16} />
                            </Link>
                        }
                        {
                            this.props.user.canDelete('users') &&
                            <Link to={`/users/${user.id}`} onClick={(e) => this.delete(e, user.id)}
                                  className="btn btn-sm btn-danger">
                                <Icon.Trash2 size={16}/>
                            </Link>
                        }
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Wrapper>
                <SectionTitleAction title={"Users"}>
                    {
                        this.props.user.canCreate('users') &&
                        <Link to={'/users/create'} className="btn btn-sm btn-primary">
                            <Icon.Plus size={16} className="me-1"/>
                            ADD
                        </Link>
                    }
                </SectionTitleAction>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col" className="text-md-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isLoading ? <LoadingRow colSpan={5} /> : this.renderUserTableContent()}
                        </tbody>
                    </table>
                </div>
                
                <Paginator lastPage={this.state.lastPage} handlePageChange={this.handlePageChange} />
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

export default connectToRedux(UserIndex);