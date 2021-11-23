import React, {Component, Dispatch, SyntheticEvent} from "react";
import axios from "axios";
import {User} from "../../classes/User";
import Wrapper from "../Wrapper";
import SectionTitle from "../components/SectionTitle";
import {connect} from "react-redux";
import setUser from "../../redux/actions/setUserAction";

class Profile extends Component<{user: User, setUser: any, isUserLoading: boolean}> {
    state = {
        isSubmittingProfile: false,
        isSubmittingPassword: false,
        first_name: '',
        last_name: '',
        email: '',
    }
    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';

    componentDidMount = async () => {
        document.title = "Update Profile"
    }

    updateInfo = async (e: SyntheticEvent) => {
        e.preventDefault();

        this.setState({
            isSubmittingProfile: true,
        })

        const response = await axios.put('users/info', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
        });

        const user: User = response.data;

        this.props.setUser(user);

        this.setState({
            isSubmittingProfile: false
        })
    }

    updatePassword = async (e: SyntheticEvent) => {
        e.preventDefault();

        this.setState({
            isSubmittingPassword: true,
        })

        await axios.put('users/password', {
            password: this.password,
            password_confirm: this.password_confirm
        })

        this.setState({
            isSubmittingPassword: false,
        })

    }

    render() {
        return (
            <Wrapper>
                <SectionTitle title="Account Information"/>
                <form onSubmit={this.updateInfo} className="mb-3">
                    <fieldset disabled={this.state.isSubmittingProfile || this.props.isUserLoading}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="mb-2">
                                    <label className="mb-2" htmlFor="first_name">First Name</label>
                                    <input type="text" className="form-control" name="first_name" id="first_name" placeholder="Your first name"
                                           defaultValue={this.first_name = this.props.user.first_name}
                                           onChange={e => this.first_name = e.target.value}/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-2">
                                    <label className="mb-2" htmlFor="last_name">Last Name</label>
                                    <input type="text" className="form-control" name="last_name" id="last_name" placeholder="Last name"
                                           defaultValue={this.last_name = this.props.user.last_name}
                                           onChange={e => this.last_name = e.target.value}/>
                                </div>
                            </div>
                        </div>
                        <div className="mb-2">
                            <label className="mb-2" htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" id="email" placeholder="Email address"
                                   defaultValue={this.email = this.props.user.email}
                                   onChange={e => this.email = e.target.value}/>
                        </div>

                        {this.state.isSubmittingProfile
                            ? (
                                <button className="btn btn-primary mt-3" disabled type="submit">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Updating...
                                </button>
                            )
                            : <button className="btn btn-primary mt-3" type="submit">Save Profile</button>
                        }
                    </fieldset>
                </form>

                <SectionTitle title="Change Password"/>
                <form onSubmit={this.updatePassword}>
                    <fieldset disabled={this.state.isSubmittingPassword || this.props.isUserLoading}>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="mb-2">
                                    <label className="mb-2" htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" id="password" placeholder="New password"
                                           onChange={e => this.password = e.target.value}/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="mb-2">
                                    <label className="mb-2" htmlFor="password_confirm">Password Confirm</label>
                                    <input type="password" className="form-control" name="password_confirm" id="password_confirm" placeholder="Confirm new password"
                                           onChange={e => this.password_confirm = e.target.value}/>
                                </div>
                            </div>
                        </div>
                        {this.state.isSubmittingPassword
                            ? (
                                <button className="btn btn-primary mt-3" disabled type="submit">
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Updating...
                                </button>
                            )
                            : <button className="btn btn-danger mt-3" type="submit">Update Password</button>
                        }
                    </fieldset>
                </form>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state: {user: User, isLoading: boolean}) => {
    return {
        user: state.user,
        isUserLoading: state.isLoading
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

const connectToRedux = connect(mapStateToProps, mapDispatchToProps)

export default connectToRedux(Profile);