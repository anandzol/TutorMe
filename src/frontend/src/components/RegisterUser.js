import React, { Component, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';

class RegisterUser extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            gender: '',
            semester: 1,
            program: '',
            dateOfBirth: JSON.stringify(new Date()),
            lastOnline: JSON.stringify(new Date()),
            location: undefined,
            role: 'student'
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(e);

        const data = {
            email: this.state.name,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            gender: this.state.gender,
            semester: this.state.semester,
            program: this.state.program,
            dateOfBirth: this.state.dateOfBirth,
            lastOnline: this.state.lastOnline,
            location: this.state.location,
            role: this.state.role
        };

        axios
            .post('http://localhost:8082/api/User', data)
            .then(res =>
                this.setState({
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    gender: '',
                    semester: 1,
                    program: '',
                    dateOfBirth: JSON.stringify(new Date()),
                    lastOnline: JSON.stringify(new Date()),
                    location: undefined,
                    role: 'student'
                })
            )
            .catch(error => {
                console.log('Error in Register user (front end)');
            });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                <div>
                    <div className="card col-12 col-lg-6 login-card mt-2 hv-center RegisterUser-Card">
                        <form>
                            <div className="form-group text-left">
                                <label htmlFor="exampleInputEmail1">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="name@example.com"
                                    values={this.state.email}
                                    onChange={this.onChange}
                                />
                                <small
                                    id="emailHelp"
                                    className="form-text text-muted"
                                >
                                    We'll never share your email with anyone
                                    else.
                                </small>
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="exampleInputPassword1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    values={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group text-left">
                                <label htmlFor="exampleInputPassword1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    values={this.state.confirmPassword}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div class="row row-cols-2">
                                <div class="col">
                                    <label htmlFor="exampleInputPassword1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="Max"
                                        values={this.state.firstName}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div class="col">
                                    <label htmlFor="exampleInputPassword1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        placeholder="Mustermann"
                                        values={this.state.lastName}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterUser;
