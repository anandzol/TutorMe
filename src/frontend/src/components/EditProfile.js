import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Form from 'react-bootstrap/Form';
import AuthService from '../services/AuthService';
import { parseJwt } from '../services/AuthHeader';
import { getAllUniversitiesSorted } from '../services/UniversityService';

const useStyles = makeStyles(theme => ({
    main: {
        paddingTop: '8rem',
    },
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
} ));

const EditProfile = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('male');
    const genders = [{ male: 'Male' }, { female: 'Female' }, { others: 'Others' }]
    const [semester, setSemester] = useState(1);
    // const [program, setProgram] = useState('Bachelor');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [lastOnline, setLastOnline] = useState(new Date());
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [universities, setUniversities] = useState([]);
    const [university, setUniversity] = useState('');
    const [semesterCount, setSemesterCount] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [isValid, setIsValid] = useState(true)
    const [initialRender, setInitialRender] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [roles, setRoles] = useState([
        {
            student: 'Student'
        },
        {
            tutor: 'Tutor'
        },
        {
            admin: 'Admin'
        }
    ]);  
    const [ degree, setDegree ] = useState('bachelor');
    const degrees = [
        {
            bachelor: 'Bachelor'
        },
        {
            master: 'Master'
        },
        {
            graduate: 'Graduate'
        }];
    const [optionState, setOptionState] = useState('');
    const classes = useStyles();
    const [errors, setErrors] = useState({})
    // const gender = [{ male: 'Male' }, { female: 'Female' }, { others: 'Others' }];

    const validateInput = () => {
        if (firstName === '') {
            isValid = false;
            errors['firstName'] = 'Please enter your first name!';
        }
        if (lastName === '') {
            isValid = false;
            errors['lastName'] = 'Please enter your last name!';
        }

        if (email !== '') {
            const regExp =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regExp.test(email)) {
                isValid = false;
                errors['email'] = 'Please enter a valid email adress!';
            }
        } else if (email === '') {
            isValid = false;
            errors['email'] = 'Please enter an email adress!';
        }

        setErrors(errors);
        }
    
    const onCancel = () => {
        if(props.location.state?.from?.pathname){
            props.history.push('props.location.state.from.pathname')
        }
        else{
            props.history.push('/home')
        }
    }

    const onSave = e => {
        e.preventDefault()
        console.log("in save")
        const currentUserJWT = AuthService.getCurrentUser();
        const currentUser = parseJwt(currentUserJWT);
        const payload = {
            id : currentUser._id,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
            university: university,
            program: degree,
            semester: semester
        }

        AuthService.updateUserById(payload,
            response => {
                console.log("updated User Info", response)
                // setTimeout(console.log("tests"), 100)
                props.history.push('/home')
            },
            error => {
                console.log(error)
            })
    }

    useEffect(() => {
        setLoading(true);
        if (initialRender) {
            const currentUserJWT = AuthService.getCurrentUser();
            const currentUser = parseJwt(currentUserJWT);
            // setUserId(currentUser._id)
            
            AuthService.getUserById(currentUser._id,
                response => {
                    setUserId(currentUser._id)
                    setFirstName(response.data.name)
                    setLastName(response.data.lastName)
                    setDateOfBirth(response.data.dateOfBirth)
                    setUniversity(response.data.university)
                    setEmail(response.data.email)
                })

            getAllUniversitiesSorted(
                response => {
                    let universitiesMapped = [];
                    response.map((item, index) => {
                        universitiesMapped.push({
                            value: item._id,
                            name: item.name
                        });
                    });
                    setUniversities(universitiesMapped)
                        
                    if (universitiesMapped.length != 0) {
                        setUniversity(universitiesMapped[0].value);
                    }
                },
                error => {
                    console.error(error);
                }
            );
        }
        setInitialRender(false);
     });

    return (
        <div className={classes.component}>
        <div className="container">
            <div className={classes.main}>
                <h2 className={`${classes.title_padding_bottom}`}>Edit Profile</h2>
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
                                        value={firstName}
                                        onChange={e => {setFirstName(e.target.value)
                                                        console.log("me",firstName)}}
                                    />
                                    <div className="text-danger">
                                        {errors.firstName}
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
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                    <div className="text-danger">
                                        {errors.lastName}
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
                                            onChange={e => {
                                                setGender(e.target.value)
                                                const value  = e.target.value
                                                console.log(value)
                                            // console.log(genders.value)
                                            }}>
                                            {genders.map((item, _) => (
                                                <option value={Object.keys(item)[0]}>
                                                    {Object.values(item)[0]}
                                                </option>
                                            ))}
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
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
                            </small>
                            <div className="text-danger">{errors.email}</div>
                        </div>
                        <div class={classes.container + ' ' + 'row row-cols-3'}>
                            {/* University input option */}
                            <div class="col">
                                <Form.Group controlId="university">
                                    <Form.Label>University</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="university"
                                        onChange={e => setUniversity(e.target.value)}>
                                        {universities.map((item, _) => (
                                            <option value={item.value}>{item.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>

                            {/* Program input option */}
                            <div class="col">
                                <Form.Group controlId="degree" 
                                    onChange={e => setDegree(e.target.value)}>
                                    <Form.Label>Program</Form.Label>
                                    <Form.Control name="program" as="select">
                                        {degrees.map((item, _) => (
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
                                    onChange={e => setSemester(e.target.value)}>
                                    <Form.Label>Semester</Form.Label>
                                    <Form.Control
                                        name="semester"
                                        as="select"
                                        value={semester}>
                                        {semesterCount.map((item, _) => (
                                            <option value={item}>{item}</option>
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
                                    onClick={onSave}>
                                    Save Information
                                </button>
                                <button
                                    className={`btn btn-primary btn-secondary btn-lg`}
                                    onClick={onCancel}>
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

export default EditProfile;