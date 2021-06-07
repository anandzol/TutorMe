import React, { Component, useEffect } from 'react';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';
import { withStyles } from '@material-ui/styles';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const styles = () => ({
    container: {
        paddingTop: '20px',
        paddingBottom: '10px'
    },
    row__padding_right: {
        paddingRight: '20px'
    },
    label__padding_top: {
        paddingTop: '10px'
    },
    button_box: {
        position: 'absolute',
        left: '400px',
        paddingTop: '2rem'
    },
    button: {
        width: '10rem',
        height: '3rem'
    },
    button_padding_right: {
        paddingRight: '20px'
    },
    row_padding_top: {
        paddingTop: '1rem'
    }
});

class RegisterUser extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            gender: '',
            semester: 1,
            program: '',
            dateOfBirth: JSON.stringify(new Date()),
            lastOnline: JSON.stringify(new Date()),
            location: undefined,
            role: 'student'
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onChangeNumber = e => {
        const number = Number(e.target.value);
        this.setState({ [e.target.name]: number });
    };

    onCancel = e => {
        e.preventDefault();
        this.props.history.push('');
    };

    onRegister = e => {
        e.preventDefault();
        const data = {
            email: this.state.name,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            gender: this.state.gender,
            semester: this.state.semester,
            program: this.state.program,
            dateOfBirth: this.state.dateOfBirth,
            lastOnline: this.state.lastOnline,
            location: this.state.location,
            role: this.state.role
        };

        console.log(data);
        axios
            .post('http://localhost:8082/api/User', data)
            .then(res =>
                this.setState({
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    gender: '',
                    semester: 1,
                    program: '',
                    dateOfBirth: JSON.stringify(new Date()),
                    lastOnline: JSON.stringify(new Date()),
                    location: undefined,
                    role: 'student'
                })
            )
            .catch(error => {});
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavigationBar></NavigationBar>
                <div className="container">
                    <div className={classes.container}>
                        <div className="card col-12 login-card mt-2 hv-cente">
                            <form>
                                <div className={classes.row_padding_top}>
                                    <div class="row row-cols-3">
                                        <div class="col">
                                            <label htmlFor="firstNameInput">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="form-control"
                                                id="firstName"
                                                placeholder="Max"
                                                value={this.state.firstName}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                        <div class="col">
                                            <label htmlFor="lastNameInput">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="form-control"
                                                id="firstName"
                                                placeholder="Mustermann"
                                                value={this.state.lastName}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                        <div>
                                            <Form.Group
                                                controlId="gender"
                                                className={
                                                    classes.row__padding_right
                                                }
                                            >
                                                <Form.Label>Gender</Form.Label>
                                                <Form.Control
                                                    name="gender"
                                                    as="select"
                                                    onChange={this.onChange}
                                                >
                                                    <option value="male">
                                                        Male
                                                    </option>
                                                    <option value="female">
                                                        Female
                                                    </option>
                                                    <option>Undefined</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </div>

                                <div className={classes.label__padding_top}>
                                    <label htmlFor="exampleInputEmail1">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        aria-describedby="emailHelp"
                                        placeholder="name@example.com"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    <small
                                        id="emailHelp"
                                        className="form-text text-muted"
                                    >
                                        We'll never share your email with anyone
                                        else.
                                    </small>
                                </div>
                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputPassword1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputPassword1">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPasswo"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div
                                    class={
                                        classes.container +
                                        ' ' +
                                        'row row-cols-4'
                                    }
                                    style={{ paddingTop: 20 }}
                                >
                                    <div class="col">
                                        <Form.Group controlId="university">
                                            <Form.Label>University</Form.Label>
                                            <Form.Control as="select">
                                                <option>
                                                    Technical University Munich
                                                </option>
                                                <option>
                                                    Ludwig Maximilian University
                                                    Munich
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div class="col">
                                        <Form.Group controlId="degree">
                                            <Form.Label>Degree</Form.Label>
                                            <Form.Control as="select">
                                                <option>Bachelor</option>
                                                <option>Master</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div class="col">
                                        <Form.Group
                                            controlId="semester"
                                            onChange={this.onChangeNumber}
                                        >
                                            <Form.Label>Semester</Form.Label>
                                            <Form.Control
                                                name="semester"
                                                as="select"
                                            >
                                                <option tyxpevalue={1}>
                                                    1
                                                </option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                                <option value={11}>11</option>
                                                <option value={12}>12</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div class="col">
                                        <Form.Group controlId="semester">
                                            <Form.Label>Semester</Form.Label>
                                            <Form.Control as="select">
                                                <option>Student</option>
                                                <option>Tutor</option>
                                                <option>Moderator</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className={classes.button_box}>
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        active
                                        className={classes.button}
                                        onClick={this.onRegister}
                                    >
                                        Register
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        active
                                        className={classes.button}
                                        onClick={this.onCancel}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(RegisterUser);
