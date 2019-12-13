import React, { Component } from "react";
import LoginForm from "../components/LoginForm";

class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginForm history={this.props.history}/>
        )
    }

}

export default Login;