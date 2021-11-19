import {OrderItem} from "../../classes/OrderItem";
import Wrapper from "../Wrapper";
import {Order} from "../../classes/Order";
import axios from "axios";
import React, {Component} from "react";
import SectionTitle from "../components/SectionTitle";

class OrderItems extends Component<{ match: any }> {
    state = {
        order_items: []
    }
    id = 0;

    componentDidMount = async () => {
        this.id = this.props.match.params.id;

        const response = await axios.get(`orders/${this.id}`);

        const order: Order = response.data.data;

        this.setState({
            order_items: order.order_items
        })
    }

    render() {
        return (
            <Wrapper>
                <SectionTitle title="View Product Detail"/>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.order_items.map(
                            (orderItem: OrderItem) => {
                                return (
                                    <tr key={orderItem.id}>
                                        <td>{orderItem.id}</td>
                                        <td>{orderItem.product_title}</td>
                                        <td>{orderItem.price}</td>
                                        <td>{orderItem.quantity}</td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        );
    }
}

export default OrderItems;