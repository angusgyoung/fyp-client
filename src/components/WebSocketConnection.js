import React, { Component } from "react";
import { createWsClient } from "../services/socket";
import { getPosts } from "../services/api";

class WebSocketConnection {

    constructor() {
        this.state = {
            wsClient: createWsClient()
        }
        this.addSubscription = this.addSubscription.bind(this);
    }

    addSubscription(identifier, onMessageCallback) {
        this.state.wsClient.subscribe(identifier, onMessageCallback);
    }

    componentWillUnmount() {
        this.wsClient.deactivate();
    }
}

export default new WebSocketConnection();