import React, { Component, SyntheticEvent } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/User";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import LoadingRow from "../components/LoadingRow";

class UserIndex extends Component {
    state = {
        isLoading: true,
        fromPageOrder: 1,
        users: []
    }
    page = 1;
    lastPage = 0;

    componentDidMount = async () => {
        this.setState({
            isLoading: true
        });

        const response = await axios.get(`users?page=${this.page}`);

        this.setState({
            isLoading: false,
            users: response.data.data,
            fromPageOrder: response.data.meta.from
        });

        this.lastPage = response.data.meta.last_page;
    }

    nextPage = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (this.page === this.lastPage) return;

        this.page++;

        await this.componentDidMount();
    }

    prevPage = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (this.page === 1) return;

        this.page--;

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
        return this.state.users.map((user: User, index: number) => {
            return (
                <tr key={user.id}>
                    <td>{this.state.fromPageOrder + index}</td>
                    <td>{user.first_name}</td>
                    <td>{user.email}</td>
                    <td>{user.role?.name ?? '-'}</td>
                    <td className="text-end">
                        <Link to={`/users/${user.id}/edit`} className="btn btn-sm btn-success me-1">
                            <Icon.Edit3 size={16} />
                        </Link>
                        <Link to={`/users/${user.id}`} onClick={(e) => this.delete(e, user.id)} className="btn btn-sm btn-danger">
                            <Icon.Trash2 size={16} />
                        </Link>
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
                            {this.state.isLoading ? <LoadingRow colSpan={5} /> : this.renderUserTableContent()}
                        </tbody>
                    </table>
                </div>
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button type="button" className="page-link" onClick={this.prevPage}>Previous</button>
                        </li>
                        <li className="page-item">
                            <button type="button" className="page-link" onClick={this.nextPage}>Next</button>
                        </li>
                    </ul>
                </nav>
            </Wrapper>
        );
    }
}

export default UserIndex;