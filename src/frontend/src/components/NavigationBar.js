import React, { Component } from 'react';
import graduationIcon from '../assets/graduation.png';
import { Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import { withStyles } from '@material-ui/styles';
import { BsJustify, BsCalendar, BsPersonFill } from 'react-icons/bs';

const styles = () => ({
    bar: {
        fontSize: 'xxx-large'
    },
    listButton: {
        position: 'absolute',
        right: '255px',
        top: '27px',
        zIndex: 1000,
        fontSize: '54px',
        color: 'white'
    },
    calendarButton: {
        position: 'absolute',
        right: '195px',
        top: '34px',
        zIndex: 1000,
        fontSize: '38px',
        color: 'white'
    },

    logo: {
        paddingRight: '10px',
        height: '70px',
        width: '70px'
    },
    profileButton: {
        position: 'absolute',
        right: '80px',
        top: '15px',
        zIndex: 1000,
        color: 'white',
        fontSize: 'xxx-large'
    },
    title: {
        position: 'relative',
        left: '4rem',
        color: '#56b5ab'
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
        const navDropDownTitle = <BsPersonFill></BsPersonFill>;
        const { classes } = this.props;
        return (
            <Navbar bg="primary" variant="dark">
                <a href="/home">
                    <img src={graduationIcon} className={classes.logo}></img>
                </a>
                <Navbar.Brand className={classes.bar} href="/home">
                    <Row>
                        <div className="col-sm-4">Tutor</div>
                        <div className={`${classes.title} col-sm-0`}>Me</div>
                    </Row>
                </Navbar.Brand>
                <Nav>
                    <div>
                        <a href="/list-user-sessions">
                            <BsJustify className={classes.listButton}></BsJustify>
                        </a>
                    </div>
                </Nav>
                <Nav>
                    <a href="/home">
                        <BsCalendar className={classes.calendarButton}></BsCalendar>
                    </a>
                </Nav>
                <Nav className={classes.profileButton}>
                    <NavDropdown
                        title={navDropDownTitle}
                        id="collasible-nav-dropdown"
                        className={classes.profileButton__span}>
                        <NavDropdown.Item href="/home">Home</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/create-tutorial-session">
                            Offer Session
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Manage Course</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/create-course">Create Course</NavDropdown.Item>
                        <NavDropdown.Item href="/create-faculty">Create Faculty</NavDropdown.Item>
                        <NavDropdown.Item href="/create-university">
                            Create University
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/admin-approval">Approve/Reject</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/login-user" onClick={AuthService.logout}>
                            Sign Out
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}

export default withStyles(styles)(NavigationBar);
