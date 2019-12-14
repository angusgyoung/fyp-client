import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Navigation.css"
import GenericButton from "./elements/GenericButton";
import { userContext } from "../context/UserContext";

class Navigation extends Component {

    render() {
        return (
            <Navbar id="navbar">
                <Link id="brand" className="navbar-brand" to="/home">I Said You Said</Link>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <userContext.Consumer>
                        {
                            user =>
                            user.isAuthenticated && (
                                    <Fragment>
                                        <img
                                            id="navbarProfilePicture"
                                            src={user.currentUser.profile.profileImageUrl}
                                            alt="Profile"
                                            className="rounded-circle"
                                        />
                                        <NavDropdown title={user.currentUser.profile.username} id="basic-nav-dropdown">
                                            <Link className="dropdown-item" to="/profile">Profile</Link>
                                            <Link className="dropdown-item" to="/feed">Feed</Link>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item>
                                                <GenericButton onClick={() => user.logout()}>
                                                    Log Out
                                                </GenericButton>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </Fragment>
                                ) || 
                                    <Navbar.Text>
                                        <Link to="/login">
                                            <GenericButton>
                                                Log In
                                            </GenericButton>
                                        </Link>
                                    </Navbar.Text>
                                
                        }
                    </userContext.Consumer>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;