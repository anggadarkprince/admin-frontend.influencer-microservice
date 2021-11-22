import React, {Component, SyntheticEvent} from "react";
import Wrapper from "./Wrapper";
import c3 from 'c3';
import 'c3/c3.css';
import axios from "axios";
import { formatThousands } from "../helpers/NumberFormat";
import LoadingRow from "./components/LoadingRow";
import {Order} from "../classes/Order";
import {Link} from "react-router-dom";

class Dashboard extends Component {
    state = {
        isLoading: true,
        transactions: []
    }

    componentDidMount = async () => {
        let chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: [
                    ['x'],
                    ['Sales'],
                ],
                types: {
                    Sales: 'bar'
                }
            },
            padding: {
                left: 45
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                },
                y: {
                    tick: {
                        format: function (d) {
                            return formatThousands(d / 1000) + "K";
                        }
                    }
                }
            }
        });

        const response = await axios.get('chart');

        const records: { date: string, sum: number }[] = response.data.data;

        chart.load({
            columns: [
                ['x', ...records.map(r => r.date)],
                ['Sales', ...records.map(r => r.sum)]
            ]
        })

        const transactions = await axios.get('orders/latest');

        this.setState({
            isLoading: false,
            transactions: transactions.data.data,
        })
    }

    handleExport = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await axios.get('export', {responseType: 'blob'});
        //const blob = new Blob([response.data], {type: 'text/csv'});
        const downloadUrl = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = "order.csv";
        link.click();
    }

    render() {
        return (
            <Wrapper>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h3 fw-bold">Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <Link to={'/orders'} className="btn btn-sm btn-outline-secondary">Orders</Link>
                            <Link to={'/exports'} className="btn btn-sm btn-outline-secondary" onClick={this.handleExport}>Export</Link>
                        </div>
                    </div>
                </div>

                <div id="chart" />

                <h2 className="h4 fw-bold">Latest Transaction</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Transaction ID</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.isLoading ? <LoadingRow colSpan={6} /> : this.state.transactions.map(
                            (order: Order, index: number) => {
                                return (
                                    <tr key={order.id}>
                                        <td>{index + 1}</td>
                                        <td>{(new Date(order.created_at)).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        <td>{order.transaction_id}</td>
                                        <td>{formatThousands(order.total, 'IDR ')}</td>
                                        <td>{order.first_name}</td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        )
    }
}

export default Dashboard;