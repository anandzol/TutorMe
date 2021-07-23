import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import { getTutorById } from '../services/TutorService';
import ReactStars from 'react-rating-stars-component';
import { withRouter } from 'react-router';
import { rateBooking } from '../services/BookingService';
import formattedDate from '../utils/DateUtils';
const styles = () => ({
    card: {
        minHeight: '20rem',
        maxHeight: '20rem',
        height: '20rem',
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
        paddingTop: '0.5rem',
        paddingLeft: '1rem',
        minHeight: '6rem',
        maxHeight: '6rem',
        overFlowY: 'auto',
        height: '6rem'
    },
    date: {
        paddingLeft: '1rem',
        minHeight: '1.5rem',
        maxHeight: '1.5rem'
    },
    cancelButtonWrapper: {
        paddingTop: '11.2rem',
        position: 'absolute',
        right: '1rem',
        paddingBottom: '0.5rem'
    },
    bookAgainButton: {
        paddingLeft: '0.5rem',
        height: '2.5rem',
        width: '7rem',
        backgroundColor: '#b6d7a8'
    },
    divider: {
        marginTop: '0.7rem',
        marginBottom: '0.7rem'
    },
    location: {
        paddingLeft: '1rem',
        height: '1.5rem'
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
        paddingRight: '1rem',
        minHeight: '1rem',
        maxHeight: '1rem',
        heigth: '1rem'
    }
});
// components/PreviousSessionCard.js
class PreviousSessionCard extends Component {
    constructor(props) {
        super();
        this.state = props.session;
        let date = new Date(props.session.startDate);
        if (!'rating' in props.session) {
            this.setState({
                rating: 0
            });
        }

        this.setState({ startDate: formattedDate(date) });
    }

    onRatingsChanged = e => {
        const ratingObject = {
            rating: e
        };
        const bookingId = this.state._id;
        rateBooking(
            bookingId,
            ratingObject,
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    };

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
                        <div className={classes.description}>{this.state.description}</div>
                        <hr />
                        <div className={classes.date}>{this.state.startDate}</div>
                        <div className={classes.cancelButtonWrapper}>
                            <button onClick={this.onBookAgain} className={classes.bookAgainButton}>
                                Book Again
                            </button>
                        </div>
                        <hr className={classes.divider} />
                        <div className={classes.location}>
                            Rating:
                            <div className={classes.rating}>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    value={this.state.rating}
                                    activeColor="#ffd700"
                                    onChange={this.onRatingsChanged}></ReactStars>
                            </div>
                        </div>
                        <hr />
                        <div className={classes.name}>
                            Tutor: {` ${this.state.tutorId.firstName}`}
                            <div className={classes.price}>{`Price: ${this.state.price} €/h`}</div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(PreviousSessionCard));
