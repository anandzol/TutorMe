import React, { Component } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import '../App.css';
import {
    getAllUniversitiesSorted,
    getUniversityFacultiesSorted
} from '../services/UniversityService';
import { createCourse } from '../services/CourseService';

const styles = () => ({
    button_box: {
        position: 'relative',
        paddingTop: '2rem'
    },
    component: {
        backgroundColor: '#f0f2f5',
        paddingTop: '10px',
        paddingBottom: '10px',
        minHeight: '100vh',
        color: 'black'
    },
    card: {
        color: 'black',
        minHeight: '30vh',
        fontSize: 'large'
    },
    padding_card: {
        paddingTop: '1rem'
    },
    form: {
        paddingRight: '1rem',
        paddingLeft: '1rem',
        paddingTop: '2rem',
        paddingBottom: '1rem'
    },
    padding_top: {
        paddingTop: '2rem'
    }
});

const defaultState = {
    name: '',
    university: '',
    faculty: '',
    availableUniversities: [],
    availableFaculties: [],
    errors: []
};

// /components/CreateCourse.js
class CreateCourse extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }

    componentDidMount() {
        getAllUniversitiesSorted(
            universitiesSorted => {
                this.setState({
                    availableUniversities: universitiesSorted
                });
                if (universitiesSorted.length > 0 && universitiesSorted[0].faculties.length > 0) {
                    const availableFacultiesSorted = universitiesSorted[0].faculties.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );

                    this.setState({
                        university: universitiesSorted[0]._id,
                        availableFaculties: availableFacultiesSorted,
                        faculty: availableFacultiesSorted[0]._id
                    });
                }
            },
            error => {
                console.error(error);
            }
        );
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errors: [] });
    };

    onCancel = e => {
        e.preventDefault();
        this.props.history.push('');
    };

    // Refactor this to use university service
    onChangeUniversity = e => {
        const universityId = e.target.value;
        this.setState({ [e.target.name]: universityId });

        getUniversityFacultiesSorted(
            universityId,
            facultiesSorted => {
                // Set the selected university to the first displayed university
                if (facultiesSorted.length > 0) {
                    this.setState({
                        faculty: facultiesSorted[0]._id,
                        availableFaculties: facultiesSorted
                    });
                } else {
                    this.setState({
                        faculty: '',
                        availableFaculties: []
                    });
                }
            },
            error => {
                console.error(error);
            }
        );
    };

    validateInput() {
        let input = this.state.name;
        let errors = [];
        if (input === '') {
            errors['name'] = 'Please enter a course name!';
            this.setState({
                errors: errors
            });
            return false;
        }

        return true;
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.validateInput()) {
            const data = {
                name: this.state.name,
                university: this.state.university,
                faculty: this.state.faculty
            };
            createCourse(
                data,
                () => {
                    this.setState(defaultState);
                    this.props.history.push('/home');
                },
                error => {
                    console.error(error);
                }
            );
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.component}>
                    <div className={`container ${classes.padding_top}`}>
                        <h2>Create Course</h2>
                        <div className={`${classes.padding_card}`}>
                            <Card className={classes.card}>
                                <Form onSubmit={this.onSubmit} className={classes.form}>
                                    <Form.Group>
                                        <Form.Label>University</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="university"
                                            onChange={this.onChangeUniversity}>
                                            {this.state.availableUniversities.map((item, _) => (
                                                <option value={item._id}>{item.name}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            Select the University of the course which you would like
                                            to create!
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Faculty</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="faculty"
                                            onChange={this.onChange}>
                                            {this.state.availableFaculties.map((item, _) => (
                                                <option value={item._id}>{item.name}</option>
                                            ))}
                                        </Form.Control>
                                        <Form.Text className="text-muted">
                                            Select the Faculty of the course which you would like to
                                            create!
                                        </Form.Text>
                                    </Form.Group>
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
                                        <div className="text-danger">{this.state.errors.name}</div>
                                    </Form.Group>
                                </Form>
                            </Card>
                            <div className={classes.button_box}>
                                {/* Create Button */}
                                <Button
                                    variant="primary"
                                    size="lg"
                                    active
                                    className={classes.button}
                                    onClick={this.onSubmit}>
                                    Create
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CreateCourse);
