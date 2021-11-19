import {Component} from "react";
import axios from "axios";
import * as React from "react";

class ImageUpload extends Component<{ value: string, imageChanged: any }> {
    image = '';

    upload = async (files: FileList | null) => {
        if (files === null) return;

        const data = new FormData();
        data.append('image', files[0]);

        const response = await axios.post('upload', data);

        this.image = response.data.url;

        this.props.imageChanged(this.image);
    }

    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" name="image" id="image"
                       placeholder="Pick an image to upload"
                       value={this.image = this.props.value}
                       onChange={e => {
                           this.image = e.target.value;
                           this.props.imageChanged(this.image);
                       }}
                />
                <label className="btn btn-primary">
                    Upload <input type="file" hidden onChange={e => this.upload(e.target.files)}/>
                </label>
            </div>
        );
    }
}

export default ImageUpload;