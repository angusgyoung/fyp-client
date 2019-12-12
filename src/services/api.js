import { authHeader } from "../helpers/authentication.helper";
import config  from 'config';

export const register = async (username, password) => {
    const response = await fetch(`${API_HOST}/profile/create`, {
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
    const response = await fetch(`${API_HOST}/posts?page=${page}&size=10`, {
        method: 'GET',
        headers: authHeader(),
    });
    return response;
};

export const getPostsForUser = async (username, page = 0) => {
    const response = await fetch(`${API_HOST}/posts?username=${username}&page=${page}&size=10`, {
        method: 'GET',
        headers: authHeader()
    });
    return response;
};

export const createPost = async (post) => {
    const response = await fetch(`${API_HOST}/posts`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({
            content: post,
        })
    })
    return response;
}

export default {getPosts, getPostsForUser};