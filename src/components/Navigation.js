import React, {Fragment} from "react";
import {useAuth0} from "../react-auth0-spa";
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

import "./Navigation.css"

const Navigation = () => {
    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();

    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin
        });

    return (
        <Navbar id="navbar">
            <Link id="brand" className="navbar-brand" to="/home">I Said You Said</Link>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                {!isAuthenticated && (
                    <Navbar.Text>
                        <Button
                            className="genericButton"
                            onClick={() => loginWithRedirect()}
                        >
                            Log In
                        </Button>
                    </Navbar.Text>
                )}
                {isAuthenticated && (
                    <Fragment>
                        <img
                            id="navbarProfilePicture"
                            src={user.picture}
                            alt="Profile"
                            className="rounded-circle"
                        />
                        <NavDropdown title={user.name} id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/profile">Profile</Link>
                            <Link className="dropdown-item" to="/feed">Feed</Link>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item>
                                <Button
                                    className="genericButton"
                                    onClick={() => logoutWithRedirect()}
                                >
                                    Log Out
                                </Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Fragment>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;