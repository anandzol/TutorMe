import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { Card, Col, Row } from 'react-bootstrap';
import { parseJwt } from '../services/AuthHeader';
import { makeStyles } from '@material-ui/styles';
import SessionCard from './SessionCard';
import { getAllSessionsByTutorId } from '../services/SessionService';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
    container: {
        paddingLeft: '4rem',
        paddingRight: '4rem'
    },
    header: {
        paddingTop: '2rem',
        paddingBottom: '1rem'
    },
    card: {
        position: 'relative',
        paddingTop: '1.5rem',
        height: '100%',
        minHeight: '50rem',
        width: '100%'
    },
    verifiedSessionsHeader: {
        paddingLeft: '3rem'
    },
    row: {
        height: '20rem',
        paddingTop: '1rem',
        paddingLeft: '3rem',
        paddingRight: '2rem',
        overflow: 'hidden'
    },
    sessionColumnWrapper: {
        width: '32%',
        paddingBottom: '2rem'
    },
    pagination: {
        paddingLeft: '1rem',
        paddingBottom: '1rem'
    }
}));
const ManageSessions = () => {
    const [verifiedSessions, setVerifiedSessions] = useState([]);
    const [rejectedSessions, setRejectedSessions] = useState([]);
    const [pendingSessions, setPendingSessions] = useState([]);
    const [activePagesVerified, setActivePagesVerified] = useState(1);
    const [activePagesRejected, setActivePagesRejected] = useState(1);
    const [activePagesPending, setActivePagesPending] = useState(1);
    const [displayedVerifiedSessions, setDisplayedVerifiedSessions] = useState([]);
    const [displayedRejectedSessions, setDisplayedRejectedSessions] = useState([]);
    const [displayedPendingSessions, setDisplayedPendingSessions] = useState([]);
    const [activePageVerified, setActivePageVerified] = useState(1);
    const [activePageRejected, setActivePageRejected] = useState(1);
    const [activePagePending, setActivePagePending] = useState(1);

    useEffect(() => {
        const currentUserJwt = AuthService.getCurrentUser();

        if (currentUserJwt === null) {
            return;
        }

        const currentUser = parseJwt(currentUserJwt);
        const currentUserId = currentUser._id;
        getAllSessionsByTutorId(
            currentUserId,
            response => {
                const sessions = response.data;
                const verifiedSessions = sessions.filter(session => session.status === 'verified');
                const rejectedSessions = sessions.filter(session => session.status === 'rejected');
                const pendingSessions = sessions.filter(session => session.status === 'pending');

                setVerifiedSessions(verifiedSessions);
                setRejectedSessions(rejectedSessions);
                setPendingSessions(pendingSessions);

                // Display 3 sessions at a time
                setActivePagesVerified(Math.ceil(verifiedSessions.length / 3));
                setActivePagesRejected(Math.ceil(rejectedSessions.length / 3));
                setActivePagesPending(Math.ceil(pendingSessions.length / 3));

                // Display the first 3 as initial sessions
                setDisplayedVerifiedSessions(verifiedSessions.slice(0, 3));
                setDisplayedRejectedSessions(rejectedSessions.slice(0, 3));
                setDisplayedPendingSessions(pendingSessions.slice(0, 3));
            },
            error => {
                console.error(error);
            }
        );
    }, []);

    const handlePageChangeVerified = (_, value) => {
        setActivePageVerified(value);
        const startIndex = value * 3 - 3;
        const endIndex = value * 3;
        let clonedArray = verifiedSessions.slice();
        clonedArray = clonedArray.slice(startIndex, endIndex);
        setDisplayedVerifiedSessions(clonedArray);
    };

    const handlePageChangePending = (_, value) => {
        setActivePagePending(value);
        const startIndex = value * 3 - 3;
        const endIndex = value * 3;
        let clonedArray = pendingSessions.slice();
        clonedArray = clonedArray.slice(startIndex, endIndex);
        setDisplayedPendingSessions(clonedArray);
    };

    const handlePageChangeRejected = (_, value) => {
        setActivePageRejected(value);
        const startIndex = value * 3 - 3;
        const endIndex = value * 3;
        let clonedArray = rejectedSessions.slice();
        clonedArray = clonedArray.slice(startIndex, endIndex);
        setDisplayedRejectedSessions(clonedArray);
    };
    const classes = useStyles();

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h3>Manage my Sessions</h3>
                </div>
                <Card className={classes.card}>
                    <div className={classes.verifiedSessionsHeader}>
                        <h4>Verified Sessions</h4>
                    </div>
                    <Row className={classes.row}>
                        {displayedVerifiedSessions.map((item, index) => (
                            <div className={classes.sessionColumnWrapper}>
                                <Col>
                                    <SessionCard
                                        key={item._id}
                                        session={item}
                                        value={index}></SessionCard>
                                </Col>
                            </div>
                        ))}
                    </Row>
                    <div className={classes.pagination}>
                        <Pagination
                            count={activePagesVerified}
                            page={activePageVerified}
                            color="primary"
                            variant="outlined"
                            onChange={handlePageChangeVerified}
                            size="medium"></Pagination>
                    </div>
                    <hr />
                    <div className={classes.verifiedSessionsHeader}>
                        <h4>Pending Sessions</h4>
                    </div>
                    <Row className={classes.row}>
                        {displayedPendingSessions.map((item, index) => (
                            <div className={classes.sessionColumnWrapper}>
                                <Col>
                                    <SessionCard
                                        key={item._id}
                                        session={item}
                                        value={index}></SessionCard>
                                </Col>
                            </div>
                        ))}
                    </Row>
                    <div className={classes.pagination}>
                        <Pagination
                            count={activePagesPending}
                            page={activePagePending}
                            color="primary"
                            variant="outlined"
                            onChange={handlePageChangePending}
                            size="medium"></Pagination>
                    </div>
                    <hr />
                    <div className={classes.verifiedSessionsHeader}>
                        <h4>Rejected Sessions</h4>
                    </div>
                    <Row className={classes.row}>
                        {displayedRejectedSessions.map((item, index) => (
                            <div className={classes.sessionColumnWrapper}>
                                <Col>
                                    <SessionCard
                                        key={item._id}
                                        session={item}
                                        value={index}></SessionCard>
                                </Col>
                            </div>
                        ))}
                    </Row>
                    <div className={classes.pagination}>
                        <Pagination
                            count={activePagesRejected}
                            page={activePageRejected}
                            color="primary"
                            variant="outlined"
                            onChange={handlePageChangeRejected}
                            size="medium"></Pagination>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ManageSessions;
