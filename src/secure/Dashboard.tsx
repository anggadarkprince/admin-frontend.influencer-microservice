import * as Icon from "react-feather";
import React, { Component } from "react";
import Wrapper from "./Wrapper";
import c3 from 'c3';
import 'c3/c3.css';
import axios from "axios";
import { formatThousands } from "../helpers/NumberFormat";

class Dashboard extends Component {

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
    }

    render() {
        return (
            <Wrapper>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h3 fw-bold">Dashboard</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                        <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center">
                            <Icon.Calendar size={16} className="me-2" />
                            This week
                        </button>
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
                            <tr>
                                <td>1,001</td>
                                <td>random</td>
                                <td>data</td>
                                <td>placeholder</td>
                                <td>text</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        )
    }
};

export default Dashboard;