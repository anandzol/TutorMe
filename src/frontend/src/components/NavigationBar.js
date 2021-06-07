import React, { Component } from 'react';
import graduationIcon from '../assets/graduation.png';
import {
    Nav,
    Navbar,
    Form,
    FormControl,
    Button,
    NavDropdown,
    NavbarBrand
} from 'react-bootstrap';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    bar: {
        fontSize: 'xx-large'
    },
    listButton: {
        position: 'absolute',
        right: '350px',
        top: '21px',
        zIndex: 1000,
        fontSize: 'x-large',
        color: 'white'
    },
    calendarButton: {
        position: 'absolute',
        right: '220px',
        top: '21px',
        zIndex: 1000,
        fontSize: 'x-large',
        color: 'white'
    },
    profileButton: {
        position: 'absolute',
        right: '100px',
        top: '13px',
        zIndex: 1000
    },
    logo: {
        paddingRight: '10px',
        height: '50px',
        width: '50px'
    },
    profileButton__span: {
        color: 'white',
        fontSize: 'x-large'
    }
});

class NavigationBar extends Component {
    constructor() {
        super();
    }

    render() {
        const { classes } = this.props;
        return (
            <Navbar bg="primary" variant="dark">
                <a href="/">
                    <img src={graduationIcon} className={classes.logo}></img>
                </a>
                <Navbar.Brand className={classes.bar} href="/">
                    TutorMe
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
                        title={
                            <span className={classes.profileButton__span}>
                                Profile
                            </span>
                        }
                        id="collasible-nav-dropdown"
                    >
                        <NavDropdown.Item href="/">Home</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Edit Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                            Offer Course
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Manage Course
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">
                            Sign Out
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}

export default withStyles(styles)(NavigationBar);
