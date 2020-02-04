import axios from "axios";

const DHT_URL = "http://localhost:3000";

const publishSignature = postSignature => {
    return new Promise(resolve => {
        axios(`${DHT_URL}/insert`, {
            method: "PUT",
            data: {
                data: postSignature
            }
        }).then(res => resolve(res.data));
    });
};

const getSingature = key => {
    return new Promise(resolve => {
        axios(`${DHT_URL}/lookup/${key}`, {
            method: "GET"
        }).then(res => resolve(res.data));
    });
};

export { publishSignature, getSingature };
