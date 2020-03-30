import axios from "axios";

const DHT_URL = process.env.VUE_APP_DHT_NODE_URL || "http://localhost:3000";

const dhtApi = axios.create({
    withCredentials:false,
    baseURL: DHT_URL
});

const publishSignature = postSignature => {
    return new Promise((resolve, reject) => {
        dhtApi({
            method: "POST",
            data: {
                data: postSignature
            }
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

const getSingature = key => {
    return new Promise((resolve, reject) => {
        dhtApi(`/${key}`, {
            method: "GET",
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export { publishSignature, getSingature };
