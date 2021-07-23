import React, { Component } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { createUniversity } from '../services/UniversityService';
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
        this.props.history.push('/home');
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

    onSubmit = async e => {
        e.preventDefault();

        if (this.validateInput()) {
            const data = {
                name: this.state.name
            };

            createUniversity(
                data,
                () => {
                    this.props.history.push('/home');
                },
                error => {
                    console.error(error);
                }
            );
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
                            <div className={classes.button_box}>
                                <div className="form-group">
                                    {/* Register Button */}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CreateUniversity);
