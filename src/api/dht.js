import axios from "axios";

const DHT_URL = process.env.VUE_APP_DHT_NODE_URL || "http://localhost:3000";

const publishSignature = postSignature => {
    return new Promise((resolve, reject) => {
        axios(`${DHT_URL}/insert`, {
            method: "PUT",
            data: {
                data: postSignature
            }
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

const getSingature = key => {
    return new Promise((resolve, reject) => {
        axios(`${DHT_URL}/lookup/${key}`, {
            method: "GET"
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export { publishSignature, getSingature };
