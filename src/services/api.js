const API_HOST = "https://isys.dotwave.io/api/v1/isys";

export const getPosts = async () => {
    const response = await fetch(`${API_HOST}/posts?page=0&size=10`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    });
    return await response.json();
};

export const getPostsForUser = async (username) => {
    const response = await fetch(`${API_HOST}/posts/${username}?page=0&size=10`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    });
    return await response.json();
};

export default {getPosts, getPostsForUser};