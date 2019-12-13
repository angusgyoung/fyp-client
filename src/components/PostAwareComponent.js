import React, { Component } from "react";
import { getPosts } from "../services/api";
import WebSocketConnection from "./WebSocketConnection";
import { authenticationService } from "../services/authentication.service";

class PostAwareComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wsClient: WebSocketConnection,
            posts: [],
            currentUser: authenticationService.currentUserValue,
        }
    }
}

export default PostAwareComponent;
