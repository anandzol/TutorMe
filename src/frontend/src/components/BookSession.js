import React, { Component } from 'react';
import { getSessionById } from '../services/SessionService';
import { getTutorById } from '../services/TutorService';
import AuthService from '../services/AuthService';
import { parseJwt } from '../services/AuthHeader';
import { Card, Button, Col, Row, Form } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import { BsPersonFill, BsClock, BsGeoAlt } from 'react-icons/bs';
import { BiMoney } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import { bookSession } from '../services/BookingService';
import ToPayment from './BookSessionPayment';

import './styles/bookSession.css';

const defaultState = {
    id: '',
    description: '',
    price: 0,
    tutorName: '',
    courseName: '',
    inquiry: '',
    remote: false,
    onsite: false,
    tutorAvailability: '',
    studentId: '',
    tutorId: '',
    startDate: new Date()
};

const styles = () => ({
    card: {
        minHeight: '50rem',
        maxHeight: '60rem',
        height: '50rem',
        paddingTop: '2rem',
        paddingRight: '2rem',
        paddingLeft: '1rem'
    },
    component: {
        paddingTop: '3rem',
        paddingLeft: '2rem',
        paddingRight: '2rem'
    },
    vertical: {
        width: '1px',
        height: '20px',
        display: 'inline-block'
    },
    column: {
        paddingTop: '1.5rem',
        marginLeft: 'auto'
    },
    courseTitle: {
        fontStyle: 'italic'
    },
    sessionInfo: {
        paddingTop: '3rem',
        paddingRight: '2rem'
    },
    sessionDetails: {
        paddingTop: '3rem'
    },
    paddingTop: {
        paddingTop: '2rem'
    },
    textInput: {
        height: '25rem',
        width: '50rem'
    },
    datepicker: {
        height: '25rem',
        width: '25rem'
    },
    button_box: {
        position: 'absolute',
        right: '3rem',
        paddingTop: '2rem'
    },
    button: {
        paddingRight: '1rem'
    }
});

// components/BookSession.js
class BookSession extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }

    setStartDate = e => {
        this.setState({
            startDate: e
        });
    };

    componentDidMount() {
        const sessionId = this.props.match.params.id;
        const currentUserJWT = AuthService.getCurrentUser();

        const currentUser = parseJwt(currentUserJWT);
        this.setState({
            id: sessionId,
            studentId: currentUser._id
        });
        getSessionById(
            sessionId,
            response => {
                const tutorId = response.data.tutorId.id;
                getTutorById(
                    tutorId,
                    tutor => {
                        this.setState({
                            tutorId: tutorId,
                            tutorName: tutor.data.name
                        });
                    },
                    error => {
                        console.error(error);
                    }
                );

                const session = response.data;

                this.setState({
                    price: session.price,
                    onsite: session.onsite,
                    remote: session.remote,
                    courseName: session.course.name,
                    description: session.description
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    onChangeInquiry = e => {
        this.setState({
            inquiry: e.target.value
        });
    };

    onCancel = e => {
        this.props.history.goBack();
    };

    onClick = e => {
        const data = {
            sessionId: this.state.id,
            description: this.state.description,
            price: this.state.price,
            inquiry: this.state.inquiry,
            remote: this.state.remote,
            onsite: this.state.onsite,
            startDate: this.state.startDate,
            courseName: this.state.courseName,
            studentId: this.state.studentId,
            tutorId: this.state.tutorId
        };

        // ToPayment(data)
        this.props.history.push(data);
        this.props.history.push(`/book-session/${this.state.id}/payment`, { state: data });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.component}>
                <h3>Book your Session</h3>
                <div>
                    <Card className={classes.card}>
                        <Row>
                            <Col className={classes.column}>
                                <h4>Session Details</h4>
                                <div className={classes.courseTitle}>{this.state.courseName}</div>
                                <div className={classes.sessionDetails}>
                                    <div>
                                        <BsPersonFill className={classes.icon} />
                                        {` ${this.state.tutorName}`}
                                    </div>
                                    <div>
                                        <BsClock className={classes.icon} /> 60 mins
                                    </div>
                                    <div>
                                        <BsGeoAlt className={classes.icon} /> Remote
                                    </div>
                                    <div>
                                        <BiMoney className={classes.icon} />
                                        {` ${this.state.price} €/h`}
                                    </div>
                                    <div>
                                        <Form className={classes.paddingTop}>
                                            <Form.Control
                                                as="textarea"
                                                name="inquiry"
                                                placeholder="Provide a brief description of your needs for your tutor! (max 200 words)"
                                                row={20}
                                                className={classes.textInput}
                                                spellCheck={true}
                                                onChange={this.onChangeInquiry}></Form.Control>
                                        </Form>
                                    </div>
                                </div>
                            </Col>
                            <Col className={classes.column}>
                                <h4>{`${this.state.tutorName}'s Availability`}</h4>
                                <div className={classes.courseTitle}>Select Date & Time</div>
                                <div className="bookSession">
                                    <DatePicker
                                        selected={this.startDate}
                                        onChange={this.setStartDate}
                                        inline
                                        showTimeSelect
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Card>
                    <div className={classes.button_box}>
                        {/* Register Button */}
                        <Button
                            variant="primary"
                            size="lg"
                            active
                            className={classes.button}
                            onClick={this.onClick}>
                            Book Session
                        </Button>

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
        );
    }
}

export default withStyles(styles)(BookSession);
