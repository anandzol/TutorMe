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
        height: '400px',
        paddingTop: '100px'
        // opacity: '0.7'
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
    button__padding_top: {
        paddingTop: '20px'
    },
    homeDiv: {
        paddingLeft: '1rem',
        paddingTop: '8rem'
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
        this.state = {
            //defaulting to TUM
            university: '60bff011a5e1000beeddb38e'
        };
        AuthService.getUserById(currentUser._id, response => {
            if (response.data.university) this.setState({ university: response.data.university });
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.center}>
                <img className={classes.image} src={tutorLogo} />

                <h1 className={classes.heading}>TutorMe</h1>
                <h2 className={classes.subText}>Your Personalised, Tailored Tutoring</h2>
                <h2 className={classes.subText}>See available learnings for your university</h2>
                <Link to={{ pathname: `/show-sessions/${this.state.university}` }}>
                    <h2 className={classes.subText}>Explore Now</h2>
                </Link>
            </div>
        );
    }
}

export default withStyles(styles)(HomeScreen);
