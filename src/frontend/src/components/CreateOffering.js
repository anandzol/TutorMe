import React, { Component } from 'react';
import { Button, Form, Card, Row } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import '../App.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import NumericInput from 'react-numeric-input';

const styles = () => ({
    title: {
        position: 'relative',
        paddingTop: '4rem',
        left: '400px',
        fontSize: 'xx-large',
        paddingBottom: '0.5rem',
        fontWeight: 'bold'
    },
    card: {
        position: 'absolute',
        paddingTop: '1rem',
        left: '400px',
        width: '90rem',
        height: '55rem'
    },
    vl: {
        borderLeft: '1px solid #dfdfdf',
        height: '52rem',
        position: 'relative',
        left: '50%',
        marginLeft: '-3px',
        paddingTop: '10px'
    },
    form_option: {
        paddingTop: '1.1rem',
        paddingLeft: '20px',
        width: '20rem'
    },
    form_label: {
        paddingTop: '2.2rem',
        paddingLeft: '50px',
        fontSize: '17px'
    },
    form_selectors: {
        paddingTop: '8px',
        paddingLeft: '5rem'
    },
    numeric_input: {
        paddingTop: '1rem',
        paddingLeft: '5rem',
        height: '1rem'
    }
});

const defaultState = {
    university: '',
    faculty: '',
    course: '',
    wage: 1,
    remote: false,
    onsite: false,
    description: '',
    tutorId: '',
    date: new Date(),
    duration: 30,
    availableUniversities: [],
    availableFaculties: [],
    availableCourses: []
};

const labels = [
    'Choose the University of your Course',
    'Choose the Faculty of your Course',
    'Choose the Course that you are offering',
    'Upload CV',
    'Upload relevant course transcripts',
    'Dates/Time offered',
    'Enter your hourly wage',
    'Description'
];
const SERVER_URL = 'http://localhost:8082/api';

// /components/CreateOferring.js
class CreateOffering extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeDate = e => {
        this.setState({
            date: Date.parse(e)
        });
    };

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

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.title}>Offer Course</div>
                <div className="container">
                    <Card className={classes.card}>
                        <Form>
                            <Row>
                                <div className="col-sm-4">
                                    {labels.map((item, index) => (
                                        <div>
                                            <Form.Label className={classes.form_label}>
                                                {item}
                                            </Form.Label>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-sm-0">
                                    <div className={classes.vl}></div>
                                </div>
                                <div className={`${classes.form_selectors} col-sm-3`}>
                                    <Form.Group controlId="gender" className={classes.form_option}>
                                        <Form.Control
                                            name="gender"
                                            as="select"
                                            onChange={this.onChange}>
                                            <option values="male">Male</option>
                                            <option values="female">Female</option>
                                            <option>Undefined</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="gender" className={classes.form_option}>
                                        <Form.Control
                                            name="gender"
                                            as="select"
                                            onChange={this.onChange}>
                                            <option values="male">Male</option>
                                            <option values="female">Female</option>
                                            <option>Undefined</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="gender" className={classes.form_option}>
                                        <Form.Control
                                            name="gender"
                                            as="select"
                                            onChange={this.onChange}>
                                            <option values="male">Male</option>
                                            <option values="female">Female</option>
                                            <option>Undefined</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className={classes.form_option}>
                                        <Form.File id="cvFile" />
                                    </Form.Group>
                                    <Form.Group className={classes.form_option}>
                                        <Form.File id="transcriptFile" />
                                    </Form.Group>
                                    <div className={classes.form_option}>
                                        <DatePicker
                                            selected={this.state.date}
                                            name="date"
                                            showTimeSelect
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            onChange={this.onChangeDate}></DatePicker>
                                    </div>
                                    <div>
                                        <NumericInput className="form-control" />
                                    </div>
                                    <div>
                                        <NumericInput className="form-control" />
                                    </div>
                                </div>
                            </Row>
                        </Form>
                        <Card.Body>
                            <Form></Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CreateOffering);
