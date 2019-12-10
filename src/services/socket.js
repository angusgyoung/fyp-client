import {Client} from "@stomp/stompjs"

const WEBSOCKET_URI = 'ws://isys.dotwave.io/api/v1/isys/websocket';

export const createWsClient = (wsUrl, subscription, onMessageCallback) => {
    let client;

    const config = {
        brokerURL: wsUrl,
        reconnectDelay: 5000,
        onConnect: () => {
            client.subscribe(subscription, onMessageCallback);
        }
    };
    client = new Client(config);
    client.activate();
    return client;
};

export const createProfileWsClient = (username, onMessageCallback) => {
    return createWsClient(WEBSOCKET_URI, `/queue/${username}/posts`, onMessageCallback)
};

export const createFeedWsClient = (onMessageCallback) => {
    return createWsClient(WEBSOCKET_URI, '/topic/posts', onMessageCallback)
};