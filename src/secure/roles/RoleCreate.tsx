import React, {Component, SyntheticEvent} from 'react';
import axios from "axios";
import {Navigate} from "react-router-dom";
import Wrapper from "../Wrapper";
import {Permission} from "../../classes/Permission";
import SectionTitle from "../components/SectionTitle";

class RoleCreate extends Component {
    state = {
        permissions: [],
        redirect: false
    }
    selected: number[] = [];
    name = '';

    componentDidMount = async () => {
        const response = await axios.get('permissions');

        this.setState({
            permissions: response.data.data
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

        await axios.post('roles', {
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
                <SectionTitle title="Create Role"/>

                <form onSubmit={this.submit}>
                    <div className="mb-2 row">
                        <label htmlFor="name" className="col-sm-3">Name</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" name="name" id="name"
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
                                            <input className="form-check-input" type="checkbox" value={p.id}
                                                   onChange={e => this.check(p.id)}
                                            />
                                            <label className="form-check-label">{p.name}</label>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>

                    <button className="btn btn-primary mt-3" type="submit">Save</button>
                </form>
            </Wrapper>
        );
    }
}

export default RoleCreate;