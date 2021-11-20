import React, {Component} from "react";

class Paginator extends Component<{ page?: number, lastPage: number, handlePageChange: any }> {
    page = this.props.page ?? 1;

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
                    <li className={`page-item ${this.page === 1 ? 'disabled' : ''}`}>
                        <button type="button" className="page-link" onClick={this.prevPage}>Previous</button>
                    </li>
                    <li className={`page-item ${this.page === this.props.lastPage ? 'disabled' : ''}`}>
                        <button type="button" className="page-link" onClick={this.nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Paginator;