import React, { Component } from 'react';
import { Button, Form, Card, Row } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import '../App.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import NumericInput from 'react-numeric-input';

import 'react-datepicker/dist/react-datepicker.css';

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
    file_selector: {
        paddingTop: '1.12rem',
        paddingLeft: '20px',
        width: '20rem'
    },
    form_selectors: {
        paddingTop: '8px',
        paddingLeft: '5rem'
    },
    date_picker: {
        paddingLeft: '20px',
        width: '20rem',
        paddingTop: '1.1rem'
    },
    numeric_input: {
        paddingTop: '2.2rem',
        paddingLeft: '20px'
    },
    checkmarks_left: {
        paddingTop: '2.2rem',
        paddingLeft: '3.1rem'
    },
    description_area: {
        width: '40rem'
    },
    padding_top: {
        paddingTop: '5rem'
    },
    button_box: {
        position: 'absolute',
        right: '1rem',
        paddingTop: '5rem'
    },
    button: {
        width: '10rem',
        height: '3rem'
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
    'Enter your hourly wage (€/h)',
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
                                    <Row className={classes.padding_top}>
                                        <div className="col-sm-4">
                                            <div className={classes.checkmarks_left}>
                                                <Form.Check name="terms" label="Remote" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className={classes.checkmarks_left}>
                                                <Form.Check name="terms" label="Onsite" />
                                            </div>
                                        </div>
                                    </Row>
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
                                    <Form.Group className={classes.file_selector}>
                                        <Form.File id="cvFile" />
                                    </Form.Group>
                                    <Form.Group className={classes.file_selector}>
                                        <Form.File id="transcriptFile" />
                                    </Form.Group>
                                    <div className={classes.date_picker}>
                                        <DatePicker
                                            selected={this.state.date}
                                            name="date"
                                            showTimeSelect
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            onChange={this.onChangeDate}></DatePicker>
                                    </div>
                                    <div className={classes.numeric_input}>
                                        <NumericInput
                                            className={'form-control'}
                                            min={1}
                                            max={100}
                                        />
                                    </div>
                                    <div className={classes.numeric_input}>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="(max. 200 words)"
                                            rows={5}
                                            className={classes.description_area}
                                        />
                                    </div>
                                </div>
                            </Row>
                            <div className={classes.button_box}>
                                {/* Register Button */}
                                <Button
                                    variant="primary"
                                    size="lg"
                                    active
                                    className={classes.button}
                                    onClick={this.onRegister}>
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
        );
    }
}

export default withStyles(styles)(CreateOffering);
