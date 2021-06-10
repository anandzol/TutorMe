import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

const defaultState = {
    name: '',
    university: '',
    universities: []
};

const styles = () => ({
    button_box: {
        position: 'relative',
        paddingTop: '1rem'
    },
    top_padding: {
        paddingTop: '50px'
    },
    component: {
        backgroundColor: '#2c3e50',
        paddingTop: '10px',
        paddingBottom: '10px',
        minHeight: '100vh',
        color: 'white'
    },
    card: {
        color: 'black',
        minHeight: '25vh',
        fontSize: 'large'
    },
    form: {
        paddingRight: '1rem',
        paddingLeft: '1rem',
        paddingTop: '2rem',
        paddingBottom: '1rem'
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
                const universitiesSorted = response.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                this.setState({
                    universities: universitiesSorted
                });

                if (universitiesSorted.length > 0) {
                    this.setState({
                        university: universitiesSorted[0]._id
                    });
                }
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
                <div className={classes.component}>
                    <div className={`container ${classes.top_padding}`}>
                        <Card className={classes.card}>
                            <Form onSubmit={this.onSubmit} className={classes.form}>
                                <Form.Group>
                                    <Form.Label>University</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="university"
                                        onChange={this.onChange}>
                                        {this.state.universities.map((item, _) => (
                                            <option value={item._id}>{item.name}</option>
                                        ))}
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Select the university of the faculty which you would like to
                                        create!
                                    </Form.Text>
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

export default withStyles(styles)(createFaculty);
