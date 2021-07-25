import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';
import { Checkmark } from 'react-checkmark';

const styles = makeStyles(theme => ({
    successMsg: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#0f5132',
        textAlign: 'center',
        marginTop: '120px',
        fontSize: '25px',
        marginTop: '10px'
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: '433px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '30px',
        backgroundColor: '#f7f7f9',
        boxShadow:
            '0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15),0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15)'
    }
}));

const stripePromise = loadStripe(
    'pk_test_51JEzYXFZbrhOEnTQW3KMOG6AmANtpuFPR1RuBUolSU46Q8FbWCgoGcX21ypLKHZaPhonf4ka6S6ypwcz94s60cjE00Yoh2TSFS'
);

function ToPayment(props) {
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [totalAmount, setAmount] = useState(0);
    const sessionDetails = props.history.location.state.state; //TODO Can we do it better?
    const classes = styles();

    useEffect(() => {
        //TODO Set amount
        setAmount(sessionDetails.price);
    });

    const successMessage = () => {
        return (
            <div className="col-sm-12 my-auto">
                <div className={classes.successMsg}>
                    <Checkmark size="xxLarge" />
                    <div className={classes.successMsg}>Payment Successful</div>
                    Redirecting to your bookings..
                    {setTimeout(() => {
                        props.history.push('/list-user-sessions');
                    }, 5000)}
                </div>
            </div>
        );
    };

    const cart = () => {
        return (
            <React.Fragment>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your Session Details</span>
                    {/* <span className="badge bg-secondary badge-pill">3</span> */}
                </h4>
                <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Course Name</h6>
                            <small className="text-muted">{sessionDetails.courseName}</small>
                        </div>
                        {/* <span className="text-muted">₹1200</span> */}
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Price per hour</h6>
                        </div>
                        <span className="text-muted">{sessionDetails.price} €/hour</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Course Description</h6>
                            <small className="text-muted">{sessionDetails.description}</small>
                        </div>
                        {/* <span className="text-muted">₹500</span> */}
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">Start Date and Time</h6>
                            <small>{sessionDetails.startDate.toString()}</small>
                        </div>
                        {/* <span className="text-success">-₹500</span> */}
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (in euros)</span>
                        <strong>{totalAmount} €/hour</strong>
                    </li>
                </ul>
            </React.Fragment>
        );
    };

    return (
        <div className="container">
            <div className="py-5 text-center">
                <h4>
                    Stripe Integration -{' '}
                    <a
                        href="https://www.cluemediator.com/"
                        target="_blank"
                        rel="noopener noreferrer">
                        Clue Mediator
                    </a>
                </h4>
            </div>

            {/* <div className= "row"> */}
            <div className={classes.box}>
                {paymentCompleted ? (
                    successMessage()
                ) : (
                    <React.Fragment>
                        <div className="col-md-5 order-md-1">{cart()}</div>

                        <div className="col-md-7">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    state={props}
                                    amount={totalAmount}
                                    setPaymentCompleted={setPaymentCompleted}
                                />
                            </Elements>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>

        // </div>
    );
}

export default withStyles(styles)(ToPayment);
