import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import { parseJwt } from '../services/AuthHeader';
import { getAllBookingsByUserId } from '../services/BookingService';
import PreviousSessionCard from './PreviousSessionCard';
import UpcomingSessionCard from './UpcomingSessionCard';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import Pagination from '@material-ui/lab/Pagination';
import SearchField from 'react-search-field';

const useStyles = makeStyles(theme => ({
    container: {
        paddingLeft: '4rem',
        paddingRight: '4rem'
    },
    card: {
        position: 'relative',
        paddingTop: '1.5rem',
        height: '100%',
        width: '100%'
    },
    header: {
        paddingTop: '2rem',
        paddingBottom: '1rem'
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
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden'
    },
    previousSessionRow: {
        height: '25rem',
        minHeight: '20rem',
        maxHeight: '30rem',
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden'
    },
    sessionColumn: {
        width: '100%',
        paddingLeft: '4rem',
        paddingTop: '1rem'
    },
    sessionColumnWrapper: {
        width: '32%',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingBottom: '1rem',
        paddingTop: '1rem'
    },
    sessionColumnCard: {
        height: '25rem',
        minHeight: '20rem',
        maxHeight: '30rem',
        maxWidth: '145rem',
        width: '145rem',
        overflowX: 'auto'
    },
    pagination: {
        paddingLeft: '2rem',
        paddingBottom: '1.5rem'
    },
    searchField: {
        position: 'relative',
        float: 'right',
        paddingRight: 'rem'
    }
}));

