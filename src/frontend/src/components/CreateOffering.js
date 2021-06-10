import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from '../components/NavigationBar';
import { withStyles } from '@material-ui/styles';
import '../App.css';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const styles = () => ({
    header: {
        position: 'relative',
        paddingTop: '4rem',
        left: '200px',
        fontSize: 'xxx-large',
        paddingBottom: '0.5rem',
        fontWeight: 'bold'
    },
    card: {
        position: 'absolute',
        paddingTop: '1rem',
        left: '200px',
        width: '125rem',
        height: '55rem'
    }
});

class CreateOffering extends Component {
    constructor() {
        super();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <NavigationBar></NavigationBar>
                <div className={classes.header}>Offer Course</div>
                <div className="container">
                    <Card className={classes.card}>
                        <Card.Body>
                            <Form></Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CreateOffering);
