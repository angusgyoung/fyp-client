import axios from "axios";

const API_URL = "http://localhost:8008/api/v1/isys";

const getPosts = (page = 0) => {
    return new Promise((resolve, reject) => {
        axios(`${API_URL}/posts?page=${page}&size=10`, {
            method: "GET"
        }).then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

const getPostsForUser = async (username, page = 0) => {
    return new Promise((resolve, reject) => {
        axios(`${API_URL}/posts?username=${username}&page=${page}&size=10`, {
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

export {getPosts, getPostsForUser, createPost};
