import React, { Component, SyntheticEvent } from 'react';
import axios from "axios";
import Wrapper from "../Wrapper";
import SectionTitleAction from "../components/SectionTitleAction";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import { Order } from "../../classes/Order";
import Paginator from "../components/Paginator";
import { formatThousands } from "../../helpers/NumberFormat";
import LoadingRow from '../components/LoadingRow';

class Orders extends Component {
    state = {
        isLoading: true,
        fromPageOrder: 1,
        lastPage: 1,
        orders: []
    }
    page = 1;

    componentDidMount = async () => {
        this.setState({
            isLoading: true
        });

        const response = await axios.get(`orders?page=${this.page}`);

        this.setState({
            orders: response.data.data,
            isLoading: false,
            fromPageOrder: response.data.meta.from,
            lastPage: response.data.meta.last_page
        });
    }

    handlePageChange = async (page: number) => {
        this.page = page;

        await this.componentDidMount();
    }

    handleExport = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.get('export', {responseType: 'blob'});
        const blob = new Blob([response.data], {type: 'text/csv'});
        const downloadUrl = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = "order.csv";
        link.click();
    }

    toolbars = () => {
        return (
        <Link to={'/export'} className="btn btn-sm btn-success" onClick={this.handleExport}>
            <Icon.File size={16} className="me-1" />
            EXPORT
        </Link>);
    }

    render() {
        return (
            <Wrapper>
                <SectionTitleAction title={"Orders"}>
                    {this.toolbars()}
                </SectionTitleAction>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Total</th>
                                <th className="text-md-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isLoading ? <LoadingRow colSpan={5} /> : this.state.orders.map(
                                (order: Order) => {
                                    return (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.first_name} {order.last_name}</td>
                                            <td>{order.email}</td>
                                            <td>{formatThousands(order.total, 'IDR ')}</td>
                                            <td className="text-md-end">
                                                <div className="btn-group mr-2">
                                                    <Link to={`/orders/${order.id}`} className="btn btn-sm btn-primary">
                                                        <Icon.Eye size={16} className="me-1" />
                                                        View
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                        </tbody>
                    </table>
                </div>

                <Paginator lastPage={this.state.lastPage} handlePageChange={this.handlePageChange} />
            </Wrapper>
        );
    }
}

export default Orders;