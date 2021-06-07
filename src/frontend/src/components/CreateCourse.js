import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from '../components/NavigationBar';

import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class CreateCourse extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            university: '',
            faculty: ''
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
            faculty: this.state.faculty
        };

        console.log(data);
        axios
            .post('http://localhost:8082/api/course', data)
            .then(res => {
                this.setState({
                    name: '',
                    university: '',
                    faculty: ''
                });
                console.log(this.state);
                this.props.history.push('/create-course');
            })
            .catch(error => {
                console.log('Error in Create course (frontend)');
            });
    };

    render() {
        return (
            <div>
                <NavigationBar></NavigationBar>
                <div className="CreateCourse">
                    <div className="container">
                        <Form noValidate onSubmit={this.onSubmit}>
                            <Form.Group controlId="formCreateCourseName">
                                <Form.Label>Course Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    values={this.state.name}
                                    onChange={this.onChange}
                                    rows={1}
                                />
                                <Form.Text className="text-muted">
                                    Enter the course name which you would like
                                    to create!
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formCreateCourseUniversity">
                                <Form.Label>University Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="university"
                                    values={this.state.university}
                                    onChange={this.onChange}
                                    rows={1}
                                />
                                <Form.Text className="text-muted">
                                    Enter the university of the course which you
                                    would like to create!
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formCreateFaculty">
                                <Form.Label>Faculty Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="faculty"
                                    values={this.state.faculty}
                                    onChange={this.onChange}
                                    rows={1}
                                />
                                <Form.Text className="text-muted">
                                    Enter the faculty of the course which you
                                    would like to create!
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCourse;
