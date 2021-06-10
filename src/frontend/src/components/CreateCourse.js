import React, { Component } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import { withStyles } from '@material-ui/styles';
import '../App.css';
import axios from 'axios';

const styles = () => ({
    button_box: {
        position: 'relative',
        paddingTop: '2rem'
    },
    component: {
        backgroundColor: '#2c3e50',
        paddingTop: '10px',
        paddingBottom: '10px',
        minHeight: '100vh',
        color: 'white'
    },
    card: {
        color: 'black',
        minHeight: '30vh',
        fontSize: 'large'
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
    availableFaculties: []
};

const SERVER_URL = 'http://localhost:8082/api';

class CreateCourse extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }

    componentDidMount() {
        axios

            // Get all the available universities to render the available options
            .get(`${SERVER_URL}/university`)
            .then(response => {
                // Sort order of universities alphabetically
                const universitiesSorted = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

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
            })
            .catch(error => {
                console.log(error);
            });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onCancel = e => {
        e.preventDefault();
        this.props.history.push('');
    };

    onChangeUniversity = e => {
        this.setState({ [e.target.name]: e.target.value });

        axios
            // Get all the available universities to render the available options
            .get(`${SERVER_URL}/university/${e.target.value}`)
            .then(response => {
                let facultiesSorted = [];

                // Sort all universities by their name alphabetically
                response.data.faculties
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .forEach(item => {
                        facultiesSorted.push({
                            id: item._id,
                            name: item.name
                        });
                    });

                // Set the selected university to the first displayed university
                if (facultiesSorted.length > 0) {
                    this.setState({
                        faculty: facultiesSorted[0].id,
                        availableFaculties: facultiesSorted
                    });
                } else {
                    this.setState({
                        faculty: '',
                        availableFaculties: []
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            name: this.state.name,
            university: this.state.university,
            faculty: this.state.faculty
        };

        axios
            .post(`${SERVER_URL}/course`, data)
            .then(res => {
                console.log('success');
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
                <div className={classes.component}>
                    <div className={`container ${classes.padding_top}`}>
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
                                        Select the University of the course which you would like to
                                        create!
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Faculty</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="faculty"
                                        onChange={this.onChange}>
                                        {this.state.availableFaculties.map((item, _) => (
                                            <option value={item.id}>{item.name}</option>
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
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CreateCourse);
