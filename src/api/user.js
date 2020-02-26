import axios from "axios";

const API_URL = "http://localhost:8008/api/v1/isys";

const getUser = (email) => {
    return new Promise((resolve, reject) => {
        axios(`${API_URL}/profile`, {
            method: "GET",
            params: {
                "username": email
            }
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export { getUser };