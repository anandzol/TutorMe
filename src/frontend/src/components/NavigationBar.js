import React, { Component } from 'react';
import graduationIcon from '../assets/graduationCap.png';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import { withStyles } from '@material-ui/styles';
import { BsJustify, BsCalendar, BsPersonFill } from 'react-icons/bs';

const styles = () => ({
    bar: {
        fontSize: 'xxx-large',
        fontWeight: 'bold',
        height: '6rem'
    },
    listButton: {
        position: 'absolute',
        right: '16rem',
        top: '27px',
        zIndex: 1000,
        fontSize: '54px',
        color: 'black'
    },
    calendarButton: {
        position: 'absolute',
        right: '12.5rem',
        top: '34px',
        zIndex: 1000,
        fontSize: '38px',
        color: 'black'
    },

    logo: {
        // height: '90px',
        // width: '250px',
        // padding: '15px 14px 15px 16px',
        position: 'absolute',
        left: '3rem',
        height: '5rem',
        width: '6rem'
    },
    profileButton: {
        position: 'absolute',
        right: '5.5rem',
        top: '15px',
        zIndex: 1000,
        color: 'black',
        fontSize: 'xxx-large'
    },
    title: {
        position: 'relative',
        left: '4rem',
        color: '#56b5ab'
    },
    profileButton__span: {
        right: '0rem'
    }
});

class NavigationBar extends Component {
    constructor() {
        super();
    }

    onLogout() {
        AuthService.logout();
        this.props.history.push('/home');
    }

    render() {
        const isAdmin = AuthService.isAdmin();
        const isLoggedIn = AuthService.isLoggedIn();
        const isTutor = AuthService.isTutor();
        const isTutorOrAdmin = isTutor || isAdmin;

        const navDropDownTitle = <BsPersonFill></BsPersonFill>;
        const { classes } = this.props;
        let linkHome;
        let navbarHome;

        if (isLoggedIn) {
            navbarHome = <NavDropdown.Item href="/home">Home</NavDropdown.Item>;
            linkHome = (
                <Link to="/">
                    <img src={graduationIcon} className={classes.logo}></img>
                </Link>
            );
        } else {
            navbarHome = <NavDropdown.Item href="/">Home</NavDropdown.Item>;
            linkHome = (
                <Link to="/">
                    <img src={graduationIcon} className={classes.logo}></img>
                </Link>
            );
        }

        return (
            <Navbar bg="light" variant="light" expand="lg">
                <Navbar.Brand className={classes.bar} href="/">
                    <Row>{linkHome}</Row>
                </Navbar.Brand>

                <Nav>
                    {isLoggedIn ? (
                        <div>
                            <Link to="/list-user-sessions">
                                <BsJustify className={classes.listButton}></BsJustify>
                            </Link>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </Nav>
                <Nav>
                    {isLoggedIn ? (
                        <Link to="/">
                            <BsCalendar className={classes.calendarButton}></BsCalendar>
                        </Link>
                    ) : (
                        <div></div>
                    )}
                </Nav>
                <Nav className={classes.profileButton}>
                    {isLoggedIn ? (
                        <NavDropdown
                            title={navDropDownTitle}
                            id="collasible-nav-dropdown"
                            className={classes.profileButton__span}>
                            {navbarHome}
                            <NavDropdown.Item href="/edit-profile" props={this.props}>
                                Edit Profile
                            </NavDropdown.Item>
                            {isTutorOrAdmin && (
                                <React.Fragment>
                                    <NavDropdown.Item href="/create-tutorial-session">
                                        Offer Session
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/manage-sessions">
                                        Manage Course
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/create-course">
                                        Create Course
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/create-faculty">
                                        Create Faculty
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/create-university">
                                        Create University
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/admin-approval">
                                        Approve/Reject
                                    </NavDropdown.Item>
                                </React.Fragment>
                            )}
                            <NavDropdown.Item href="/" onClick={AuthService.logout}>
                                Sign Out
                            </NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                        </NavDropdown>
                    ) : (
                        <NavDropdown
                            title={navDropDownTitle}
                            id="collasible-nav-dropdown"
                            className={classes.profileButton__span}>
                            <NavDropdown.Item href="/login-user">Sign In</NavDropdown.Item>
                            <NavDropdown.Item href="/register-user">Sign Up</NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar>
        );
    }
}

export default withStyles(styles)(NavigationBar);
