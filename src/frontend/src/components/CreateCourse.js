import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from '../components/NavigationBar';
import { withStyles } from '@material-ui/styles';

import '../App.css';
import axios from 'axios';

const baseURL = 'http://localhost:8082/api/course';

const styles = () => ({
    button_box: {
        position: 'absolute',
        left: '436px',
        paddingTop: '2rem'
    }
});

const defaultState = {
    name: '',
    university: '',
    faculty: ''
};
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

    onCancel = e => {
        e.preventDefault();
        this.props.history.push('');
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            name: this.state.name,
            university: this.state.university,
            faculty: this.state.faculty
        };

        axios
            .post(baseURL, data)
            .then(res => {
                this.setState(defaultState);
                this.props.history.push('/');
            })
            .catch(error => {
                console.log('Error in Create course');
            });
    };

    render() {
        const { classes } = this.props;

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
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    rows={1}
                                />
                                <Form.Text className="text-muted">
                                    Enter the course name which you would like to create!
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formCreateCourseUniversity">
                                <Form.Label>University Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="university"
                                    value={this.state.university}
                                    onChange={this.onChange}
                                    rows={1}
                                />
                                <Form.Text className="text-muted">
                                    Enter the university of the course which you would like to
                                    create!
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formCreateFaculty">
                                <Form.Label>Faculty Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="faculty"
                                    value={this.state.faculty}
                                    onChange={this.onChange}
                                    rows={1}
                                />
                                <Form.Text className="text-muted">
                                    Enter the faculty of the course which you would like to create!
                                </Form.Text>
                            </Form.Group>

                            <div className={classes.button_box}>
                                {/* Register Button */}
                                <Button
                                    variant="primary"
                                    size="lg"
                                    active
                                    className={classes.button}
                                    onClick={this.onSubmit}>
                                    Register
                                </Button>

                                {/* Cancel Button */}
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    active
                                    className={classes.button}
                                    onClick={this.onCancel}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CreateCourse);
