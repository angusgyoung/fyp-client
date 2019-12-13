import { authenticationHelper } from "../helpers/authentication";

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (username, password) => {
    const response = await fetch(`${API_URL}/profile/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })
    return response;
}


export const getPosts = async (page = 0) => {
    const response = await fetch(`${API_URL}/posts?page=${page}&size=10`, {
        method: 'GET',
        headers: authenticationHelper.authHeader(),
    });
    return response;
};

export const getPostsForUser = async (username, page = 0) => {
    const response = await fetch(`${API_URL}/posts?username=${username}&page=${page}&size=10`, {
        method: 'GET',
        headers: authenticationHelper.authHeader(),
    });
    return response;
};

export const createPost = async (post) => {
    const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Authorization': authenticationHelper.authHeaderString(),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            content: post,
        })
    })
    return response;
}

export default {getPosts, getPostsForUser};