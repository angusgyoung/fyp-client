import axios from 'axios';

const API_URL = 'http://localhost:8008/api/v1/isys';

const getPosts = (page = 0) => {
    return new Promise(resolve => {
        axios(`${API_URL}/posts?page=${page}&size=10`, {
            method: 'GET'
        }).then(res => resolve(res.data));
    });
};

const getPostsForUser = async (username, page = 0) => {
    return new Promise(resolve => {
        axios(`${API_URL}/posts?username=${username}&page=${page}&size=10`, {
            method: 'GET'
        }).then(res => resolve(res.data));
    });
};

const createPost = async post => {
    return new Promise(resolve => {
        axios(`${API_URL}/posts`, {
            method: 'POST',
            data: {
                content: post
            }
        }).then(res => resolve(res.data));
    });
};

export { getPosts, getPostsForUser, createPost };
