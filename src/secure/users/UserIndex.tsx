import React, {ChangeEvent, Component, SyntheticEvent} from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/User";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import queryString from "query-string";
import LoadingRow from "../components/LoadingRow";
import Paginator from "../components/Paginator";
import {connect} from "react-redux";
import SectionTitleAction from "../components/SectionTitleAction";
import {Role} from "../../classes/Role";
import {useNavigate} from "react-router-dom";
import {NavigateFunction} from "react-router";

class UserIndex extends Component<{user: User, navigate: NavigateFunction}> {
    params = queryString.parse(window.location.search);
    initialFilterState = {
        search: '',
        role: '',
        ...this.params
    }
    state = {
        isMounted: false,
        isLoading: true,
        fromPageOrder: 1,
        lastPage: 1,
        users: [],
        roles: [],
        filters: this.initialFilterState
    }
    page = 1;

    constructor(props: {user: User, navigate: NavigateFunction}) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        window.onpopstate = () => {
            if (this.state.isMounted) {
                this.params = queryString.parse(window.location.search);
                this.setState({
                    filters: {
                        ...this.initialFilterState,
                        ...this.params
                    }
                }, () => {
                    this.onFilterUpdated(true);
                })
            }
        }
    }

    componentDidMount = async () => {
        document.title = 'Users';

        this.setState({
            isMounted: true,
            isLoading: true
        });

        this.fetchUsers();

        const roles = await axios.get(`roles`);

        this.setState({
            isLoading: false,
            roles: roles.data.data
        });
    }

    fetchUsers = () => {
        this.setState({
            isLoading: true
        });

        const filteredData = {...this.state.filters, page: this.page}
        axios.get(`users`, {params: filteredData})
            .then((response) => {
                this.setState({
                    isLoading: false,
                    users: response.data.data,
                    fromPageOrder: response.data.meta.from,
                    lastPage: response.data.meta.last_page,
                });
            })
            .catch(console.log);
    }

    applyFilter = () => {
        const modalEl = document.getElementById('filter-modal')
        // @ts-ignore
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();

        this.onFilterUpdated();
    }

    onFilterUpdated = (isBack = false) => {
        const {filters} = this.state;

        const filterParams = queryString.stringify({
            ...(filters.search && {search: filters.search}),
            ...(filters.role && {role: filters.role}),
        });

        if (!isBack) {
            this.props.navigate((filterParams ? '?' + filterParams : ''))
        }

        this.fetchUsers();
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

    handleChange(event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const name = event.target.name;
        const value = event.currentTarget.value;

        this.setState((prevState: any) => {
            return {
                filters: {
                    ...prevState.filters,
                    [name]: value
                }
            }
        });
    }

    render() {
        return (
            <Wrapper>
                <SectionTitleAction title={"Users"}>
                    <button className="btn btn-sm btn-primary me-1" data-bs-toggle="modal" data-bs-target="#filter-modal">
                        <Icon.Filter size={16}/>
                    </button>
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

                <div className="modal" id="filter-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Filter</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                <div className="mb-2">
                                    <label htmlFor="search" className="mb-2">Search</label>
                                    <input type="text" name="search" className="form-control" id="search"
                                           placeholder="Type a query"
                                           defaultValue={this.state.filters.search}
                                           onChange={this.handleChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="Role" className="mb-2">Roles</label>
                                    <select className="form-select" name="role"
                                            value={this.state.filters.role.toString()}
                                            onChange={this.handleChange}>
                                        <option value="">All Roles</option>
                                        {
                                            this.state.roles.map((role: Role) => {
                                                return <option key={role.id} value={role.id.toString()}>{role.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={this.applyFilter}>
                                    Apply Filter
                                </button>
                            </div>
                        </div>
                    </div>
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

function WithNavigate(props: any) {
    let navigate = useNavigate();
    return <UserIndex {...props} navigate={navigate} />
}

export default connectToRedux(WithNavigate);