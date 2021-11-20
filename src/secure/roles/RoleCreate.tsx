import React, { Component, SyntheticEvent } from 'react';
import axios from "axios";
import { Navigate } from "react-router-dom";
import Wrapper from "../Wrapper";
import { Permission } from "../../classes/Permission";
import SectionTitle from "../components/SectionTitle";

class RoleCreate extends Component {
    state = {
        isSubmitting: false,
        isLoadingPermission: true,
        permissions: [],
        redirect: false
    }
    selected: number[] = [];
    name = '';

    componentDidMount = async () => {
        const response = await axios.get('permissions');

        this.setState({
            permissions: response.data.data,
            isLoadingPermission: false,
        })
    }

    check = (id: number) => {
        if (this.selected.filter(s => s === id).length > 0) {
            this.selected = this.selected.filter(s => s !== id);
            return;
        }

        this.selected.push(id);
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        this.setState({
            isSubmitting: true
        })

        await axios.post('roles', {
            name: this.name,
            permissions: this.selected
        })

        this.setState({
            redirect: true
        })
    }

    renderPermission() {
        return this.state.permissions.map(
            (p: Permission) => {
                return (
                    <div className="form-check form-check-inline col-3" key={p.id}>
                        <input className="form-check-input" type="checkbox" value={p.id}
                            onChange={e => this.check(p.id)} id={`permission-${p.id}`}
                        />
                        <label className="form-check-label" htmlFor={`permission-${p.id}`}>{p.name}</label>
                    </div>
                )
            }
        );
    }

    renderLoadingPermission() {
        return (
            <div className="d-flex align-items-center my-2">
                <div className="spinner-border spinner-border-sm me-2" role="status" />
                <span>Fetching permissions...</span>
            </div>
        )
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/roles'} />;
        }

        return (
            <Wrapper>
                <SectionTitle title="Create Role" isLoading={this.state.isLoadingPermission} />

                <form onSubmit={this.submit}>
                    <fieldset disabled={this.state.isSubmitting || this.state.isLoadingPermission}>
                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-3">Name</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="name" id="name"
                                    onChange={e => this.name = e.target.value} placeholder="Type role name"
                                />
                            </div>
                        </div>

                        <div className="mb-2 row">
                            <label className="col-sm-3">Permissions</label>
                            <div className="col-sm-9">
                                {this.state.isLoadingPermission ? this.renderLoadingPermission() : this.renderPermission()}
                            </div>
                        </div>

                        {this.state.isSubmitting
                            ? (
                                <button className="btn btn-primary mt-3" disabled type="submit">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Saving...
                                </button>
                            )
                            : <button className="btn btn-primary mt-3" type="submit">Save</button>
                        }
                    </fieldset>
                </form>
            </Wrapper>
        );
    }
}

export default RoleCreate;