// /components/ListUserSessions.js
const ListUserSessions = () => {
    const [previousSessions, setPreviousSessions] = useState([]);
    const [upcomingSessions, setUpcomingSessions] = useState([]);
    const [displayedPreviousSessions, setDisplayedPreviousSessions] = useState([]);
    const [displayedUpcomingSessions, setDisplayedUpcomingSessions] = useState([]);
    const [previousSessionsPages, setPreviousSessionsPages] = useState(0);
    const [upcomingSessionsPages, setUpcomingSessionsPages] = useState(0);
    const [upcomingActivePage, setUpcomingActivePage] = useState(1);
    const [previousActivePage, setPreviousActivePage] = useState(1);
    const [filteredPreviousSessions, setFilteredPreviousSessions] = useState([]);
    const [filteredUpcomingSessions, setFilteredUpcomingSessions] = useState([]);
    const [renderStudentOptions, setRenderStudentOptions] = useState(false);
    useEffect(() => {
        const currentUserJwt = AuthService.getCurrentUser();

        if (currentUserJwt === null) {
            return;
        }

        const currentUser = parseJwt(currentUserJwt);
        const currentUserId = currentUser._id;

        if (AuthService.isAdmin() || AuthService.isStudent()) {
            setRenderStudentOptions(true);
        }
        getAllBookingsByUserId(
            currentUserId,
            response => {
                const currentDate = new Date();
                const bookings = response.data;

                const upcomingSessions = bookings.filter(
                    session => currentDate < new Date(session.startDate)
                );

                const previousSessions = bookings.filter(
                    session => currentDate >= new Date(session.startDate)
                );
                // We display the nearest (e.g. closest to the current date) first for upcoming sessions
                upcomingSessions.sort(function (a, b) {
                    return new Date(a.startDate) - new Date(b.startDate);
                });
                previousSessions.sort(function (a, b) {
                    return new Date(b.startDate) - new Date(a.startDate);
                });

                setUpcomingSessions(previousSessions);
                setPreviousSessions(previousSessions);
                setFilteredPreviousSessions(previousSessions);
                setFilteredUpcomingSessions(previousSessions);

                // Set the displayed number of pages
                setPreviousSessionsPages(Math.ceil(previousSessions.length / 3));
                setUpcomingSessionsPages(Math.ceil(previousSessions.length / 3));

                // Set the initially displayed bookings to the first 3
                setDisplayedPreviousSessions(previousSessions.slice(0, 3));
                setDisplayedUpcomingSessions(previousSessions.slice(0, 3));
            },
            error => {
                console.error(error);
            }
        );
    }, []);

    const handlePageChangeUpcoming = (_, value) => {
        setUpcomingActivePage(value);
        const startIndex = value * 3 - 3;
        const endIndex = value * 3;
        let clonedArray = filteredUpcomingSessions.slice();
        clonedArray = clonedArray.slice(startIndex, endIndex);
        setDisplayedUpcomingSessions(clonedArray);
    };

    const handlePageChangePrevious = (_, value) => {
        setPreviousActivePage(value);
        const startIndex = value * 3 - 3;
        const endIndex = value * 3;
        let clonedArray = filteredPreviousSessions.slice();
        clonedArray = clonedArray.slice(startIndex, endIndex);
        setDisplayedPreviousSessions(clonedArray);
    };

    const onSearchPrevious = e => {
        // Search based on description, course name or tutor name
        const previousSessionsFiltered = previousSessions.filter(
            session =>
                session.description.toLowerCase().includes(e.toLowerCase()) ||
                session.courseName.toLowerCase().includes(e.toLowerCase()) ||
                session.tutorId.firstName.toLowerCase().includes(e.toLowerCase())
        );

        // Set number of active pages after conducting the search
        let activePages = Math.ceil(previousSessionsFiltered.length / 3);
        setFilteredPreviousSessions(previousSessionsFiltered);
        setPreviousSessionsPages(activePages);
        setPreviousActivePage(1);
        let clonedArray = previousSessionsFiltered.slice();

        if (clonedArray.length >= 3) {
            clonedArray = clonedArray.slice(0, 3);
        } else {
            clonedArray = clonedArray.slice(0, clonedArray.length);
        }
        setDisplayedPreviousSessions(clonedArray);
    };

    const onSearchUpcoming = e => {
        // Search based on description, course name or tutor name
        const upcomingSessionsFiltered = upcomingSessions.filter(
            session =>
                session.inquiry.toLowerCase().includes(e.toLowerCase()) ||
                session.courseName.toLowerCase().includes(e.toLowerCase()) ||
                session.tutorId.firstName.toLowerCase().includes(e.toLowerCase())
        );

        // Set number of active pages after conducting the search
        let activePages = Math.ceil(upcomingSessionsFiltered.length / 3);
        setFilteredUpcomingSessions(upcomingSessionsFiltered);
        setUpcomingSessionsPages(activePages);
        setUpcomingActivePage(1);
        let clonedArray = upcomingSessionsFiltered.slice();

        if (clonedArray.length >= 3) {
            clonedArray = clonedArray.slice(0, 3);
        } else {
            clonedArray = clonedArray.slice(0, clonedArray.length);
        }
        setDisplayedUpcomingSessions(clonedArray);
    };

    const classes = useStyles();
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
                    <div className={classes.searchField}>
                        <SearchField
                            placeholder="Search..."
                            onChange={onSearchUpcoming}
                            searchText=""
                            classNames={classes.searchField}
                        />
                    </div>
                    <Row className={classes.upcomingSessionRow}>
                        {displayedUpcomingSessions.map((item, index) => (
                            <div className={classes.sessionColumnWrapper}>
                                <Col className={classes.sessionColumn}>
                                    <UpcomingSessionCard
                                        key={item._id}
                                        value={index}
                                        isStudent={renderStudentOptions}
                                        session={item}></UpcomingSessionCard>
                                </Col>
                            </div>
                        ))}
                    </Row>
                    <div className={classes.pagination}>
                        <Pagination
                            count={upcomingSessionsPages}
                            page={upcomingActivePage}
                            color="primary"
                            variant="outlined"
                            onChange={handlePageChangeUpcoming}
                            size="large"></Pagination>
                    </div>
                    <hr />
                    <div className={classes.upcomingSessionHeader}>
                        <h4>Previous Sessions</h4>
                    </div>
                    <div className={classes.searchField}>
                        <SearchField
                            placeholder="Search..."
                            onChange={onSearchPrevious}
                            searchText=""
                            classNames={classes.searchField}
                        />
                    </div>
                    <Row className={classes.previousSessionRow}>
                        {displayedPreviousSessions.map((item, index) => (
                            <div className={classes.sessionColumnWrapper}>
                                <Col className={classes.sessionColumn}>
                                    <PreviousSessionCard
                                        key={item._id}
                                        value={index}
                                        isStudent={renderStudentOptions}
                                        session={item}></PreviousSessionCard>
                                </Col>
                            </div>
                        ))}
                    </Row>
                    <div className={classes.pagination}>
                        <Pagination
                            count={previousSessionsPages}
                            page={previousActivePage}
                            color="primary"
                            variant="outlined"
                            onChange={handlePageChangePrevious}
                            size="large"></Pagination>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default withRouter(ListUserSessions);
