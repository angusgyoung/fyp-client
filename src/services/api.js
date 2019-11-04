export const getPosts = async () => {
    const response = await fetch('http://localhost:8080/api/v1/isys/posts?page=0&size=10', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    });
    return await response.json();
};

export const getPostsForUser = async (username) => {
    const response = await fetch(`http://localhost:8080/api/v1/isys/posts/${username}?page=0&size=10`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    });
    return await response.json();
};

export default {getPosts, getPostsForUser};