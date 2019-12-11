const API_HOST = "http://localhost:8008/api/v1/isys";

export const getPosts = async () => {
    const response = await fetch(`${API_HOST}/posts?page=0&size=10`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    });
    return response;
};

export const getPostsForUser = async (username) => {
    const response = await fetch(`${API_HOST}/posts?username=${username}&page=0&size=10`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    });
    return response;
};

export const createPost = async (post, username) => {
    const response = await fetch(`${API_HOST}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            content: post,
            username: username
        })
    })
    return response;
}

export default {getPosts, getPostsForUser};