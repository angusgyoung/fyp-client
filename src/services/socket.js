import {Client} from "@stomp/stompjs"

const WEBSOCKET_URI = process.env.REACT_APP_WEBSOCKET_URL

export const createWsClient = () => {
    let client;

    const config = {
        brokerURL: WEBSOCKET_URI,
        reconnectDelay: 5000,
        onConnect: () => console.log('Websocket connected'),
        onDisconnect: () => console.log('Websocket disconnected')
    };
    client = new Client(config);
    
    client.activate();
    return client;
}