import React, { Component } from 'react';
import { Button, Form, Card, Row } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import DateTimePicker from 'react-datetime-picker';
import NumericInput from 'react-numeric-input';
import { parseJwt } from '../services/AuthHeader';
import AuthService from '../services/AuthService';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

import {
    getUniversityFacultiesSorted,
    getAllUniversitiesSorted
} from '../services/UniversityService';
import { getFacultyCoursesSorted } from '../services/FacultyService';
import { createSession } from '../services/SessionService';
import { getAllFiles, getFilesById, uploadFile, deleteFile } from '../services/FileUploadService';
import './styles/styles.css';
import { getUniversityById } from '../services/UniversityService';

import DayPickerInput, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import TimePicker from 'react-time-picker';

const styles = () => ({
    title: {
        position: 'relative',
        fontWeight: 'bold',
        paddingTop: '1rem'
    },
    component: {
        display: 'flex',
        position: 'absolute',
        backgroundColor: '#f0f2f5',
        width: '100%',
        margin: '0'
    },
    card: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    vl: {
        borderLeft: '1px solid #dfdfdf',
        height: '90%',
        position: 'absolute',
        left: '35%',
        paddingTop: '2rem'
    },
    form_option: {
        paddingTop: '1.1rem',
        paddingLeft: '1.1rem',
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
        paddingTop: '1rem',
        paddingLeft: '5rem'
    },
    date_picker: {
        paddingLeft: '1.1rem',
        width: '20rem',
        paddingTop: '2.8rem'
    },
    numeric_input: {
        paddingTop: '2rem',
        paddingLeft: '1.1rem'
    },
    checkmarks_left: {
        paddingTop: '1rem',
        paddingLeft: '2rem'
    },
    checkmarks_right: {
        paddingTop: '1rem',
        paddingLeft: '6rem'
    },
    description_area: {
        width: '275%'
    },
    padding_top: {
        paddingTop: '1rem'
    },
    button_box: {
        position: 'relative',
        left: '70%',
        bottom: '0',
        paddingBottom: '2rem'
    },
    button: {
        width: '10rem',
        height: '3rem'
    },
    cardWrapper: {
        paddingTop: '2rem'
    },
    vlWrapper: {
        paddingTop: '2rem'
    },
    rowButton_box: {
        left: '20rem',
        paddingLeft: '20rem'
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
    duration: 30,
    availableUniversities: [],
    availableFaculties: [],
    availableCourses: [],
    document: [],
    selectedCV: null,
    selectedTranscript: null,
    cv: '',
    transcript: '',
    test: 'initial',
    date: [],
    noEarlyThreshold: '17:00',
    noLaterThreshold: '23:00'
};

const labels = [
    'Choose the University of your Course',
    'Choose the Faculty of your Course',
    'Choose the Course that you are offering',
    'Upload CV',
    'Upload relevant course transcripts',
    'Enter your hourly price (???/h)',
    'Description',
    '', //fill empty labels for multi-line text box
    '',
    '',
    'Mode',
    'Dates offered',
    '', //fill empty labels after multi datepicker
    '',
    '',
    '',
    'No earlier than',
    'No later than'
];

// /components/CreateTutorialSession.js
class CreateTutorialSession extends Component {
    constructor() {
        super();
        this.state = defaultState;
        this.handleDayClick = this.handleDayClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeNoEarlyThreshold = e => {
        this.setState({ noEarlyThreshold: e });
    };

    onChangeNoLaterThreshold = e => {
        this.setState({ noLaterThreshold: e });
    };

    handleDayClick(day, { selected }) {
        const date = this.state.date.concat();
        if (selected) {
            const selectedIndex = date.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            date.splice(selectedIndex, 1);
        } else {
            date.push(day);
        }
        this.setState({ date });
    }

    onChangePrice = e => {
        this.setState({ price: e + 1 });
    };

    onChangeDate = e => {
        this.setState({
            date: Date.parse(e)
        });
    };

    onCancel = e => {
        this.props.history.push('/home');
    };

    onCreate = e => {
        if ((this.state.selectedCV && this.state.selectedTranscript) == null) {
            alert('Please upload CV and Transcript ');
            return;
        }
        uploadFile(
            this.state.selectedCV,
            response => {
                // var docs = [];
                this.setState({ cv: response.data._id }, () => {
                    uploadFile(this.state.selectedTranscript, response => {
                        this.setState({ transcript: response.data._id }, () => {
                            const payload = {
                                university: this.state.university,
                                faculty: this.state.faculty,
                                course: this.state.course,
                                tutorId: this.state.tutorId,
                                description: this.state.description,
                                onsite: this.state.onsite,
                                remote: this.state.remote,
                                date: this.state.date,
                                noEarlyThreshold: this.state.noEarlyThreshold,
                                noLaterThreshold: this.state.noLaterThreshold,
                                price: this.state.price,
                                status: 'pending',
                                cv: this.state.cv,
                                transcript: this.state.transcript
                            };

                            createSession(
                                payload,
                                () => {},
                                error => {
                                    alert('Failed to create a session');
                                    console.error(error);
                                }
                            );

                            this.props.history.push('/home');
                        });
                    });
                });
            },
            error => {
                console.error(error);
            }
        );
    };

    onChangeCV = e => {
        this.setState({
            selectedCV: e.target.files[0],
            loaded: 0
        });
    };

    onChangeTranscript = e => {
        this.setState({
            selectedTranscript: e.target.files[0],
            loaded: 0
        });
    };

    onClickCheckmark = e => {
        this.setState({ [e.target.name]: e.target.checked });
    };

    onChangeUniversity = e => {
        const universityId = e.value;
        this.setState({ university: universityId });

        getUniversityFacultiesSorted(
            universityId,
            facultiesSorted => {
                if (facultiesSorted.length > 0) {
                    const facultyId = facultiesSorted[0]._id;

                    let facultiesFormatted = [];
                    facultiesSorted.forEach(faculty => {
                        facultiesFormatted.push({
                            value: faculty._id,
                            label: faculty.name
                        });
                    });

                    this.setState({
                        faculty: facultyId,
                        availableFaculties: facultiesFormatted
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
        const facultyId = e.value;

        getFacultyCoursesSorted(
            facultyId,
            coursesSorted => {
                if (coursesSorted.length > 0) {
                    let coursesFormatted = [];
                    coursesSorted.forEach(course => {
                        coursesFormatted.push({
                            value: course._id,
                            label: course.name
                        });
                    });
                    this.setState({
                        course: coursesSorted[0]._id,
                        availableCourses: coursesFormatted
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

    onChangeCourse = e => {
        this.setState({
            course: e.value
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

        // Set the tutor to the current logged in user
        this.setState({ tutorId: currentUserId });

        getAllUniversitiesSorted(
            universitiesSorted => {
                let universitiesFormatted = [];
                universitiesSorted.forEach(university => {
                    universitiesFormatted.push({
                        label: university.name,
                        value: university._id
                    });
                });

                this.setState({
                    availableUniversities: universitiesFormatted
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
                    <div className={classes.cardWrapper}>
                        <Card className={`${classes.card} d-flex`}>
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
                                    <div className={`${classes.vlWrapper} col-sm-0`}>
                                        <div className={classes.vl}></div>
                                    </div>
                                    <div className={`${classes.form_selectors} col-sm-3`}>
                                        {/** Form for selecting the unversity*/}
                                        <Form.Group
                                            controlId="universityGroup"
                                            className={classes.form_option}>
                                            <Select
                                                placeholder="University"
                                                options={this.state.availableUniversities}
                                                onChange={this.onChangeUniversity}></Select>
                                        </Form.Group>

                                        {/** Form for selecting the corresponding faculty*/}
                                        <Form.Group
                                            controlId="universityGroup"
                                            className={classes.form_option}>
                                            <Select
                                                placeholder="Faculty"
                                                options={this.state.availableFaculties}
                                                onChange={this.onChangeFaculty}></Select>
                                        </Form.Group>

                                        {/** Form for selecting the corresponding course*/}
                                        <Form.Group
                                            controlId="universityGroup"
                                            className={classes.form_option}>
                                            <Select
                                                placeholder="Course"
                                                options={this.state.availableCourses}
                                                onChange={this.onChangeCourse}></Select>
                                        </Form.Group>

                                        {/** Form for uploading a cv*/}
                                        <Form.Group className={classes.file_selector}>
                                            <Form.File
                                                id="cvFile"
                                                name="document"
                                                onChange={this.onChangeCV}
                                            />
                                        </Form.Group>

                                        {/** Right Form for selecting the corresponding course*/}
                                        <Form.Group className={classes.file_selector}>
                                            <Form.File
                                                id="transcriptFile"
                                                name="document"
                                                onChange={this.onChangeTranscript}
                                            />
                                        </Form.Group>

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
                                            <div className={`col-sm-4 ${classes.checkmarks_left}`}>
                                                <Form.Check
                                                    name="remote"
                                                    label="Remote"
                                                    onClick={this.onClickCheckmark}
                                                />
                                            </div>

                                            {/** Onsite Checkmark */}
                                            <div className={`col-sm-4 ${classes.checkmarks_right}`}>
                                                <Form.Check
                                                    name="onsite"
                                                    label="Onsite"
                                                    onClick={this.onClickCheckmark}
                                                />
                                            </div>
                                            <div className={classes.date_picker}>
                                                <DayPickerInput
                                                    selectedDays={this.state.date}
                                                    onDayClick={this.handleDayClick}
                                                    disabledDays={[
                                                        new Date(),
                                                        {
                                                            before: new Date()
                                                        }
                                                    ]}
                                                />
                                            </div>
                                            <div className={classes.numeric_input}>
                                                <TimePicker
                                                    onChange={this.onChangeNoEarlyThreshold}
                                                    value={this.state.noEarlyThreshold}
                                                    maxDetail="hour"
                                                />
                                            </div>
                                            <div className={classes.date_picker}>
                                                <TimePicker
                                                    onChange={this.onChangeNoLaterThreshold}
                                                    value={this.state.noLaterThreshold}
                                                    maxDetail="hour"
                                                />
                                            </div>
                                        </Row>
                                    </div>
                                </Row>
                            </Form>
                            <div className={classes.button_box}>
                                {/* Create Button */}
                                <Button
                                    variant="primary"
                                    size="lg"
                                    active
                                    className={`btn btn-lg ml-auto ${classes.button}`}
                                    onClick={this.onCreate}>
                                    Create
                                </Button>

                                {/* Cancel Button */}
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    active
                                    className={`btn  btn-lg ml-auto ${classes.button}`}
                                    onClick={this.onCancel}>
                                    Cancel
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CreateTutorialSession);
