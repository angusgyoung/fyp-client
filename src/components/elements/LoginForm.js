import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import GenericButton from "./GenericButton";

import "./LoginForm.css"
import { userContext } from "../../context/UserContext";
import { authenticationHelper } from "../../helpers/authentication";

class LoginForm extends Component {

    constructor(props) {
        super(props);

        //TODO if authenticated we should not allow user to
        // go to login page
        // if(lala) {
        //     this.props.history.push('/')
        // }

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

    submitLoginCredentials(event, user) {
        event.preventDefault();
        authenticationHelper.login(this.state.username, this.state.password)
        .then(
            newUser => {
                const { from } = { from: { pathname: "/feed"} };
                this.props.history.push(from)

                user.setUserAfterLogin(newUser);
            }
        );
    }

    render() {
        return (
            <userContext.Consumer>
                {
                    (user) => (
                        <Form
                        onSubmit={(event)=>this.submitLoginCredentials(event, user)}
                        >
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control name="username" onChange={this.usernameChanged} type="text" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" onChange={this.passwordChanged} type="password" placeholder="Password" />
                            </Form.Group>
                            <GenericButton variant="primary" type="submit">
                                Submit
                            </GenericButton>
                        </Form>
            
                    )
                }
            </userContext.Consumer>
        );
    }

}

export default LoginForm;