import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL || "http://localhost:8008/api/v1/isys";

const getPosts = (page = 0, username) => {
    let query = (username) ? `username=${username}&page=${page}&size=10` :`page=${page}&size=10`;
    return new Promise((resolve, reject) => {
        axios(`${API_URL}/posts?${query}`, {
            method: "GET"
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

const createPost = async (post, signatureKey) => {
    return new Promise((resolve, reject) => {
        axios(`${API_URL}/posts`, {
            method: "POST",
            data: {
                content: post,
                signatureKey
            }
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export {getPosts, createPost};
