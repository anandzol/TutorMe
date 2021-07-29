import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Form from 'react-bootstrap/Form';
import AuthService from '../services/AuthService';
import { parseJwt } from '../services/AuthHeader';
import { getAllUniversitiesSorted } from '../services/UniversityService';
import { Row, Col } from 'react-bootstrap/';
import DatePicker from 'react-date-picker';
import Select from 'react-select';

const useStyles = makeStyles(theme => ({
    row__padding_right: {
        paddingRight: '20px'
    },
    label__padding_top: {
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
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
        width: '50%',
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
    },
    avatarImg:
    {
        width: 300,
        height: 300,
        borderRadius: 400/2,
        marginBottom: 50
    }
}));

const EditProfile = props => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('male');
    const genders = [{ male: 'Male' }, { female: 'Female' }, { others: 'Others' }];
    const [semester, setSemester] = useState(1);
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [email, setEmail] = useState('');
    const [universities, setUniversities] = useState([]);
    const [university, setUniversity] = useState('');
    const semesterCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [initialRender, setInitialRender] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [languages, setLanguages] = useState([]);
    const languagesList = [
        { value: 'German', label: 'German' },
        { value: 'English', label: 'English' },
        { value: 'French', label: 'French' }
    ];
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [adress, setadress] = useState('');
    const [degree, setDegree] = useState('bachelor');
    const degrees = [
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
    const [optionState, setOptionState] = useState('');
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(
        'https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-24.jpg'
    );

    const onCancel = () => {
        if (props.location.state?.from?.pathname) {
            props.history.push('props.location.state.from.pathname');
        } else {
            props.history.push('/home');
        }
    };

    const onSave = e => {
        e.preventDefault();
        const currentUserJWT = AuthService.getCurrentUser();
        const currentUser = parseJwt(currentUserJWT);
        const payload = {
            id: currentUser._id,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
            university: university,
            program: degree,
            semester: semester,
            dateOfBirth: dateOfBirth,
            languages: languages,
            city: city,
            postalCode: postalCode,
            adress: adress
        };
        AuthService.updateUserById(
            payload,
            response => {
                props.history.push('/home', response.data);
            },
            error => {
                console.log(error);
            }
        );
    };

    const onChangeLanguages = e => {
        let languages = e.map(language => language.label);
        setLanguages(languages);
    };

    useEffect(() => {
        setLoading(true);
        if (initialRender) {
            const currentUserJWT = AuthService.getCurrentUser();
            const currentUser = parseJwt(currentUserJWT);

            AuthService.getUserById(currentUser._id, response => {
                setUserId(currentUser._id);
                setFirstName(response.data.name);
                setLastName(response.data.lastName);
                setDateOfBirth(response.data.dateOfBirth);
                setUniversity(response.data.university);
                setEmail(response.data.email);
                setGender(response.data.gender);
                setLanguages(response.data.languages);
                setCity(response.data.city);
                setPostalCode(response.data.postalCode);
                setadress(response.data.adress);
                console.log(response)
                if (response.data.image != undefined) {
                    setImage(response.data.image.fileLink);
                }
            });

            getAllUniversitiesSorted(
                response => {
                    let universitiesMapped = [];
                    response.map((item, index) => {
                        universitiesMapped.push({
                            value: item._id,
                            name: item.name
                        });
                    });
                    setUniversities(universitiesMapped);

                    // if (universitiesMapped.length != 0) {
                    //     setUniversity(universitiesMapped[0].value);
                    // }
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
                <h2 className={`${classes.title_padding_bottom}`}>Edit Profile</h2>
                <div className={`card col-12 login-card mt-2 hv-center`}>
                    <form>
                        <div className={classes.row_padding_top}>
                        
                            <div className="col-xs-1" align = "center">
                                <img
                                    className={classes.avatarImg}
                                    src={image}
                                    alt="No image available"
                                />
                            </div>
                      
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
                                        onChange={e => {
                                            setFirstName(e.target.value);
                                        }}
                                    />
                                    <div className="text-danger">{errors.firstName}</div>
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
                                    <div className="text-danger">{errors.lastName}</div>
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
                                            value={gender}
                                            onChange={e => {
                                                setGender(e.target.value);
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
                            <label htmlFor="exampleInputEmail">Email Address</label>
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                id="email"
                                placeholder="mail@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <div className="text-danger">{errors.email}</div>
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
                                        value={postalCode}
                                        onChange={e => {
                                            setPostalCode(e.target.value);
                                        }}
                                    />
                                    <Row />
                                </Col>
                                <Col xs={6}>
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="adress"
                                        className="form-control"
                                        id="adress"
                                        placeholder="Adress"
                                        value={adress}
                                        onChange={e => {
                                            setadress(e.target.value);
                                        }}
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
                                        value={city}
                                        onChange={e => setCity(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row></Row>
                        </div>
                        <div class={classes.container + ' ' + 'row row-cols-3'}>
                            {/* University input option */}
                            <div class="col">
                                <Form.Group controlId="universitytest">
                                    <Form.Label>University</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="university"
                                        value={university}
                                        onChange={e => setUniversity(e.target.value)}>
                                        {universities.map((item, _) => (
                                            <option value={item.value}>{item.name}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>

                            {/* Program input option */}
                            <div class="col">
                                <Form.Group
                                    controlId="degree"
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
                                    <Form.Control name="semester" as="select" value={semester}>
                                        {semesterCount.map((item, _) => (
                                            <option value={item}>{item}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
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
                                            onChange={e => {
                                                setDateOfBirth(e);
                                            }}
                                            calendarAriaLabel={'Date of birth'}
                                            required={true}
                                            isClearable={false}
                                            value={dateOfBirth}></DatePicker>
                                    </div>
                                </Col>
                                <Col>
                                    <label>Languages</label>
                                    <Select
                                        isMulti
                                        options={languagesList}
                                        onChange={onChangeLanguages}
                                    />
                                </Col>
                            </Row>
                            <Row></Row>
                        </div>
                        <div className={classes.button_box}>
                            {/* Save Button */}
                            <div className="form-group">
                                <button className={`btn btn-primary btn-lg`} onClick={onSave}>
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
    );
};

export default EditProfile;
