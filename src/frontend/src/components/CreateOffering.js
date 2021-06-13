import React, { Component } from 'react';
import { Button, Form, Card, Row } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import '../App.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import NumericInput from 'react-numeric-input';
import { parseJwt } from '../services/AuthHeader';
import AuthService from '../services/AuthService';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllUniversitiesSorted } from '../services/UniversityService';
// @todo: Refactor api calls to faculty/university service
const styles = () => ({
    title: {
        position: 'relative',
        paddingTop: '4rem',
        paddingBottom: '1rem',
        fontWeight: 'bold',
        left: '-18rem'
    },
    component: {
        position: 'relative',
        backgroundColor: '#f0f2f5',
        paddingTop: '10px',
        paddingBottom: '10px',
        minHeight: '100vh',
        color: 'black'
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
        paddingLeft: '20px'
    },
    description_area: {
        width: '40rem'
    },
    padding_top: {
        paddingTop: '1rem'
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

    onClickCheckmark = e => {
        this.setState({ [e.target.name]: e.target.checked });
    };

    onClick = e => {
        console.log(this.state);
    };

    // Refactor this to use university service
    // onChangeUniversity = e => {
    //     const universityId = e.target.value;
    //     this.setState({ [e.target.name]: universityId });

    //     axios
    //         Get all the available faculties to render the available options
    //         .get(`${SERVER_URL}/university/${e.target.value}`)
    //         .then(response => {
    //             let facultiesSorted = [];

    //             Sort all universities by their name alphabetically
    //             response.data.faculties
    //                 .sort((a, b) => a.name.localeCompare(b.name))
    //                 .forEach(item => {
    //                     facultiesSorted.push({
    //                         _id: item._id,
    //                         name: item.name
    //                     });
    //                 });

    //             Set the selected university to the first displayed university
    //             if (facultiesSorted.length > 0) {
    //                 this.setState({
    //                     faculty: facultiesSorted[0]._id,
    //                     availableFaculties: facultiesSorted
    //                 });

    //                 axios
    //                     .get(`${SERVER_URL}/faculty/courses/${facultiesSorted[0]._id}`)
    //                     .then(response => {
    //                         let coursesSorted = [];

    //                         response.data
    //                             .sort((a, b) => a.name.localeCompare(b.name))
    //                             .forEach(item => {
    //                                 coursesSorted.push({ _id: item._id, name: item.name });
    //                             });

    //                         if (coursesSorted.length > 0) {
    //                             this.setState({
    //                                 course: coursesSorted[0]._id,
    //                                 availableCourses: coursesSorted
    //                             });
    //                         } else {
    //                             this.setState({
    //                                 course: '',
    //                                 availableCourses: []
    //                             });
    //                         }
    //                     })
    //                     .catch(error => {
    //                         console.log(error);
    //                     });
    //             } else {
    //                 this.setState({
    //                     faculty: '',
    //                     availableFaculties: [],
    //                     course: '',
    //                     availableCourses: []
    //                 });
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // };

    async onChangeUniversity() {}

    onChangeFaculty = e => {
        const facultyId = e.target.value;
        axios
            .get(`${SERVER_URL}/faculty/courses/${facultyId}`)
            .then(response => {
                let coursesSorted = [];

                response.data
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .forEach(item => {
                        coursesSorted.push({ _id: item._id, name: item.name });
                    });

                if (coursesSorted.length > 0) {
                    this.setState({
                        course: coursesSorted[0]._id,
                        availableCourses: coursesSorted
                    });
                } else {
                    this.setState({
                        course: '',
                        availableCourses: []
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    validateInput() {
        let input = this.state;
        if (input['university'] === '' || input['faculty'] === '' || input['course'] === '') {
            return false;
        }
        return true;
    }

    componentDidMount() {
        // Set the tutor id to the user which is currently logged in
        const currentUserToken = AuthService.getCurrentUser();
        const currentUserId = parseJwt(currentUserToken)._id;
        this.setState({ tutorId: currentUserId });

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
            <div className={classes.component}>
                <div className={`container ${classes.padding_top}`}>
                    <h2 className={`${classes.title}`}>Offer Course</h2>
                    <Card className={classes.card}>
                        <Form>
                            <Row>
                                {/** First Column with labels describin the right input */}
                                <div className="col-sm-4">
                                    {labels.map((item, _) => (
                                        <div>
                                            <Form.Label className={classes.form_label}>
                                                {item}
                                            </Form.Label>
                                        </div>
                                    ))}
                                </div>

                                {/** Vertical Separator */}
                                <div className="col-sm-0">
                                    <div className={classes.vl}></div>
                                </div>
                                <div className={`${classes.form_selectors} col-sm-3`}>
                                    {/** Form for selecting the unversity*/}
                                    <Form.Group
                                        controlId="universityGroup"
                                        className={classes.form_option}>
                                        <Form.Control
                                            as="select"
                                            name="university"
                                            onChange={this.onChangeUniversity}>
                                            {this.state.availableUniversities.map((item, _) => (
                                                <option value={item._id}>{item.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                    {/** Form for selecting the corresponding faculty*/}
                                    <Form.Group
                                        controlId="universityGroup"
                                        className={classes.form_option}>
                                        <Form.Control
                                            as="select"
                                            name="faculty"
                                            onChange={this.onChangeFaculty}>
                                            {this.state.availableFaculties.map((item, _) => (
                                                <option value={item._id}>{item.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                    {/** Form for selecting the corresponding course*/}
                                    <Form.Group
                                        controlId="universityGroup"
                                        className={classes.form_option}>
                                        <Form.Control
                                            as="select"
                                            name="course"
                                            onChange={this.onChange}>
                                            {this.state.availableCourses.map((item, _) => (
                                                <option value={item._id}>{item.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>

                                    {/** Form for uploading a cv*/}
                                    <Form.Group className={classes.file_selector}>
                                        <Form.File id="cvFile" />
                                    </Form.Group>

                                    {/** Right Form for selecting the corresponding course*/}
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
                                    <Row className={classes.padding_top}>
                                        <div className="col-sm-4">
                                            <div className={classes.checkmarks_left}>
                                                <Form.Check
                                                    name="remote"
                                                    label="Remote"
                                                    onClick={this.onClickCheckmark}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className={classes.checkmarks_left}>
                                                <Form.Check
                                                    name="onsite"
                                                    label="Onsite"
                                                    onClick={this.onClickCheckmark}
                                                />
                                            </div>
                                        </div>
                                    </Row>
                                </div>
                            </Row>
                            <div className={classes.button_box}>
                                {/* Register Button */}
                                <Button
                                    variant="primary"
                                    size="lg"
                                    active
                                    className={classes.button}
                                    onClick={this.onClick}>
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
