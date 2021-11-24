import React, { Component } from 'react';
import axios from "axios";
import { Product } from "../../classes/Product";
import Edit from "../components/Edit";
import Delete from "../components/Delete";
import SectionTitleAction from "../components/SectionTitleAction";
import Wrapper from "../Wrapper";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import Paginator from "../components/Paginator";
import { formatThousands } from "../../helpers/NumberFormat";
import LoadingRow from "../components/LoadingRow";
import {User} from "../../classes/User";
import {connect} from "react-redux";

class ProductIndex extends Component<{ user: User }> {
    state = {
        isLoading: true,
        fromPageOrder: 1,
        lastPage: 1,
        products: []
    }
    page = 1;

    componentDidMount = async () => {
        document.title = 'Products';

        this.setState({
            isLoading: true
        });

        const response = await axios.get(`products?page=${this.page}`);

        this.setState({
            isLoading: false,
            products: response.data.data,
            fromPageOrder: response.data.meta.from,
            lastPage: response.data.meta.last_page
        })
    }

    handleDelete = async (id: number) => {
        this.setState({
            products: this.state.products.filter((p: Product) => p.id !== id)
        })
    }

    handlePageChange = async (page: number) => {
        this.page = page;

        await this.componentDidMount();
    }

    toolbars = () => {
        return (
            this.props.user.canCreate('products') &&
            <Link to={'/products/create'} className="btn btn-sm btn-primary">
                <Icon.Plus size={16} className="me-1" />
                ADD
            </Link>
        )
    }

    actions = (id: number) => {
        return (
            <div className="btn-group mr-2">
                {this.props.user.canEdit('products') && <Edit id={id} endpoint={'/products'} />}
                {this.props.user.canDelete('products') && <Delete id={id} endpoint={'/products'} handleDelete={this.handleDelete} />}
            </div>
        )
    }

    renderRoleTableContent() {
        if (this.state.products.length === 0) {
            return <tr><td colSpan={6}>No data available</td></tr>
        }
        return this.state.products.map(
            (product: Product) => {
                return (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td><img src={product.image} width="50" alt={product.title} /></td>
                        <td>{product.title}</td>
                        <td>{product.description}</td>
                        <td className="text-nowrap">{formatThousands(product.price, 'IDR ')}</td>
                        <td className="text-md-end">{this.actions(product.id)}</td>
                    </tr>
                )
            }
        )
    }

    productTable = () => {
        return <>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th className="text-md-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isLoading ? <LoadingRow colSpan={6} /> : this.renderRoleTableContent()}
                    </tbody>
                </table>
            </div>

            <Paginator lastPage={this.state.lastPage} handlePageChange={this.handlePageChange} />
        </>;
    }

    render() {
        return (
            <Wrapper>
                <SectionTitleAction title={"Products"}>
                    {this.toolbars()}
                </SectionTitleAction>

                {this.productTable()}
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

export default connectToRedux(ProductIndex);