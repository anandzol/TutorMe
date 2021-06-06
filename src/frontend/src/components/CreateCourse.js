import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class CreateCourse extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            university: '',
            faculty: '',
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            name: this.state.name,
            university: this.state.university,
            faculty: this.state.faculty,
        };

        axios
            .post('http://localhost:8082/api/course', data)
            .then(res => {
                this.setState({
                    name: '',
                    university: '',
                    faculty: '',
                });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log('Error in Create course');
            });
    };

    render() {
        return (
            <div className="CreateCourse">
                <div className="container">
                    <div className="row"></div>
                </div>
            </div>
        );
    }
}

export default CreateCourse;
