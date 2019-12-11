import {Client} from "@stomp/stompjs"

const WEBSOCKET_URI = 'ws://localhost:8008/api/v1/isys/websocket';

export const createWsClient = () => {
    let client;

    const config = {
        brokerURL: WEBSOCKET_URI,
        reconnectDelay: 5000,
    };
    client = new Client(config);
    client.activate();
    return client;
}