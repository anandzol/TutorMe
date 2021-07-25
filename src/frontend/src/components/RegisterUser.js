import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Row, Col, Form, Toast } from 'react-bootstrap/';
import AuthService from '../services/AuthService';
import { getAllUniversitiesSorted } from '../services/UniversityService';
import { uploadFile } from '../services/FileUploadService';
import DatePicker from 'react-date-picker';
import Select from 'react-select';
import PasswordStrengthBar from 'react-password-strength-bar';

import './styles/styles.css';

const styles = () => ({
    row__padding_right: {
        paddingRight: '20px'
    },
    label__padding_top: {
        paddingTop: '0.5rem'
    },
    button_box: {
        position: 'absolute',
        paddingTop: '2rem'
    },
    component: {
        position: 'absolute',
        backgroundColor: '#f0f2f5',
        paddingTop: '10px',
        paddingBottom: '10px',
        height: '90%',
        width: '100%',
        color: 'black',
        overflow: 'auto'
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
        paddingTop: '1rem',
        paddingBottom: '1rem'
    },
    datePicker: {
        color: '#495057',
        borderColor: '#495057'
    },
    datePickerWrapper: {
        display: 'block',
        width: '30%',
        padding: '.375rem .75rem',
        fontSize: '1rem',
        lineHeight: '1.5',
        color: '#495057',
        backgroundColor: '#fff',
        backgroundClip: 'padding-box',
        border: '1px solid #ced4da',
        borderRadius: '.25rem',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out'
    },
    passwordStrengthBar: {
        height: '1rem'
    },
    card: {
        height: '47rem'
    },
    postalCodeInput: {
        width: '5rem'
    },
    genderSelect: {
        width: '10rem'
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
    errors: {},
    universities: [],
    university: '',
    selectedImage: null,
    imageId: '',
    languages: [],
    university: '',
    duplicateEmail: false,
    postalCode: '',
    adress: '',
    city: ''
};

const semesterCount = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' }
];

const degree = [
    {
        value: 'bachelor',
        label: 'Bachelor'
    },
    {
        value: 'master',
        label: 'Master'
    },
    {
        value: 'graduate',
        label: 'Graduate'
    }
];

const roles = [
    {
        value: 'student',
        label: 'Student'
    },
    {
        value: 'tutor',
        label: 'Tutor'
    },
    {
        value: 'admin',
        label: 'Admin'
    }
];

const languages = [
    { value: 'German', label: 'German' },
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' }
];

const gender = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'undefined', label: 'Undefined' }
];
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
        this.props.history.push('/home');
    };

    onChangeImage = e => {
        this.setState({
            selectedImage: e.target.files[0],
            loaded: 0
        });
    };
        
    onChangeDatePicker = e => {
        this.setState({ dateOfBirth: e });
    };

    onRegister = e => {
        e.preventDefault();

        if (this.validateInput()) {
            uploadFile(
                this.state.selectedImage,
                response => {
                    // var docs = [];
                    this.setState({ imageId: response.data._id }, () => {
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
                             postalCode: this.state.postalCode,
                            adress: this.state.adress,
                            languages: this.state.languages,
                            role: this.state.role,
                            city: this.state.city,
                            university: this.state.university,
                            image: this.state.imageId
                        };

                        AuthService.register(
                            data,
                            response => {
                                this.setState(defaultState);
                            
                            },
                            error => {
                                if (error.response.data && error.response.status === 400) {
                                    this.setState({ duplicateEmail: true });
                                }
                                console.error(error);
                            }
                        );
                        his.props.history.push('/login-user', data);
                    });
            
            
        });
        
    }
        }

    componentDidMount() {
        getAllUniversitiesSorted(
            response => {
                let universitiesMapped = [];
                response.map((item, index) => {
                    universitiesMapped.push({
                        value: item._id,
                        label: item.name
                    });
                });
                this.setState({
                    universities: universitiesMapped
                });

                if (universitiesMapped.length != 0) {
                    this.setState({
                        university: universitiesMapped[0].value
                    });
                }
            },
            error => {
                console.error(error);
            }
        );
    };

    onChangeLanguages = e => {
        let languages = e.map(language => language.label);
        this.setState({
            languages: languages
        });
    };

    onChangeGender = e => {
        this.setState({
            gender: e.value
        });
    };

    onChangeDegree = e => {
        this.setState({
            program: e.value
        });
    };

    onChangeRoles = e => {
        this.setState({
            role: e.value
        });
    };

    onChangeSemester = e => {
        this.setState({
            semester: e.value
        });
    };

    onChangeUniversity = e => {
        this.setState({
            university: e.value
        });
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
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.component}>
                <div className="container">
                    <h2 className={`${classes.title_padding_bottom}`}>Register User</h2>
                    <div className={`card col-12 login-card mt-2 hv-center ${classes.card}`}>
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
                                            <Select
                                                placeholder="Gender"
                                                options={gender}
                                                className={classes.genderSelect}
                                                onChange={this.onChangeGender}></Select>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                            <div>
                                    <Form.Group className={classes.file_selector}>
                                        <Form.Label>Upload Photo</Form.Label>
                                        <Form.File
                                            id="image"
                                            name="document"
                                            onChange={this.onChangeImage}
                                        />
                                    </Form.Group>
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
                                <div className="text-danger">
                                    {this.state.duplicateEmail
                                        ? 'Email already exists, try logging on with this email!'
                                        : ''}
                                </div>
                            </div>

                            {/** Date of birth input */}
                            <div class={`${classes.label__padding_top}`}>
                                <div class={`row row-cols-2`}></div>
                                <Row>
                                    <Col>
                                        <label>Date of birth</label>
                                        <Row />
                                        <div className={classes.datePickerWrapper}>
                                            <DatePicker
                                                wrapperClassName="datePicker"
                                                disableCalendar
                                                clearIcon
                                                format={'dd-MM-y'}
                                                onChange={this.onChangeDatePicker}
                                                calendarAriaLabel={'Date of birth'}
                                                required={true}
                                                isClearable={false}
                                                value={new Date()}></DatePicker>
                                        </div>
                                    </Col>
                                    <Col>
                                        <label>Languages</label>
                                        <Select
                                            isMulti
                                            options={languages}
                                            onChange={this.onChangeLanguages}
                                        />
                                    </Col>
                                </Row>
                                <Row></Row>
                            </div>

                            <div class={`${classes.row_padding_top} row row-cols-4`}>
                                {/* University input option */}
                                <div class="col">
                                    <Form.Group controlId="university">
                                        <Form.Label>University</Form.Label>
                                        <Select
                                            options={this.state.universities}
                                            placeholder="University"
                                            onChange={this.onChangeUniversity}></Select>
                                    </Form.Group>
                                </div>

                                {/* Program input option */}
                                <div class="col">
                                    <Form.Group controlId="degree" onChange={this.onChange}>
                                        <Form.Label>Program</Form.Label>
                                        <Select
                                            placeholder="Program"
                                            options={degree}
                                            onChange={this.onChangeDegree}></Select>
                                    </Form.Group>
                                </div>

                                {/* Semester input option */}
                                <div class="col">
                                    <Form.Group controlId="semester" onChange={this.onChangeNumber}>
                                        <Form.Label>Semester</Form.Label>
                                        <Select
                                            placeholder="1"
                                            options={semesterCount}
                                            onChange={this.onChangeSemester}></Select>
                                    </Form.Group>
                                </div>

                                {/* User role input option */}
                                <div class="col">
                                    <Form.Group controlId="role">
                                        <Form.Label>Role</Form.Label>
                                        <Select
                                            options={roles}
                                            placeholder="Roles"
                                            onChange={this.onChangeRoles}></Select>
                                    </Form.Group>
                                </div>
                            </div>
                            <div class={`${classes.label__padding_top}`}>
                                <Row>
                                    <Col xs={2}>
                                        <label>Postal Code</label>
                                        <input
                                            type="number"
                                            name="postalCode"
                                            className="form-control"
                                            min="10000"
                                            max="99999"
                                            id="postalCode"
                                            placeholder="85748"
                                            value={this.state.postalCode}
                                            onChange={this.onChange}
                                        />
                                        <Row />
                                    </Col>
                                    <Col xs={6}>
                                        <label>Adress</label>
                                        <input
                                            type="text"
                                            name="adress"
                                            className="form-control"
                                            id="adress"
                                            placeholder="Adress"
                                            value={this.state.adress}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                    <Col>
                                        <label>City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-control"
                                            id="city"
                                            placeholder="City"
                                            value={this.state.city}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                </Row>
                                <Row></Row>
                            </div>

                            {/* Password input */}
                            <div className={`text-left ${classes.label__padding_top}`}>
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
                                <PasswordStrengthBar password={this.state.password} />
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

                            <div className={classes.button_box}>
                                {/* Register Button */}
                                <div className="form-group">
                                    <button
                                        className={`btn btn-primary btn-lg`}
                                        onClick={this.onRegister}>
                                        <span>Register</span>
                                    </button>
                                    <button
                                        className={`btn btn-primary btn-secondary btn-lg`}
                                        onClick={this.onCancel}>
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(RegisterUser);
