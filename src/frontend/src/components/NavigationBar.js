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
class NavigationBar extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <a href="/">
                    <img
                        src={graduationIcon}
                        className="NavigationBarLogo"
                    ></img>
                </a>
                <Navbar.Brand className="NavigationBar" href="/home">
                    TutorMe
                </Navbar.Brand>
                <Nav className="ProfileButton">
                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
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

export default NavigationBar;
