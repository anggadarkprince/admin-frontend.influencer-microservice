import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as Icon from "react-feather";

class Edit extends Component<{ id: number, endpoint: string }> {

    render() {
        return (
            <Link to={`${this.props.endpoint}/${this.props.id}/edit`}
                  className="btn btn-sm btn-outline-secondary">
                <Icon.Edit3 size={16}/>
            </Link>
        );
    }
}

export default Edit;