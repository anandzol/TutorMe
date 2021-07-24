import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { Card, Col, Row } from 'react-bootstrap';
import { parseJwt } from '../services/AuthHeader';
import { makeStyles } from '@material-ui/styles';
import SessionCard from './SessionCard';
import { getAllSessionsByTutorId } from '../services/SessionService';

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
    }
}));
const ManageSessions = () => {
    const [verifiedSessions, setVerifiedSessions] = useState([]);
    const [rejectedSessions, setRejectedSessions] = useState([]);
    const [pendingSessions, setPendingSessions] = useState([]);

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

                console.log(verifiedSessions);
            },
            error => {
                console.log(error);
            }
        );
    }, []);

    const classes = useStyles();

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.header}>
                    <h3>Manage my Sessions</h3>
                </div>
                <Card className={classes.card}>
                    <div className={classes.verifiedSessionsHeader}>
                        <h5>Verified Sessions</h5>
                    </div>
                    <Row>
                        {verifiedSessions.map((item, index) => (
                            <div>
                                <Col>
                                    <SessionCard
                                        key={item._id}
                                        session={item}
                                        value={index}></SessionCard>
                                </Col>
                            </div>
                        ))}
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default ManageSessions;
