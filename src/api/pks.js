import axios from "axios"

const PKS_URL = process.env.PKS_URL  || "http://localhost:8888";

const getPublicKeyForEmail = (email) => {
        return new Promise((resolve, reject) => {
            axios(`${PKS_URL}/api/v1/key`, {
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
        axios(`${PKS_URL}/api/v1/key`, {
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
        axios(`${PKS_URL}/api/v1/key`, {
            method: "DELETE",
            params: {
                email
            }
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export { getPublicKeyForEmail, publishPublicKey, revokePublicKey };