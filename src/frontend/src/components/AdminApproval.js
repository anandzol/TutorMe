import React, { Component } from 'react';
import { Card, Button, Container, Col, Row, Form } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import { getAllPendingSessionsForApproval, updateSessionStatus } from '../services/SessionService';
import { downloadFile } from '../services/FileUploadService';
import { withRouter } from 'react-router';
import Pagination from '@material-ui/lab/Pagination';

const defaultState = {
    pendingSessions: [],
    courseName: '',
    tutorName: '',
    description: '',
    cv: '',
    transcript: ''
};

const styles = () => ({
    container: {
        paddingLeft: '4rem',
        paddingRight: '4rem'
    },
    cardMini: {
        minHeight: '15rem',
        maxHeight: '15rem',
        height: '21rem',
        minWidth: '30rem',
        maxWidth: '30rem'
    },
    card: {
        paddingTop: '2rem',
        height: '50rem',
        width: '100%'
    },
    headerWrapper: {
        backgroundColor: '#95bcf2'
    },
    header: {
        fontSize: '18px',
        textAlign: 'left',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        fontWeight: 500
    },
    cardHeader: {
        fontSize: '18px',
        textAlign: 'center',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        fontWeight: 500
    },
    description: {
        minHeight: '7rem',
        maxHeight: '7rem',
        overFlowY: 'auto',
        height: '7rem'
    },
    cancelButtonWrapper: {
        float: 'left',
        paddingLeft: '15rem',
        position: 'relative',
        bottom: '15px',
        paddingBottom: '0.5rem'
    },
    approveRejectButtonWrapper: {
        float: 'left',
        paddingLeft: '15rem',
        position: 'relative',
        bottom: '20px',
        paddingBottom: '0.5rem'
    },
    approveButton: {
        height: '30px',
        width: '7rem',
        backgroundColor: '#b6d7a8'
    },
    rejectButton: {
        height: '30px',
        width: '7rem',
        backgroundColor: '#ea9999'
    },
    downloadCVButton: {
        height: '30px',
        width: '7rem',
        backgroundColor: '#b0c4de'
    },
    downloadTranscriptButton: {
        height: '30px',
        width: '7rem',
        backgroundColor: '#b0c4de'
    },

    divider: {
        marginTop: '0.7rem',
        marginBottom: '0.7rem'
    },
    location: {
        paddingLeft: '1rem'
    },
    name: {
        paddingLeft: '1rem',
        paddingBottom: '0.5rem',
        fontWeight: 500
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
    },
    upcomingSessionRow: {
        height: '25rem',
        minHeight: '40rem',
        maxHeight: '40rem',
        minWidth: '80rem',
        maxWidth: '80rem',
        width: '145rem',
        overflowX: 'auto'
    },
    upcomingSessionHeader: {
        paddingLeft: '3rem'
    },
    pagination: {
        paddingLeft: '2rem',
        paddingBottom: '1.5rem'
    }
});

class AdminApproval extends Component {
    constructor(props) {
        super();
        this.state = defaultState;
    }

    componentDidMount() {
        getAllPendingSessionsForApproval(
            response => {
                this.setState({
                    pendingSessions: response.data
                });

                console.log(this.state.pendingSessions);
            },
            error => {
                console.error(error);
            }
        );
    }

    onDownload(e, file) {
        console.log(file);
        downloadFile(file);
    }

    onClick(e, file, status) {
        updateSessionStatus(
            file,
            status,
            response => {},
            error => {
                console.log(error);
            }
        );

        this.props.history.push('/admin-approval');
        window.location.reload();
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <h3>Approve/Reject Sessions</h3>
                    </div>

                    <Card className={classes.card}>
                        <div className={classes.upcomingSessionHeader}>
                            <h4>Pending Sessions</h4>
                        </div>
                        <Row className={classes.upcomingSessionRow}>
                            {this.state.pendingSessions.map((item, index) => (
                                <div className={classes.sessionColumnWrapper}>
                                    <Col className={classes.sessionColumn}>
                                        <Card className={classes.cardMini}>
                                            <div className={classes.headerWrapper}>
                                                <div className={classes.cardHeader}>
                                                    {console.log(item)}

                                                    {item.course.name}
                                                </div>
                                            </div>

                                            <div className={classes.name}>
                                                Description: {item.description}
                                            </div>

                                            <div className={classes.name}>
                                                Tutor Name: {item.tutorId.firstName}
                                            </div>

                                            <div className={classes.name}>
                                                University: {item.university.name}
                                            </div>
                                            <hr />

                                            <div className={classes.cancelButtonWrapper}>
                                                <button
                                                    className={classes.downloadCVButton}
                                                    onClick={e => this.onDownload(e, item.cv._id)}>
                                                    CV
                                                </button>

                                                <button
                                                    className={classes.downloadTranscriptButton}
                                                    onClick={e =>
                                                        this.onDownload(e, item.transcript._id)
                                                    }>
                                                    Transcript
                                                </button>
                                            </div>
                                            <div className={classes.approveRejectButtonWrapper}>
                                                <button
                                                    className={classes.approveButton}
                                                    onClick={e =>
                                                        this.onClick(e, item.cv._id, 'verified')
                                                    }>
                                                    Approve
                                                </button>
                                                <button
                                                    className={classes.rejectButton}
                                                    onClick={e =>
                                                        this.onClick(e, item.cv._id, 'rejected')
                                                    }>
                                                    Reject
                                                </button>
                                            </div>
                                        </Card>
                                    </Col>
                                </div>
                            ))}
                        </Row>

                        <div className={classes.pagination}>
                            <Pagination
                                count={1}
                                page={1}
                                color="primary"
                                variant="outlined"
                                //onChange={}
                                size="large"></Pagination>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(AdminApproval));
