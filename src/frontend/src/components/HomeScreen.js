import { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import AuthService from '../services/AuthService';
import { parseJwt } from '../services/AuthHeader';
import { Link } from 'react-router-dom';
import tutorLogo from '../assets/mainLogo.png';
const styles = theme => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '20px'
        // width: '100%'
    },
    image: {
        width: '600px',
        height: '300px',
        paddingTop: '50px'
        // opacity: '0.7'
    },
    heading: {
        fontSize: '50px',
        letterSpacing: '7px',
        fontFamily: 'Segoe UI',
        opacity: '0.8'
    },
    subText: {
        letterSpacing: '2px',
        fontFamily: 'Segoe UI',
        paddingBottom: '20px',
        opacity: '0.75'
    },
    button__padding_top: {
        paddingTop: '20px'
    },
    homeDiv: {
        paddingLeft: '1rem',
        paddingTop: '8rem'
    },
    firstName: {
        fontFamily: 'Segoe UI',
        opacity: '0.8',
        paddingLeft: '1rem'
    }
});

const defaultState = {
    firstName: '',
    lastName: '',
    role: '',
    email: ''
};
class HomeScreen extends Component {
    constructor() {
        super();
        const currentUserJWT = AuthService.getCurrentUser();
        const currentUser = parseJwt(currentUserJWT);
        if (currentUser === undefined) {
            return;
        }

        this.state = {
            // defaulting to TUM
            university: '60bff011a5e1000beeddb38e',
            firstName: currentUser.firstName
        };
        AuthService.getUserById(currentUser._id, response => {
            if (response.data.university) {
                this.setState({ university: response.data.university });
            }
        });
    }

    render() {
        const { classes } = this.props;

        let link;
        if (this.state == null) {
            return <div></div>;
        }
        if (this.state.university) {
            link = (
                <Link to={{ pathname: `/show-sessions/${this.state.university}` }}>
                    <h2 className={classes.subText}>Explore Now</h2>
                </Link>
            );
        }

        return (
            <div>
                <div className={classes.firstName}>
                    <h1>{`Welcome ${
                        this?.props?.location?.state?.firstName
                            ? this.props.location.state.firstName
                            : this.state.firstName
                    }!`}</h1>
                </div>
                <div className={classes.center}>
                    <img className={classes.image} src={tutorLogo} />

                    <h1 className={classes.heading}>TutorMe</h1>
                    <h3 className={classes.subText}>Your Personalised, Tailored Tutoring</h3>
                    <h4 className={classes.subText}>See available learnings for your university</h4>
                    {link}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(HomeScreen);
