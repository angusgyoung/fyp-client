import React, { Component, useContext } from "react";
import { getPosts } from "../services/api";
import WebSocketConnection from "./WebSocketConnection";
import { authenticationService } from "../services/authentication.service";
import { userContext } from "../context/UserContext";

class PostAwareComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wsClient: WebSocketConnection,
            posts: [],
        }
    }
}

PostAwareComponent.contextType = userContext;

export default PostAwareComponent;
