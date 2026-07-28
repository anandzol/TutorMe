import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteBookingById } from '../services/BookingService';
import formattedDate from '../utils/DateUtils';
import { JITSI_URI } from '../../src/config';

const styles = () => ({
    card: {
        minHeight: '20rem',
        height: '20rem',
        minWidth: '30rem',
        overFlowY: 'auto'
    },
    headerWrapper: {
        backgroundColor: '#95bcf2'
    },
    header: {
        fontSize: '18px',
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        fontWeight: 500
    },
    inquiry: {
        paddingTop: '0.5rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        minHeight: '6rem',
        maxHeight: '6rem',
        overFlowY: 'auto',
        height: '6rem',
        textAlign: 'left'
    },
    date: {
        paddingLeft: '1rem',
        minHeight: '1.5rem',
        maxHeight: '1.5rem'
    },
    dateWrapper: {
        height: '1.5rem'
    },
    cancelButtonWrapper: {
        right: '1rem',
        paddingTop: '10.7rem',
        position: 'absolute'
    },
    cancelButton: {
        height: '40px',
        width: '7rem'
    },
    jitsiButtonWrapper: {
        right: '1rem',
        paddingTop: '4rem',
        position: 'absolute'
    },
    jitsiButton: {
        height: '40px',
        width: '7rem',
        color: '#ffffff',
        backgroundColor: '#3399DE'
    },
    divider: {
        marginTop: '0.7rem',
        marginBottom: '0.7rem'
    },
    location: {
        paddingLeft: '1rem',
        height: '1.5rem',
        minHeight: '1.5rem',
        maxHeight: '1.5rem'
    },
    name: {
        paddingLeft: '1rem',
        minHeight: '1.5rem',
        height: '1.5rem'
    },
    inquiryWrapper: {
        overflow: 'auto'
    },
    price: {
        float: 'right',
        paddingRight: '1rem',
        paddingBottom: '0rem'
    }
});
// components/UpcomingSessionCard.js
class UpcomingSessionCard extends Component {
    constructor(props) {
        super();
        let formattedState = props.session;
        let date = new Date(props.session.startDate);
        const dateFormatted = formattedDate(date);
        const time = date.toLocaleTimeString();
        let name;
        if (props.session.studentId.firstName !== undefined) {
            name = props.session.studentId.firstName;
        } else if (props.session.tutorId.firstName !== undefined) {
            name = props.session.tutorId.firstName;
        }

        formattedState['name'] = name;

        formattedState['dateFormatted'] = dateFormatted;
        formattedState['isStudent'] = props.isStudent;
        formattedState['time'] = time;
        this.state = props.session;
    }

    onCancel = () => {
        const { classes } = this.props;

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="alert">
                        <h1 className="alert__title">Confirm Deletion</h1>
                        <p className="alert__body">
                            Are you sure would like to cancel this booking?
                        </p>
                        <div className="text-center">
                            <button
                                onClick={() => {
                                    const bookingId = this.state._id;
                                    deleteBookingById(
                                        bookingId,
                                        response => {
                                            window.location.reload();
                                        },
                                        error => {
                                            console.error(error);
                                        }
                                    );
                                    window.location.reload();
                                    onClose();
                                }}
                                className={`btn btn-primary`}>
                                Confirm
                            </button>
                            <button onClick={onClose} className={`btn btn-primary btn-secondary`}>
                                Cancel
                            </button>
                        </div>
                    </div>
                );
            }
        });
    };

    openJitsiWindow = e => {
        const strWindowFeatures = 'height=1920,width=1080';
        const url = JITSI_URI + this.state._id;
        window.open(url, '_blank', strWindowFeatures);
    };

    render() {
        const { classes } = this.props;
        const isStudent = this.state.isStudent;
        let button;
        let nameText;
        if (isStudent) {
            button = (
                <button
                    className={`${classes.cancelButton} btn btn-danger`}
                    onClick={this.onCancel}>
                    Cancel
                </button>
            );
            nameText = `Tutor: ${this.state.name}`;
        } else {
            nameText = `Student: ${this.state.name}`;
        }

        let locationFormatted = ' ';
        if (this.state.onsite) {
            if (this.state.tutorId.adress) {
                locationFormatted += ` ${this.state.tutorId.adress}`;
                if (this.state.tutorId.postalCode) {
                    locationFormatted += `, ${this.state.tutorId.postalCode} ${this.state.tutorId.city}`;
                }
            } else {
                locationFormatted = ' Onsite ';
            }
        }

        return (
            <div>
                <div>
                    <Card className={classes.card}>
                        <div className={classes.headerWrapper}>
                            <div className={classes.header}>{this.state.courseName}</div>
                        </div>

                        <div className={classes.inquiryWrapper}>
                            <div className={classes.inquiry}>{this.state.inquiry}</div>
                            <div className={classes.jitsiButtonWrapper}>
                                <button
                                    className={classes.jitsiButton}
                                    onClick={this.openJitsiWindow}>
                                    Room
                                </button>
                            </div>
                        </div>
                        <hr className={classes.divider} />
                        <div className={classes.date}>
                            {this.state.dateFormatted} {this.state.time}
                        </div>
                        <div className={classes.cancelButtonWrapper}>{button}</div>

                        <hr className={classes.divider} />

                        <div className={classes.location}>
                            Location:
                            {locationFormatted}
                            {this.state.remote ? ' Remote' : ''}
                        </div>
                        <hr />
                        <div className={classes.name}>
                            {nameText}
                            <div className={classes.price}>{`Price: ${this.state.price} €/h`}</div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UpcomingSessionCard);
