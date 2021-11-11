import React, {Component} from "react";

class Paginator extends Component<{ lastPage: number, handlePageChange: any }> {
    page = 1;

    prevPage = () => {
        if (this.page === 1) return;

        this.page--;

        this.props.handlePageChange(this.page);
    }

    nextPage = () => {
        if (this.page === this.props.lastPage) return;

        this.page++;

        this.props.handlePageChange(this.page);
    }

    render() {
        return (
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <button type="button" className="page-link" onClick={this.prevPage}>Previous</button>
                    </li>
                    <li className="page-item">
                        <button type="button" className="page-link" onClick={this.nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Paginator;