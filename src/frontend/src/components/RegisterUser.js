import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import Form from 'react-bootstrap/Form';

const styles = () => ({
    container: {
        paddingTop: '2rem',
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
        paddingTop: '2rem'
    },
    component: {
        backgroundColor: '#f0f2f5',
        paddingTop: '10px',
        paddingBottom: '10px',
        minHeight: '90vh',
        color: 'black'
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
    },
    title_padding_bottom: {
        paddingBottom: '1rem'
    }
});

const defaultState = {
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    semester: 1,
    program: 'bachelor',
    dateOfBirth: new Date(),
    lastOnline: new Date(),
    role: 'student',
    email: '',
    errors: {}
};

const semesterCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const degree = [
    {
        bachelor: 'Bachelor'
    },
    {
        master: 'Master'
    },
    {
        graduate: 'Graduate'
    }
];
const roles = [
    {
        student: 'Student'
    },
    {
        tutor: 'Tutor'
    },
    {
        admin: 'Admin'
    }
];

const SERVER_URL = 'http://localhost:8082/api';

// /components/RegisterUser.js
class RegisterUser extends Component {
    constructor() {
        super();

        this.state = defaultState;
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

        if (this.validateInput()) {
            const data = {
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                gender: this.state.gender,
                semester: this.state.semester,
                program: this.state.program,
                dateOfBirth: this.state.dateOfBirth,
                lastOnline: this.state.lastOnline,
                role: this.state.role
            };

            axios
                .post(`${SERVER_URL}/user/register`, data)
                .then(res => {
                    this.setState(defaultState);
                    this.props.history.push('/');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    /**
     * Validates wether all user inputs are in the correct format/filled out
     * @returns {Boolean} true if all required fields are filled out.
     */
    validateInput() {
        let input = this.state;
        let errors = {};
        let isValid = true;

        if (input['firstName'] === '') {
            isValid = false;
            errors['firstName'] = 'Please enter your first name!';
        }
        if (input['lastName'] === '') {
            isValid = false;
            errors['lastName'] = 'Please enter your last name!';
        }

        if (input['email'] !== '') {
            const regExp =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regExp.test(input['email'])) {
                isValid = false;
                errors['email'] = 'Please enter a valid email adress!';
            }
        } else if (input['email'] === '') {
            isValid = false;
            errors['email'] = 'Please enter an email adress!';
        }

        if (input['password'] === '') {
            isValid = false;
            errors['password'] = 'Please enter a password!';
        }

        if (input['confirmPassword'] === '') {
            isValid = false;
            errors['confirmPassword'] = 'Please enter your password confirmation';
        }

        if (input['password'] !== '' && input['confirmPassword'] !== '') {
            if (input['password'] !== input['confirmPassword']) {
                errors['password'] = "Your passwords don't match";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        const { classes } = this.props;

        var optionState = this.props.optionState;
        return (
            <div className={classes.component}>
                <div className="container">
                    <div className={classes.container}>
                        <h2 className={`${classes.title_padding_bottom}`}>Register User</h2>
                        <div className={`card col-12 login-card mt-2 hv-center`}>
                            <form>
                                <div className={classes.row_padding_top}>
                                    <div class="row row-cols-3">
                                        {/* First name input */}
                                        <div class="col">
                                            <label htmlFor="firstNameInput">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                className="form-control"
                                                id="firstName"
                                                placeholder="Max"
                                                value={this.state.firstName}
                                                onChange={this.onChange}
                                            />
                                            <div className="text-danger">
                                                {this.state.errors.firstName}
                                            </div>
                                        </div>

                                        {/* First name input */}
                                        <div class="col">
                                            <label htmlFor="lastNameInput">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                className="form-control"
                                                id="lastName"
                                                placeholder="Mustermann"
                                                value={this.state.lastName}
                                                onChange={this.onChange}
                                            />
                                            <div className="text-danger">
                                                {this.state.errors.lastName}
                                            </div>
                                        </div>

                                        {/* Gender input control */}
                                        <div>
                                            <Form.Group
                                                controlId="gender"
                                                className={classes.row__padding_right}>
                                                <Form.Label>Gender</Form.Label>
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
                                    </div>
                                </div>

                                {/* Email input */}
                                <div className={classes.label__padding_top}>
                                    <label htmlFor="exampleInputEmail">Email address</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="mail@example.com"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    <small id="emailHelp" className="form-text text-muted">
                                        We'll never share your email with anyone else.
                                    </small>
                                    <div className="text-danger">{this.state.errors.email}</div>
                                </div>

                                {/* Password input */}
                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    <div className="text-danger">{this.state.errors.password}</div>
                                </div>

                                {/* Confirm password input */}
                                <div className="form-group text-left">
                                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChange}
                                    />
                                    <div className="text-danger">
                                        {this.state.errors.confirmPassword}
                                    </div>
                                </div>

                                <div class={classes.container + ' ' + 'row row-cols-4'}>
                                    {/* University input option */}
                                    <div class="col">
                                        <Form.Group controlId="university">
                                            <Form.Label>University</Form.Label>
                                            <Form.Control
                                                as="select"
                                                name="university"
                                                onChange={this.onChange}>
                                                <option values={'tum'}>
                                                    Technical University Munich
                                                </option>
                                                <option values={'lmu'}>
                                                    Ludwig Maximilian University Munich
                                                </option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>

                                    {/* Program input option */}
                                    <div class="col">
                                        <Form.Group controlId="degree" onChange={this.onChange}>
                                            <Form.Label>Program</Form.Label>
                                            <Form.Control name="program" as="select">
                                                {degree.map((item, _) => (
                                                    <option value={Object.keys(item)[0]}>
                                                        {Object.values(item)[0]}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>

                                    {/* Semester input option */}
                                    <div class="col">
                                        <Form.Group
                                            controlId="semester"
                                            onChange={this.onChangeNumber}>
                                            <Form.Label>Semester</Form.Label>
                                            <Form.Control
                                                name="semester"
                                                as="select"
                                                value={this.state.value}>
                                                {semesterCount.map((item, _) => (
                                                    <option value={item}>{item}</option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>

                                    {/* User role input option */}
                                    <div class="col">
                                        <Form.Group controlId="role">
                                            <Form.Label>Role</Form.Label>
                                            <Form.Control
                                                name="role"
                                                as="select"
                                                value={optionState}
                                                onChange={this.onChange}
                                                value={this.state.role}>
                                                {roles.map((item, _) => (
                                                    <option value={Object.keys(item)[0]}>
                                                        {Object.values(item)[0]}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                </div>

                                <div className={classes.button_box}>
                                    {/* Register Button */}
                                    <div className="form-group">
                                        <button
                                            className={`btn btn-primary btn-lg`}
                                            onClick={this.onRegister}>
                                            Register
                                        </button>
                                        <button
                                            className={`btn btn-primary btn-secondary btn-lg`}
                                            onClick={this.onCancel}>
                                            Cancel
                                        </button>
                                    </div>
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
