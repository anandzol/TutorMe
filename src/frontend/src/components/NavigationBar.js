import React, { Component } from 'react';
import graduationIcon from '../assets/graduation.png';
import { Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import AuthService from '../services/AuthService';
// @Todo: Use Icons instead of labels for Calendar/List/Profile
import { withStyles } from '@material-ui/styles';

const styles = () => ({
    bar: {
        fontSize: 'xxx-large'
    },
    listButton: {
        position: 'absolute',
        right: '350px',
        top: '31px',
        zIndex: 1000,
        fontSize: 'xx-large',
        color: 'white'
    },
    calendarButton: {
        position: 'absolute',
        right: '190px',
        top: '31px',
        zIndex: 1000,
        fontSize: 'xx-large',
        color: 'white'
    },
    profileButton: {
        position: 'absolute',
        right: '50px',
        top: '23px',
        zIndex: 1000
    },
    logo: {
        paddingRight: '10px',
        height: '70px',
        width: '70px'
    },
    profileButton__span: {
        color: 'white',
        fontSize: 'xx-large'
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
        this.props.history.push('/');
    }
    render() {
        const { classes } = this.props;
        return (
            <Navbar bg="primary" variant="dark">
                <a href="/">
                    <img src={graduationIcon} className={classes.logo}></img>
                </a>
                <Navbar.Brand className={classes.bar} href="/">
                    <Row>
                        <div className="col-sm-4">Tutor</div>
                        <div className={`${classes.title} col-sm-0`}>Me</div>
                    </Row>
                </Navbar.Brand>
                <Nav>
                    <a href="/" className={classes.listButton}>
                        List
                    </a>
                </Nav>
                <Nav>
                    <a href="/" className={classes.calendarButton}>
                        Calendar
                    </a>
                </Nav>
                <Nav className={classes.profileButton}>
                    <NavDropdown
                        title={<span className={classes.profileButton__span}>Profile</span>}
                        id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/">Home</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/create-offering">Offer Course</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Manage Course</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/create-course">Create Course</NavDropdown.Item>
                        <NavDropdown.Item href="/create-faculty">Create Faculty</NavDropdown.Item>
                        <NavDropdown.Item href="/create-university">
                            Create University
                        </NavDropdown.Item>
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
