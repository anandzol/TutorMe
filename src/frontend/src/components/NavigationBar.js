import React, { Component } from 'react';
import {
    Nav,
    Navbar,
    Form,
    FormControl,
    Button,
    NavDropdown
} from 'react-bootstrap';
class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <div></div>
                <Navbar.Brand href="/home">TutorMe</Navbar.Brand>
                <Nav className="ProfileButton">
                    <NavDropdown
                        className="ProfileButton"
                        title="Profile"
                        id="collasible-nav-dropdown"
                    >
                        <NavDropdown.Item href="#action/3.1">
                            Home
                        </NavDropdown.Item>
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
