import React, { Component } from 'react';
import { Form, Card } from 'react-bootstrap';
import axios from 'axios';

import { withStyles } from '@material-ui/styles';

const defaultState = {
    name: '',
    errors: {}
};

const styles = () => ({
    button_box: {
        position: 'absolute',
        paddingTop: '2rem',
        paddingLeft: '1rem'
    },
    padding_top: {
        paddingTop: '2rem'
    },
    padding_card: {
        paddingTop: '1rem'
    },
    card: {
        color: 'black',
        minHeight: '18vh',
        fontSize: 'large'
    },
    component: {
        backgroundColor: '#f0f2f5',
        paddingTop: '10px',
        paddingBottom: '10px',
        minHeight: '100vh',
        color: 'black'
    },
    form: {
        paddingRight: '1rem',
        paddingLeft: '1rem',
        paddingTop: '2rem',
        paddingBottom: '1rem'
    }
});

const SERVER_URL = 'http://localhost:8082/api';

// /components/CreateUniversity.js
class CreateUniversity extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ errors: [] });
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
                        <h2>Create University</h2>
                        <div className={`${classes.padding_card}`}>
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
                                            Enter the university name which you would like to
                                            create!
                                        </Form.Text>
                                    </Form.Group>
                                </Form>
                            </Card>
                        </div>
                        <div className={classes.button_box}>
                            {/* Register Button */}
                            <div className="form-group">
                                <button
                                    className={`btn btn-primary btn-lg`}
                                    onClick={this.onSubmit}>
                                    Create
                                </button>
                                <button
                                    className={`btn btn-primary btn-secondary btn-lg`}
                                    onClick={this.onCancel}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CreateUniversity);
