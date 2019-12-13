import { Component } from "react";
import WebSocketConnection from "../WebSocketConnection";
import { userContext } from "../../context/UserContext";

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
