import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';

import { withStyles } from '@material-ui/styles';

const defaultState = {
    name: '',
    errors: {}
};

const styles = () => ({
    button_box: {
        position: 'relative',
        paddingTop: '1rem'
    },
    padding_top: {
        paddingTop: '50px'
    },
    card: {
        color: 'black',
        minHeight: '18vh',
        fontSize: 'large'
    },
    component: {
        backgroundColor: '#2c3e50',
        paddingTop: '10px',
        paddingBottom: '10px',
        minHeight: '100vh',
        color: 'white'
    },
    form: {
        paddingRight: '1rem',
        paddingLeft: '1rem',
        paddingTop: '2rem',
        paddingBottom: '1rem'
    }
});

const SERVER_URL = 'http://localhost:8082/api';

class CreateUniversity extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onCancel = e => {
        this.props.history.push('/');
    };

    validateInput() {
        let input = this.state.name;
        let errors = [];
        if (input === '') {
            errors['name'] = 'Please enter a university name!';
            this.setState({
                errors: errors
            });
            return false;
        }

        return true;
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.validateInput()) {
            const data = {
                name: this.state.name
            };

            axios
                .post(`${SERVER_URL}/university`, data)
                .then(res => {
                    this.setState(defaultState);
                    this.props.history.push('/');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.component}>
                    <div className={`container ${classes.padding_top}`}>
                        <Card className={classes.card}>
                            <Form onSubmit={this.onSubmit} className={classes.form}>
                                <Form.Group>
                                    <Form.Label>University Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        rows={1}></Form.Control>
                                    <div className="text-danger">{this.state.errors.name}</div>
                                    <Form.Text className="text-muted">
                                        Enter the university name which you would like to create!
                                    </Form.Text>
                                </Form.Group>
                                <div className={classes.button_box}>
                                    {/* Create Button */}
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        active
                                        className={classes.button}
                                        onClick={this.onSubmit}>
                                        Create
                                    </Button>

                                    {/* Cancel Button */}
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        active
                                        className={classes.button}
                                        onClick={this.onCancel}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CreateUniversity);
