import React, { Component } from 'react';
import { Button, Form, Card, Row } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import '../App.css';
import DatePicker from 'react-datepicker';
import NumericInput from 'react-numeric-input';
import { parseJwt } from '../services/AuthHeader';
import AuthService from '../services/AuthService';
import 'react-datepicker/dist/react-datepicker.css';
import {
    getUniversityFacultiesSorted,
    getAllUniversitiesSorted
} from '../services/UniversityService';
import { createSession } from '../services/SessionService';

import { getFacultyCoursesSorted } from '../services/FacultyService';
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
    price: 1,
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
    'Enter your hourly price (€/h)',
    'Description'
];

// /components/CreateTutorialSession.js

class CreateTutorialSession extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangePrice = e => {
        this.setState({ price: e + 1 });
    };

    onChangeDate = e => {
        this.setState({
            date: Date.parse(e)
        });
    };

    onCreate = e => {
        const payload = {
            university: this.state.university,
            faculty: this.state.faculty,
            course: this.state.course,
            tutorId: this.state.tutorId,
            description: this.state.description,
            onsite: this.state.onsite,
            remote: this.state.remote,
            date: this.state.date,
            price: this.state.price,
            status: 'verified'
        };

        createSession(
            payload,
            () => {},
            error => {
                console.error(error);
            }
        );
    };

    onClickCheckmark = e => {
        this.setState({ [e.target.name]: e.target.checked });
    };

    onChangeUniversity = e => {
        const universityId = e.target.value;
        this.setState({ university: universityId });

        getUniversityFacultiesSorted(
            universityId,
            facultiesSorted => {
                if (facultiesSorted.length > 0) {
                    const facultyId = facultiesSorted[0]._id;
                    this.setState({
                        faculty: facultyId,
                        availableFaculties: facultiesSorted
                    });

                    const initialCourses = facultiesSorted[0].courses;

                    if (initialCourses.length > 0) {
                        this.setState({
                            courses: initialCourses[0]._id,
                            availableCourses: initialCourses
                        });
                    } else {
                        this.setState({
                            courses: '',
                            availableCourses: []
                        });
                    }
                } else {
                    this.setState({
                        faculty: '',
                        availableFaculties: [],
                        course: '',
                        availableCourses: []
                    });
                }
            },
            error => {
                console.error(error);
            }
        );
    };

    onChangeFaculty = e => {
        const facultyId = e.target.value;

        getFacultyCoursesSorted(
            facultyId,
            coursesSorted => {
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
            },
            error => {
                console.log(error);
            }
        );
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

        // Set the tutor to the current logged in user
        this.setState({ tutorId: currentUserId });

        getAllUniversitiesSorted(
            universitiesSorted => {
                this.setState({
                    availableUniversities: universitiesSorted
                });

                // Faculties of the first university selected
                const initialFaculty = universitiesSorted[0].faculties;
                if (universitiesSorted.length > 0 && initialFaculty.length > 0) {
                    const availableFacultiesSorted = initialFaculty.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );

                    const initialFacultyId = availableFacultiesSorted[0]._id;
                    this.setState({
                        university: universitiesSorted[0]._id,
                        availableFaculties: availableFacultiesSorted,
                        faculty: initialFacultyId
                    });

                    // Courses of the first faculty selected
                    const initialCourses = initialFaculty[0].courses;

                    if (initialCourses.length > 0) {
                        this.setState({
                            course: initialCourses[0]._id,
                            availableCourses: initialCourses
                        });
                    } else {
                        this.setState({
                            course: '',
                            availableCourses: []
                        });
                    }
                }
            },
            error => {
                console.error(error);
            }
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.component}>
                <div className={`container ${classes.padding_top}`}>
                    <h2 className={`${classes.title}`}>Create Tutorial Session</h2>
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

                                    {/** price Input Form  */}
                                    <div className={classes.numeric_input}>
                                        <NumericInput
                                            className={'form-control'}
                                            name="price"
                                            onChange={this.onChangePrice}
                                            min={1}
                                            max={100}
                                            placeholder={1}
                                        />
                                    </div>

                                    {/** Description Input Form  */}
                                    <div className={classes.numeric_input}>
                                        <Form.Control
                                            as="textarea"
                                            name="description"
                                            onChange={this.onChange}
                                            placeholder="(max. 200 words)"
                                            rows={5}
                                            className={classes.description_area}
                                        />
                                    </div>
                                    <Row className={classes.padding_top}>
                                        {/** Remote Checkmark */}
                                        <div className="col-sm-4">
                                            <div className={classes.checkmarks_left}>
                                                <Form.Check
                                                    name="remote"
                                                    label="Remote"
                                                    onClick={this.onClickCheckmark}
                                                />
                                            </div>
                                        </div>

                                        {/** Onsite Checkmark */}
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
                                    onClick={this.onCreate}>
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

export default withStyles(styles)(CreateTutorialSession);
