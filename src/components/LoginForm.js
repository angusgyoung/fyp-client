import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import GenericButton from "./GenericButton";

import { login } from "../services/api";
import "./LoginForm.css"
import { authenticationService } from "../services/authentication.service";

class LoginForm extends Component {

    constructor(props) {
        super(props);

        if(authenticationService.currentUserValue) {
            this.props.history.push('/')
        }

        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this)
        this.submitLoginCredentials = this.submitLoginCredentials.bind(this);
    }

    usernameChanged(event) {
        this.setState({
            'username': event.target.value
        })
    }

    passwordChanged(event) {
        this.setState({
            'password': event.target.value
        })
    }

    submitLoginCredentials() {
        authenticationService.login(this.state.username, this.state.password)
        .then(
            user => {
                //const { from } = this.props.location.state || { from: { pathname: "/"} };
                const { from } = { from: { pathname: "/"} };
                this.props.history.push(from)
            },
            error => {
                console.log('Authentication failed', error.message);
            }
        );
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" onChange={this.usernameChanged} type="text" placeholder="Enter username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" onChange={this.passwordChanged} type="password" placeholder="Password" />
                </Form.Group>
                <GenericButton onClick={this.submitLoginCredentials} variant="primary" type="submit">
                    Submit
                </GenericButton>
            </Form>
        );
    }

}

export default LoginForm;