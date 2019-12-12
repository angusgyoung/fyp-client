import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Navigation.css"
import GenericButton from "./GenericButton";
import { authenticationService } from "../helpers/authentication";

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
        }
    }

    render() {
        const { currentUser } = this.state;

        return (
            <Navbar id="navbar">
                <Link id="brand" className="navbar-brand" to="/home">I Said You Said</Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {currentUser == null && (
                        <Navbar.Text>
                            <Link to="/login">
                                <GenericButton>
                                    Log In
                                </GenericButton>
                            </Link>
                        </Navbar.Text>
                    )}
                    {currentUser && (
                        <Fragment>
                            <img
                                id="navbarProfilePicture"
                                src="https://media3.giphy.com/media/XRf8O3CECToRy/giphy.gif"
                                alt="Profile"
                                className="rounded-circle"
                            />
                            <NavDropdown title={currentUser} id="basic-nav-dropdown">
                                <Link className="dropdown-item" to="/profile">Profile</Link>
                                <Link className="dropdown-item" to="/feed">Feed</Link>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <GenericButton
                                        onClick={() => authenticationService.logout()}
                                    >
                                        Log Out
                                    </GenericButton>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Fragment>
                    )}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;