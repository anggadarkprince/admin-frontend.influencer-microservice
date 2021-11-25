import React, { Component } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { User } from "../../classes/User";
import LoadingRow from "../components/LoadingRow";
import Paginator from "../components/Paginator";
import {connect} from "react-redux";
import SectionTitle from "../components/SectionTitle";

class ReportIndex extends Component<{user: User}> {
    state = {
        isLoading: true,
        fromPageOrder: 1,
        lastPage: 1,
        reports: []
    }
    page = 1;

    componentDidMount = async () => {
        document.title = 'Reports';

        this.setState({
            isLoading: true
        });

        const response = await axios.get(`reports?page=${this.page}`);

        this.setState({
            isLoading: false,
            reports: response.data.data,
            fromPageOrder: response.data.meta?.from || response.data.from,
            lastPage: response.data.meta?.last_page || response.data.last_page,
        });
    }

    handlePageChange = async (page: number) => {
        this.page = page;

        await this.componentDidMount();
    }

    renderTableContent() {
        if (this.state.reports.length === 0) {
            return <tr><td colSpan={11}>No data available</td></tr>
        }
        return this.state.reports.map((report: any, index: number) => {
            return (
                <tr key={report.transaction_id}>
                    <td>{this.state.fromPageOrder + index}</td>
                    <td>{report.transaction_id}</td>
                    <td>{report.code}</td>
                    <td>{report.name}</td>
                    <td>{report.email}</td>
                    <td>{report.influencer_email}</td>
                    <td>{report.address || '-'}</td>
                    <td>{report.city || '-'}</td>
                    <td>{report.country || '-'}</td>
                    <td>{report.complete}</td>
                    <td>{report.created_at}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Wrapper>
                <SectionTitle title={"Reports"}/>

                <div className="table-responsive mb-3">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Transaction ID</th>
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Influencer Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">City</th>
                                <th scope="col">Country</th>
                                <th scope="col">Complete</th>
                                <th scope="col">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isLoading ? <LoadingRow colSpan={11} /> : this.renderTableContent()}
                        </tbody>
                    </table>
                </div>
                
                <Paginator lastPage={this.state.lastPage} handlePageChange={this.handlePageChange} />
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

export default connectToRedux(ReportIndex);