import axios from "axios";

const DHT_URL = "http://localhost:3000";

const publishSignature = async postSignature => {
    return new Promise(resolve => {
        axios(`${DHT_URL}/insert`, {
            method: "POST",
            data: {
                postSignature
            }
        }).then(res => resolve(res.data));
    });
};

export { publishSignature };
