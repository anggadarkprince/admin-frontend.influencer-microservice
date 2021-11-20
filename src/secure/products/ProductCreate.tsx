import React, { Component, SyntheticEvent } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Wrapper from "../Wrapper";
import ImageUpload from "../components/ImageUpload";
import SectionTitle from "../components/SectionTitle";

class ProductCreate extends Component {
    state = {
        isSubmitting: false,
        isUploading: false,
        image: '',
        redirect: false
    }
    title = '';
    description = '';
    image = '';
    price = 0;

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        this.setState({
            isSubmitting: true
        })

        await axios.post('products', {
            title: this.title,
            description: this.description,
            image: this.image,
            price: this.price,
        });

        this.setState({
            redirect: true
        })
    }

    imageStartUpload = (image: any) => {
        this.setState({
            isUploading: true
        })
    }

    imageChanged = (image: string) => {
        this.image = image;

        this.setState({
            image: this.image,
            isUploading: false
        })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/products'} />;
        }

        return (
            <Wrapper>
                <SectionTitle title="Create Product" isLoading={this.state.isUploading} />

                <form onSubmit={this.submit}>
                    <fieldset disabled={this.state.isSubmitting}>
                        <div className="mb-2">
                            <label htmlFor="title" className="mb-2">Title</label>
                            <input type="text" className="form-control" name="title" id="title" placeholder="Product title"
                                onChange={e => this.title = e.target.value} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="description" className="mb-2">Description</label>
                            <textarea className="form-control" name="description" id="description" placeholder="Product description"
                                onChange={e => this.description = e.target.value} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="image" className="mb-2">Image</label>
                            <ImageUpload value={this.image = this.state.image} imageChanged={this.imageChanged} imageStartUpload={this.imageStartUpload} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="price" className="mb-2">Price</label>
                            <input type="number" className="form-control" name="price" id="price" placeholder="Product price"
                                onChange={e => this.price = parseFloat(e.target.value)} />
                        </div>

                        {this.state.isSubmitting
                            ? (
                                <button className="btn btn-primary mt-3" disabled type="submit">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Saving...
                                </button>
                            )
                            : <button className="btn btn-primary mt-3" type="submit">Save Product</button>
                        }
                    </fieldset>
                </form>
            </Wrapper>
        );
    }
}

export default ProductCreate;