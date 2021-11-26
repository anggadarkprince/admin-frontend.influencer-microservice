import React, {ChangeEvent, Component, SyntheticEvent} from 'react';
import axios from "axios";
import { Role } from "../../classes/Role";
import Wrapper from "../Wrapper";
import {Link, useNavigate, useLocation} from "react-router-dom";
import * as Icon from "react-feather";
import Delete from "../components/Delete";
import Edit from "../components/Edit";
import LoadingRow from "../components/LoadingRow";
import {User} from "../../classes/User";
import {connect} from "react-redux";
import SectionTitleAction from "../components/SectionTitleAction";
import queryString from "query-string";
import {NavigateFunction} from "react-router";

class RoleIndex extends Component<{user: User, navigate: NavigateFunction, location: Location}> {
    params = queryString.parse(window.location.search);
    initialFilterState = {
        search: '',
        ...this.params
    }
    state = {
        isMounted: false,
        isLoading: true,
        roles: [],
        filters: this.initialFilterState
    }

    constructor(props: {user: User, navigate: NavigateFunction, location: Location}) {
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

    componentDidMount() {
        document.title = 'Roles';

        this.setState({
            isMounted: true
        });

        this.fetchRoles();
    }

    componentDidUpdate(prevProps: Readonly<{ user: User; navigate: NavigateFunction; location: Location }>) {
        if (this.props.location.search !== prevProps.location.search && this.props.location.search === "" && prevProps.location.search !== "") {
            this.setState({
                filters: {
                    ...this.initialFilterState
                }
            }, () => {
                this.onFilterUpdated(true);
            })
        }
    }

    fetchRoles = () => {
        this.setState({
            isLoading: true
        });

        const filteredData = this.state.filters
        axios.get(`roles`, {params: filteredData})
            .then((response) => {
                this.setState({
                    isLoading: false,
                    roles: response.data.data,
                });
            })
            .catch(console.log);
    }

    applyFilter = (e: SyntheticEvent) => {
        e.preventDefault();

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
        });

        if (!isBack) {
            this.props.navigate((filterParams ? '?' + filterParams : ''))
        }

        this.fetchRoles();
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
                    <button className="btn btn-sm btn-primary me-1" data-bs-toggle="modal" data-bs-target="#filter-modal">
                        <Icon.Filter size={16}/>
                    </button>
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

                <div className="modal" id="filter-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1}>
                    <div className="modal-dialog">
                        <form className="modal-content" onSubmit={this.applyFilter}>
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
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Apply Filter
                                </button>
                            </div>
                        </form>
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
    let location = useLocation();
    return <RoleIndex {...props} navigate={navigate} location={location} />
}

export default connectToRedux(WithNavigate);