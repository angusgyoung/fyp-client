import { Stomp } from "@stomp/stompjs"

export const createWsClient = async (wsUrl, subscription, onFrameCallback) => {
    let client = Stomp.client(wsUrl);
    client.reconnect_delay = 5000;
    // TODO decide whether I need to secure this connection
    return new Promise((resolve) => {
        client.connect({}, () => {
            client.subscribe(subscription, onFrameCallback);
            resolve(client)
        });
    })
};