import React, { Component } from "react";
import { getPosts } from "../services/api";
import WebSocketConnection from "./WebSocketConnection";

class PostAwareComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wsClient: WebSocketConnection,
            posts: [],
            user: props.user
        }
    }
}

export default PostAwareComponent;
