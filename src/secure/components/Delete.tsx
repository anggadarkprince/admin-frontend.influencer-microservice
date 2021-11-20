import React, { Component, SyntheticEvent } from 'react';
import axios from "axios";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";

class Delete extends Component<{ id: number, endpoint: string, handleDelete: any }> {
    delete = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (window.confirm('Are you sure you want to delete this record?')) {
            await axios.delete(`${this.props.endpoint}/${this.props.id}`);

            this.props.handleDelete(this.props.id);
        }
    }

    render() {
        return (
            <Link to={`${this.props.endpoint}/${this.props.id}`} onClick={(e) => this.delete(e)} className="btn btn-sm btn-danger">
                <Icon.Trash2 size={16} />
            </Link>
        );
    }
}

export default Delete;