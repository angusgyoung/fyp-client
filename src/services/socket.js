import {Client} from "@stomp/stompjs"

const WEBSOCKET_URI = process.env.REACT_APP_WEBSOCKET_URL

export const createWsClient = () => {
    let client;

    const config = {
        brokerURL: WEBSOCKET_URI,
        reconnectDelay: 5000,
        onConnect: () => console.debug('Websocket connected'),
        onDisconnect: () => console.debug('Websocket disconnected')
    };
    client = new Client(config);
    
    client.activate();
    return client;
}