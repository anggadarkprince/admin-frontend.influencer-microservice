import React, {Component, SyntheticEvent} from "react";
import axios from "axios";
import {Product} from "../../classes/Product";
import {Navigate, useParams} from "react-router-dom";
import Wrapper from "../Wrapper";
import ImageUpload from "../components/ImageUpload";
import SectionTitle from "../components/SectionTitle";

class ProductEdit extends Component<{ params: any }> {
    state = {
        title: '',
        description: '',
        image: '',
        price: 0,
        redirect: false
    }
    id = 0;
    title = '';
    description = '';
    image = '';
    price = 0;

    componentDidMount = async () => {
        this.id = this.props.params.id;

        const response = await axios.get(`products/${this.id}`);

        const product: Product = response.data.data;

        this.setState({
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price
        })
    }


    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`products/${this.id}`, {
            title: this.state.title,
            description: this.state.description,
            image: this.state.image,
            price: this.state.price,
        });

        this.setState({
            redirect: true
        })
    }

    imageChanged = (image: string) => {
        this.image = image;

        this.setState({
            image: this.image
        })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/products'}/>;
        }

        return (
            <Wrapper>
                <SectionTitle title="Edit Product"/>

                <form onSubmit={this.submit}>
                    <div className="mb-2">
                        <label htmlFor="title" className="mb-2">Title</label>
                        <input type="text" className="form-control" name="title" id="title" placeholder="Product title"
                               defaultValue={this.state.title}
                               onChange={e => this.setState({title: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description" className="mb-2">Description</label>
                        <textarea className="form-control" name="description" id="description" placeholder="Product description"
                                  defaultValue={this.state.description}
                                  onChange={e => this.setState({description: e.target.value})}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="image" className="mb-2">Image</label>
                        <ImageUpload value={this.image = this.state.image} imageChanged={this.imageChanged}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="mb-2">Price</label>
                        <input type="number" className="form-control" name="price" id="price" placeholder="Product price"
                               value={this.price = this.state.price}
                               onChange={e => this.setState({price: e.target.value})}/>
                    </div>

                    <button className="btn btn-primary mt-3 px-4" type="submit">Update Product</button>
                </form>
            </Wrapper>
        );
    }
}

export default () => {
    let params = useParams();

    return <ProductEdit params={params} />
};