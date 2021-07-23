import React, { Component } from 'react';
import { Card, Button, Container, Col, Row, Form } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import { getTutorById } from '../services/TutorService';
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
        width: '7rem',
        backgroundColor: '#ea9999'
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
        this.state = props.session;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Card className={classes.card}>
                        <div className={classes.headerWrapper}>
                            <div className={classes.header}>{this.state.courseName}</div>
                        </div>
                        <div className={classes.inquiry}>{this.state.inquiry}</div>
                        <hr className={classes.divider} />
                        <div className={classes.date}>{this.state.startDate}</div>
                        <div className={classes.cancelButtonWrapper}>
                            <button className={classes.cancelButton}>Cancel</button>
                        </div>

                        <hr className={classes.divider} />
                        <div className={classes.location}>
                            Location: {this.state.onsite ? 'Onsite' : ''}{' '}
                            {this.state.remote ? 'Remote' : ''}
                        </div>
                        <hr />
                        <div className={classes.name}>
                            {`Tutor: ${this.state.tutorId.firstName}`}
                            <div className={classes.price}>{`Price: ${this.state.price} €/h`}</div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UpcomingSessionCard);
