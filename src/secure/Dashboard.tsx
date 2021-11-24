import React, {Component, SyntheticEvent} from "react";
import Wrapper from "./Wrapper";
import c3 from 'c3';
import 'c3/c3.css';
import axios from "axios";
import { formatThousands } from "../helpers/NumberFormat";
import LoadingRow from "./components/LoadingRow";
import {Order} from "../classes/Order";
import {Link} from "react-router-dom";
import {User} from "../classes/User";
import {connect} from "react-redux";

class Dashboard extends Component<{ user: User }> {
    state = {
        isLoading: true,
        transactions: [],
        error: ''
    }

    componentDidMount = async () => {
        document.title = 'Dashboard';

        if (this.props.user.canView('orders')) {
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
        } else {
            this.setState({
                isLoading: false,
                error: 'You are unauthorized to see dashboard data'
            })
        }
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

    renderTableRows() {
        if (this.state.transactions.length === 0) {
            return <tr><td colSpan={5}>No data available</td></tr>
        }
        return this.state.transactions.map(
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
        )
    }

    render() {
        return (
            <Wrapper>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h3 fw-bold">Dashboard</h1>
                    {
                        this.props.user.canView('orders') &&
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group me-2">
                                <Link to={'/orders'} className="btn btn-sm btn-outline-secondary">Orders</Link>
                                <Link to={'/exports'} className="btn btn-sm btn-outline-secondary" onClick={this.handleExport}>Export</Link>
                            </div>
                        </div>
                    }

                </div>

                <div id="chart" />

                {
                    this.state.error &&
                    <div className="alert alert-warning">
                        {this.state.error}
                    </div>
                }

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
                        {this.state.isLoading ? <LoadingRow colSpan={6} /> : this.renderTableRows()}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state: {user: User}) => {
    return {
        user: state.user
    }
}

const connectToRedux = connect(mapStateToProps);

export default connectToRedux(Dashboard);