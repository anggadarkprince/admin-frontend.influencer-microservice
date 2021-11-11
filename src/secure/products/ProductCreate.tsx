import React, {Component, SyntheticEvent} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import Wrapper from "../Wrapper";
import ImageUpload from "../components/ImageUpload";

class ProductCreate extends Component {
    state = {
        image: '',
        redirect: false
    }
    title = '';
    description = '';
    image = '';
    price = 0;

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

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
                <form onSubmit={this.submit}>
                    <div className="mb-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" id="title"
                               onChange={e => this.title = e.target.value}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" name="description" id="description"
                                  onChange={e => this.description = e.target.value}/>
                    </div>
                    <div className="mb-2">
                        <label>Image</label>
                        <ImageUpload value={this.image = this.state.image} imageChanged={this.imageChanged}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Price</label>
                        <input type="number" className="form-control" name="email" id="email"
                               onChange={e => this.price = parseFloat(e.target.value)}/>
                    </div>

                    <button className="btn btn-primary mt-3" type="submit">Save</button>
                </form>
            </Wrapper>
        );
    }
}

export default ProductCreate;