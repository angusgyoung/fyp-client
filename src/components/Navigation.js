import React from "react";
import {useAuth0} from "../react-auth0-spa";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {NavLink as RouterNavLink} from "react-router-dom";

import "./Navigation.css"

const Navigation = () => {
    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();

    const logoutWithRedirect = () =>
        logout({
            returnTo: window.location.origin
        });

    return (
        <Navbar id="navbar">
            <Navbar.Brand href="#home">I Said You Said</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                {!isAuthenticated && (
                    <Navbar.Text>
                        <RouterNavLink
                            to="#"
                            onClick={() => loginWithRedirect({})}
                        >
                            Log In
                        </RouterNavLink>
                    </Navbar.Text>
                )}
                {isAuthenticated && (
                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item>
                            <RouterNavLink
                                to="#"
                                onClick={() => logoutWithRedirect()}
                            >
                                Log Out
                            </RouterNavLink>
                        </NavDropdown.Item>
                    </NavDropdown>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;