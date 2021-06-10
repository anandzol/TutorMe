import React, { Component } from 'react';
import { Button, Form, Card, Row } from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';
import '../App.css';
import axios from 'axios';

const styles = () => ({
    header: {
        position: 'relative',
        paddingTop: '4rem',
        left: '400px',
        fontSize: 'xx-large',
        paddingBottom: '0.5rem',
        fontWeight: 'bold'
    },
    card: {
        position: 'absolute',
        paddingTop: '1rem',
        left: '400px',
        width: '90rem',
        height: '55rem'
    },
    vl: {
        borderLeft: '1px solid #dfdfdf',
        height: '52rem',
        position: 'relative',
        left: '50%',
        marginLeft: '-3px',
        paddingTop: '10px'
    },
    form_option: {
        paddingTop: '1rem',
        paddingLeft: '20px',
        width: '20rem'
    },
    form_label: {
        paddingTop: '2.2rem',
        paddingLeft: '50px',
        fontSize: '17px'
    },
    form_selectors: {
        paddingTop: '8px',
        paddingLeft: '5rem'
    }
});

const defaultState = {
    university: '',
    faculty: '',
    course: '',
    wage: 1,
    remote: false,
    onsite: false,
    description: '',
    availableUniversities: [],
    availableFaculties: [],
    availableCourses: []
};

// /components/CreateOferring.js
class CreateOffering extends Component {
    constructor() {
        super();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.header}>Offer Course</div>
                <div className="container">
                    <Card className={classes.card}>
                        <Form>
                            <Row>
                                <div className="col-sm-4">
                                    <div>
                                        <Form.Label className={classes.form_label}>
                                            Choose the University of your Course
                                        </Form.Label>
                                    </div>
                                    <div>
                                        <Form.Label className={classes.form_label}>
                                            Choose the Faculty of your Course
                                        </Form.Label>
                                    </div>
                                    <div>
                                        <Form.Label className={classes.form_label}>
                                            Choose the Course that you are offering
                                        </Form.Label>
                                    </div>
                                    <div>
                                        <Form.Label className={classes.form_label}>
                                            Upload CV
                                        </Form.Label>
                                    </div>
                                    <div>
                                        <Form.Label className={classes.form_label}>
                                            Upload relevant course transcripts
                                        </Form.Label>
                                    </div>
                                    <div>
                                        <Form.Label className={classes.form_label}>
                                            Dates/Time offered
                                        </Form.Label>
                                    </div>
                                    <div>
                                        <Form.Label className={classes.form_label}>
                                            Enter your hourly wage
                                        </Form.Label>
                                    </div>
                                </div>
                                <div className="col-sm-0">
                                    <div className={classes.vl}></div>
                                </div>
                                <div className={`${classes.form_selectors} col-sm-3`}>
                                    <Form.Group controlId="gender" className={classes.form_option}>
                                        <Form.Control
                                            name="gender"
                                            as="select"
                                            onChange={this.onChange}>
                                            <option values="male">Male</option>
                                            <option values="female">Female</option>
                                            <option>Undefined</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="gender" className={classes.form_option}>
                                        <Form.Control
                                            name="gender"
                                            as="select"
                                            onChange={this.onChange}>
                                            <option values="male">Male</option>
                                            <option values="female">Female</option>
                                            <option>Undefined</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="gender" className={classes.form_option}>
                                        <Form.Control
                                            name="gender"
                                            as="select"
                                            onChange={this.onChange}>
                                            <option values="male">Male</option>
                                            <option values="female">Female</option>
                                            <option>Undefined</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </Row>
                        </Form>
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
