import React, { Component } from 'react';
import tutorLogo from '../assets/mainLogo.png';
import { withStyles } from '@material-ui/styles';
import { Form } from 'react-bootstrap';
import { getAllUniversitiesSorted } from '../services/UniversityService';
import AuthService from '../services/AuthService';
import tumLogo from '../assets/TUM_logo.png';
import lmulogo from '../assets/LMU_logo.png';
import hmlogo from '../assets/HM_Logo.jpg';
import tubLogo from '../assets/TUB_logo.png';
import rwthLogo from '../assets/rwth_logo.png';
import stuttLogo from '../assets/stuttgart_logo.png';

const styles = () => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '20px'
    },
    image: {
        width: '600px',
        height: '400px',
        paddingTop: '100px'
    },
    form_selectors: {
        width: '20rem',
        paddingTop: '2rem'
    },
    heading: {
        fontSize: '100px',
        letterSpacing: '7px',
        fontFamily: 'Segoe UI',
        opacity: '0.8'
    },
    subText: {
        letterSpacing: '2px',
        fontFamily: 'Segoe UI',
        paddingBottom: '50px',
        opacity: '0.75'
    },
    bottomBanner: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: '2rem',
        justifyContent: 'space-between',
        paddingTop: '3rem',
        width: '100%',
        height: '100%',
        flexWrap: 'wrap'
    },
    bannerLogo: {
        height: '6rem',
        opacity: '0.3',
        '&:hover': {
            opacity: '0.9'
        },
        marginBottom: '2.5rem'
    },
    bannerText: {
        height: '6rem',
        opacity: '0.5'
    }
});

class WelcomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            universityId: '',
            availableUniversities: []
        };
    }

    componentDidMount() {
        getAllUniversitiesSorted(
            universitiesSorted => {
                this.setState({
                    availableUniversities: universitiesSorted
                });
            },
            error => {
                console.error(error);
            }
        );
    }

    onChangeUniversity = e => {
        const universityId = e.target.value;

        const currentUser = AuthService.getCurrentUser();

        if (currentUser === null) {
            this.props.history.push('/login-user', this.state);
        } else {
            this.props.history.push(`/show-sessions/${universityId}`);
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.center}>
                <img className={classes.image} src={tutorLogo} />
                <h1 className={classes.heading}>TutorMe</h1>
                <h2 className={classes.subText}>
                    1-1 Tutoring platform tailored to your university curriculum.
                </h2>
                <div className={`${classes.form_selectors}`}>
                    {/** Form for selecting the unversity*/}
                    <Form.Group controlId="universityGroup" className={classes.form_option}>
                        <Form.Control
                            as="select"
                            name="university"
                            onChange={this.onChangeUniversity}>
                            <option>Find your University..</option>
                            {this.state.availableUniversities.map((item, _) => (
                                <option value={item._id}>{item.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className={classes.bottomBanner}>
                    <h1 className={classes.bannerText}>
                        Tutors <br /> from :{' '}
                    </h1>
                    <a href="https://www.tum.de/" target="_blank">
                        <img className={classes.bannerLogo} src={tumLogo} />
                    </a>
                    <a href="https://www.lmu.de/" target="_blank">
                        <img className={classes.bannerLogo} src={lmulogo} />
                    </a>
                    <a href="https://www.fh-muenchen.de/" target="_blank">
                        <img className={classes.bannerLogo} src={hmlogo} />
                    </a>
                    <a href="https://www.tu.berlin/" target="_blank">
                        <img className={classes.bannerLogo} src={tubLogo} />
                    </a>
                    <a href="https://www.rwth-aachen.de" target="_blank">
                        <img className={classes.bannerLogo} src={rwthLogo} />
                    </a>
                    <a href="https://www.uni-stuttgart.de/" target="_blank">
                        <img className={classes.bannerLogo} src={stuttLogo} />
                    </a>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(WelcomeScreen);
