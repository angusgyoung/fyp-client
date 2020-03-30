import axios from "axios"

const PKS_URL = process.env.VUE_APP_PKS_URL  || "http://localhost:8888/api/v1/key";

const pksApi = axios.create({
    withCredentials:false,
    baseURL: PKS_URL
});

const getPublicKeyForEmail = (email) => {
        return new Promise((resolve, reject) => {
            pksApi({
                method: "GET",
                params: {
                    email
                },
                headers: {
                    "Accept": "application/json"
                }
            }).then(res => resolve(res.data))
                .catch(err => reject(err));
        });
};

const publishPublicKey = (email, key) => {
    return new Promise((resolve, reject) => {
        pksApi({
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            data: {
                "publicKeyArmored": key,
                "primaryEmail": email
            }
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

const revokePublicKey = (email) =>  {
    return new Promise((resolve, reject) => {
        pksApi({
            method: "DELETE",
            params: {
                email
            }
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export { getPublicKeyForEmail, publishPublicKey, revokePublicKey };