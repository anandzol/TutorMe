import React, { Component } from 'react';
import { Card, Button, Container, Col, Row, Form } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import { getTutorById } from '../services/TutorService';
import ReactStars from 'react-rating-stars-component';
import { withRouter } from 'react-router';

const styles = () => ({
    card: {
        minHeight: '21rem',
        maxHeight: '21rem',
        height: '21rem',
        minWidth: '30rem',
        maxWidth: '30rem'
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
    description: {
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
    bookAgainButton: {
        height: '40px',
        width: '7rem',
        backgroundColor: '#b6d7a8'
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
    },
    rating: {
        float: 'right',
        paddingRight: '1rem'
    }
});
// components/PreviousSessionCard.js
class PreviousSessionCard extends Component {
    constructor(props) {
        super();
        this.state = props.session;
        console.log(this.state);
    }

    componentDidMount() {
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

    onBookAgain = e => {
        this.props.history.push(`/book-session/${this.state.sessionId}`);
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Card className={classes.card}>
                        <div className={classes.headerWrapper}>
                            <div className={classes.header}>{this.state.courseName}</div>
                        </div>
                        <div className={classes.description}>
                            {this.state.description}
                            <div className={classes.cancelButtonWrapper}>
                                <button
                                    onClick={this.onBookAgain}
                                    className={classes.bookAgainButton}>
                                    Book Again
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div className={classes.date}>{this.state.startDate}</div>
                        <hr className={classes.divider} />
                        <div className={classes.location}>
                            Rating:
                            <div className={classes.rating}>
                                <ReactStars count={5} size={24} activeColor="#ffd700"></ReactStars>
                            </div>
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

export default withRouter(withStyles(styles)(PreviousSessionCard));
