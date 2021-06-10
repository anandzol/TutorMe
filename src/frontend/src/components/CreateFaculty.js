import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

const defaultState = {
    name: '',
    university: '',
    universities: []
};

const styles = () => ({
    button_box: {
        position: 'absolute',
        left: '445px',
        paddingTop: '1rem'
    },
    form_padding: {
        paddingTop: '20px'
    }
});

const SERVER_URL = 'http://localhost:8082/api';

class createFaculty extends Component {
    constructor() {
        super();
        this.state = defaultState;
    }

    componentDidMount() {
        axios

            // Get all the available universities to render the available options
            .get(`${SERVER_URL}/university`)
            .then(response => {
                this.setState({
                    universities: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            university: this.state.university
        };

        axios
            .post(`${SERVER_URL}/faculty`, data)
            .then(res => {
                console.log('success');
                this.setState(defaultState);
                this.props.history.push('/');
            })
            .catch(error => {
                console.log('Error in create faculty');
            });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <NavigationBar></NavigationBar>
                <div className="container">
                    <Form onSubmit={this.onSubmit} className={classes.form_padding}>
                        <Form.Group>
                            <Form.Label>University</Form.Label>
                            <Form.Control as="select" name="university" onChange={this.onChange}>
                                {this.state.universities.map((item, _) => (
                                    <option value={item._id}>{item.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        {/* Faculty Name input */}
                        <Form.Group>
                            <Form.Label>Faculty Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                rows={1}></Form.Control>
                            <Form.Text className="text-muted">
                                Enter the faculty name which you would like to create!
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    <div className={classes.button_box}>
                        {/* Create Button */}
                        <Button
                            variant="primary"
                            size="sm"
                            active
                            className={classes.button}
                            onClick={this.onSubmit}>
                            Create
                        </Button>

                        {/* Cancel Button */}
                        <Button
                            variant="secondary"
                            size="sm"
                            active
                            className={classes.button}
                            onClick={this.onCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(createFaculty);
