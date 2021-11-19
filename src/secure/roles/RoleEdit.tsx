import React, {Component, SyntheticEvent} from 'react';
import axios from "axios";
import {Role} from "../../classes/Role";
import {Permission} from "../../classes/Permission";
import {Navigate, useParams} from "react-router-dom";
import Wrapper from "../Wrapper";
import SectionTitle from "../components/SectionTitle";

class RoleEdit extends Component<{params: any}> {
    state = {
        name: '',
        selected: [],
        permissions: [],
        redirect: false
    }
    selected: number[] = [];
    name = '';
    id = 0;

    componentDidMount = async () => {
        this.id = this.props.params.id;

        const permissionCall = await axios.get('permissions');

        const roleCall = await axios.get(`roles/${this.id}`);

        const role: Role = roleCall.data.data;

        this.selected = role.permissions.map((p: Permission) => p.id);

        this.setState({
            name: role.name,
            selected: this.selected,
            permissions: permissionCall.data.data
        })
    }

    check = (id: number) => {
        if (this.isChecked(id)) {
            this.selected = this.selected.filter(s => s !== id);
            return;
        }

        this.selected.push(id);
    }

    isChecked = (id: number) => {
        return this.state.selected.filter(s => s === id).length > 0;
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`roles/${this.id}`, {
            name: this.name,
            permissions: this.selected
        })

        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/roles'} />;
        }

        return (
            <Wrapper>
                <SectionTitle title="Edit Role"/>

                <form onSubmit={this.submit}>
                    <div className="mb-2 row">
                        <label htmlFor="name" className="col-sm-3">Name</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" name="name" id="name"
                                   defaultValue={this.name = this.state.name}
                                   onChange={e => this.name = e.target.value}
                            />
                        </div>
                    </div>

                    <div className="mb-2 row">
                        <label className="col-sm-3">Permissions</label>
                        <div className="col-sm-9">
                            {this.state.permissions.map(
                                (p: Permission) => {
                                    return (
                                        <div className="form-check form-check-inline col-3" key={p.id}>
                                            <input className="form-check-input" type="checkbox" id={`permission-${p.id}`}
                                                   value={p.id}
                                                   defaultChecked={this.isChecked(p.id)}
                                                   onChange={e => this.check(p.id)}
                                            />
                                            <label className="form-check-label" htmlFor={`permission-${p.id}`}>{p.name}</label>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" type="submit">Update</button>
                </form>
            </Wrapper>
        );
    }
}

export default () => {
    let params = useParams();

    return <RoleEdit params={params} />
};