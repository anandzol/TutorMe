import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/styles';
import formattedDate from '../utils/DateUtils';
import { confirmAlert } from 'react-confirm-alert';
import { deleteSessionById } from '../services/SessionService';
const styles = () => ({
    cardWrapper: {
        minHeight: '15rem',
        width: '100%',
        minWidth: '100%',
        paddingRight: '2.5rem'
    },
    header: {
        fontSize: '18px',
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        fontWeight: 500
    },
    card: {
        minWidth: '10rem',
        width: '100%',
        height: '16rem'
    },
    description: {
        paddingTop: '0.5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        minHeight: '5rem',
        maxHeight: '5rem',
        height: '5rem',
        overFlow: 'auto'
    },
    verifiedHeader: {
        backgroundColor: '#a5c5a7',
        color: 'black'
    },
    price: {
        maxHeight: '2rem',
        height: '1rem',
        paddingLeft: '1rem'
    },
    location: {
        maxHeight: '2rem',
        height: '1rem',
        paddingLeft: '1rem'
    },
    hr: {
        marginTop: '0.5rem',
        marginBottom: '0.5rem'
    },
    cancelButton: {
        width: '180%'
    },
    cancelButtonWrapper: {
        right: '4rem',
        position: 'absolute',
        bottom: '0rem'
    },
    pendingHeader: {
        backgroundColor: '#fdf7b7'
    },
    rejectedHeader: {
        backgroundColor: '#c04431',
        color: 'black'
    }
});

class SessionCard extends Component {
    constructor(props) {
        super();
        let formattedSession = props.session;
        let date = new Date(props.session.createdAt);
        const dateFormatted = formattedDate(date);

        let startDate = new Date(props.session.date);
        const startDateFormatted = formattedDate(startDate);

        formattedSession['createdAtFormatted'] = dateFormatted;
        formattedSession['startDateFormatted'] = startDateFormatted;

        this.state = formattedSession;
    }

    onDelete = () => {
        const { classes } = this.props;

        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="alert">
                        <h1 className="alert__title">Confirm Deletion</h1>
                        <p className="alert__body">
                            Are you sure would like to cancel this session?
                        </p>
                        <div className="text-center">
                            <button
                                onClick={() => {
                                    const sessionId = this.state.id;
                                    deleteSessionById(
                                        sessionId,
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

    render() {
        const { classes } = this.props;

        let location = '';
        if (this.state.onsite) {
            location += ' Onsite';
        }
        if (this.state.remote) {
            location += ' Remote';
        }

        let header;

        if (this.state.status === 'verified') {
            header = (
                <div className={classes.verifiedHeader}>
                    <div className={classes.header}>{this.state.course.name}</div>
                </div>
            );
        } else if (this.state.status === 'pending') {
            header = (
                <div className={classes.pendingHeader}>
                    <div className={classes.header}>{this.state.course.name}</div>
                </div>
            );
        } else if (this.state.status === 'rejected') {
            header = (
                <div className={classes.rejectedHeader}>
                    <div className={classes.header}>{this.state.course.name}</div>
                </div>
            );
        }

        return (
            <div className={classes.cardWrapper}>
                <Card className={classes.card}>
                    {header}
                    <div
                        className={
                            classes.description
                        }>{`Description: ${this.state.description}`}</div>{' '}
                    <hr className={classes.hr} />
                    <div className={classes.price}>{`Price: ${this.state.price}€`}</div>
                    <hr className={classes.hr} />
                    <div className={classes.location}>{`Location: ${location}`}</div>
                    <hr className={classes.hr} />
                    <div
                        className={
                            classes.location
                        }>{`Created At: ${this.state.createdAtFormatted}`}</div>
                    <div className={classes.cancelButtonWrapper}>
                        <button
                            className={`${classes.cancelButton} btn btn-danger`}
                            onClick={this.onDelete}>
                            Delete
                        </button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(SessionCard));
