import React, { Component } from 'react';
import { Card, Button, Container, Col, Row, Form } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import { parseJwt } from '../services/AuthHeader';
import { getAllBookingsByUserId } from '../services/BookingService';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import PreviousSessionCard from './PreviousSessionCard';
import UpcomingSessionCard from './UpcomingSessionCard';
import { withRouter } from 'react-router';

const defaultState = {
    userId: '',
    previousSessions: [],
    upcomingSessions: [],
    bookings: []
};

const styles = () => ({
    container: {
        paddingLeft: '4rem',
        paddingRight: '4rem'
    },
    card: {
        paddingTop: '2rem',
        minHeight: '60rem',
        maxHeight: '70rem',
        height: '50rem',
        minWidth: '145rem',
        maxWidth: '145rem',
        width: '145rem'
    },
    header: {
        paddingTop: '2rem'
    },
    upcomingSessionHeader: {
        paddingLeft: '3rem'
    },
    previousSessionHeader: {
        paddingLeft: '3rem'
    },
    upcomingSessionRow: {
        height: '25rem',
        minHeight: '20rem',
        maxHeight: '30rem',
        minWidth: '145rem',
        maxWidth: '145rem',
        width: '145rem',
        overflowX: 'auto'
    },
    previousSessionRow: {
        height: '25rem',
        minHeight: '20rem',
        maxHeight: '30rem',
        minWidth: '145rem',
        maxWidth: '145rem',
        width: '145rem',
        overflowX: 'auto'
    },
    sessionColumn: {
        width: '30rem',
        minWidth: '30rem',
        maxWidth: '30rem',
        paddingLeft: '4rem',
        paddingTop: '1rem'
    },
    sessionColumnWrapper: {
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingBottom: '1rem',
        paddingTop: '1rem'
    },
    sessionColumnCard: {
        height: '25rem',
        minHeight: '20rem',
        maxHeight: '30rem',
        minWidth: '145rem',
        maxWidth: '145rem',
        width: '145rem',
        overflowX: 'auto'
    }
});

// /components/ListUserSessions.js
class ListUserSessions extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }

    onClick() {}

    componentDidMount() {
        const currentUserJwt = AuthService.getCurrentUser();
        const currentUser = parseJwt(currentUserJwt);
        const currentUserId = currentUser._id;
        this.setState({
            userId: currentUserId
        });

        getAllBookingsByUserId(
            currentUserId,
            response => {
                const currentDate = new Date();
                const upcomingSessions = response.data.filter(
                    session => currentDate < new Date(session.startDate)
                );

                const previousSessions = response.data.filter(
                    session => currentDate >= new Date(session.startDate)
                );

                this.setState({
                    previousSessions: previousSessions,
                    upcomingSessions: upcomingSessions,
                    bookings: response.data
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <h3>Manage my Bookings</h3>
                    </div>

                    <Card className={classes.card}>
                        <div className={classes.upcomingSessionHeader}>
                            <h4>Upcoming Sessions</h4>
                        </div>
                        <Row className={classes.upcomingSessionRow}>
                            {this.state.upcomingSessions.map((item, index) => (
                                <Col className={classes.sessionColumn}>
                                    <UpcomingSessionCard
                                        value={index}
                                        session={item}></UpcomingSessionCard>
                                </Col>
                            ))}
                        </Row>
                        <hr />
                        <div className={classes.upcomingSessionHeader}>
                            <h4>Previous Sessions</h4>
                        </div>
                        <Row className={classes.previousSessionRow}>
                            {this.state.previousSessions.map((item, index) => (
                                <div className={classes.sessionColumnWrapper}>
                                    <Col className={classes.sessionColumn}>
                                        <PreviousSessionCard
                                            value={index}
                                            session={item}></PreviousSessionCard>
                                    </Col>
                                </div>
                            ))}
                        </Row>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(ListUserSessions));
