import React, { Component } from "react";
import { createWsClient } from "../services/socket";
import { getPosts } from "../services/api";

class WebSocketConnection {

    constructor() {
        this.state = {
            wsClient: createWsClient()
        }
    }

    getClient() {
        return this.wsClient;
    }

    addSubscription(identifier, onMessageCallback) {
        this.state.wsClient.subscribe(identifier, onMessageCallback);
        console.log('added subscription to ', identifier);
    }

    componentWillUnmount() {
        this.wsClient.deactivate();
    }
}

export default new WebSocketConnection();