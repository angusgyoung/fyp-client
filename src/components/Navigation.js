import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Navigation.css"
import GenericButton from "./GenericButton";
import { authenticationService } from "../services/authentication.service";

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
        }
    }

    render() {
        return (
            <Navbar id="navbar">
                <Link id="brand" className="navbar-brand" to="/home">I Said You Said</Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {this.state.currentUser == null && (
                        <Navbar.Text>
                            <Link to="/login">
                                <GenericButton>
                                    Log In
                                </GenericButton>
                            </Link>
                        </Navbar.Text>
                    )}
                    {this.state.currentUser && (
                        <Fragment>
                            <img
                                id="navbarProfilePicture"
                                src={this.state.currentUser.profile.profileImageUrl}
                                alt="Profile"
                                className="rounded-circle"
                            />
                            <NavDropdown title={this.state.currentUser.profile.username} id="basic-nav-dropdown">
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