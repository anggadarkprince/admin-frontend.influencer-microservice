import {OrderItem} from "../../classes/OrderItem";
import Wrapper from "../Wrapper";
import {Order} from "../../classes/Order";
import axios from "axios";
import React, {Component} from "react";
import SectionTitle from "../components/SectionTitle";
import {useParams} from "react-router-dom";
import {formatThousands} from "../../helpers/NumberFormat";

class OrderItems extends Component<{ params: any }> {
    state = {
        transactionId: '',
        orderItems: []
    }
    id = 0;

    componentDidMount = async () => {
        this.id = this.props.params.id;

        const response = await axios.get(`orders/${this.id}`);

        const order: Order = response.data.data;

        this.setState({
            transactionId: order.transaction_id,
            orderItems: order.order_items
        })
    }

    render() {
        return (
            <Wrapper>
                <SectionTitle title={`View Order ${this.state.transactionId}`}/>

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Influencer Revenue</th>
                            <th>Admin Revenue</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orderItems.map(
                            (orderItem: OrderItem, index: number) => {
                                return (
                                    <tr key={orderItem.id}>
                                        <td>{index + 1}</td>
                                        <td>{orderItem.product_title}</td>
                                        <td>{formatThousands(orderItem.price, 'IDR ')}</td>
                                        <td>{orderItem.quantity}</td>
                                        <td>{formatThousands(orderItem.influencer_revenue || 0, 'IDR ')}</td>
                                        <td>{formatThousands(orderItem.admin_revenue || 0, 'IDR ')}</td>
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

export default () => {
    let params = useParams();

    return <OrderItems params={params}/>
};