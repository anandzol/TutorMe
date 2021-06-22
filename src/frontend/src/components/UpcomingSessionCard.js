import React, { Component } from 'react';
import { Card, Button, Container, Col, Row, Form } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import { getTutorById } from '../services/TutorService';
const styles = () => ({
    card: {
        minHeight: '21rem',
        maxHeight: '21rem',
        height: '21rem',
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
        minHeight: '7rem',
        maxHeight: '7rem',
        overFlowY: 'auto',
        height: '7rem'
    },
    date: {
        paddingLeft: '1rem',
        minHeight: '1rem',
        maxHeight: '1rem'
    },
    cancelButtonWrapper: {
        float: 'right',
        paddingRight: '2rem',
        position: 'relative',
        bottom: '-70px',
        paddingBottom: '0.5rem'
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
        paddingLeft: '1rem'
    },
    name: {
        paddingLeft: '1rem',
        paddingBottom: '0.5rem'
    },
    price: {
        float: 'right',
        paddingRight: '1rem',
        paddingBottom: '0.5rem'
    }
});
// components/UpcomingSessionCard.js
class UpcomingSessionCard extends Component {
    constructor(props) {
        super();
        this.state = props.session;
    }

    componentDidMount() {
        console.log(this.state);
        getTutorById(
            this.state.tutorId,
            response => {
                this.setState({
                    tutorName: response.data.name
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
                <div>
                    <Card className={classes.card}>
                        <div className={classes.headerWrapper}>
                            <div className={classes.header}>{this.state.courseName}</div>
                        </div>
                        <div className={classes.inquiry}>
                            {this.state.inquiry}
                            <div className={classes.cancelButtonWrapper}>
                                <button className={classes.cancelButton}>Cancel</button>
                            </div>
                        </div>
                        <hr />
                        <div className={classes.date}>{this.state.startDate}</div>
                        <hr className={classes.divider} />
                        <div className={classes.location}>
                            {this.state.onsite ? 'Onsite' : ''} {this.state.remove ? 'Remote' : ''}
                        </div>
                        <hr />
                        <div className={classes.name}>
                            {this.state.tutorName}
                            <div className={classes.price}>{`${this.state.price} €/h`}</div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UpcomingSessionCard);
