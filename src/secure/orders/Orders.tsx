import React, {Component} from 'react';
import axios from "axios";
import Wrapper from "../Wrapper";
import SectionTitleAction from "../components/SectionTitleAction";
import {Link} from "react-router-dom";
import * as Icon from "react-feather";
import {Order} from "../../classes/Order";
import Paginator from "../components/Paginator";
import {formatThousands} from "../../helpers/NumberFormat";

class Orders extends Component {
    state = {
        orders: []
    }
    page = 1;
    lastPage = 0;

    componentDidMount = async () => {
        const response = await axios.get(`orders?page=${this.page}`);

        this.setState({
            orders: response.data.data
        });

        this.lastPage = response.data.meta.last_page;
    }

    handlePageChange = async (page: number) => {
        this.page = page;

        await this.componentDidMount();
    }

    toolbars = () => {
        return <></>;
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
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.map(
                            (order: Order) => {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.first_name} {order.last_name}</td>
                                        <td>{order.email}</td>
                                        <td>{formatThousands(order.total, 'IDR ')}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <Link to={`/orders/${order.id}`} className="btn btn-sm btn-primary">
                                                    <Icon.Eye size={16} className="me-1"/>
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

                <Paginator lastPage={this.lastPage} handlePageChange={this.handlePageChange}/>
            </Wrapper>
        );
    }
}

export default Orders;