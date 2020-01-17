import { authenticationHelper } from "../helpers/authentication";
import handleResponse from "../helpers/response-parser";

const API_URL = process.env.REACT_APP_API_URL;
const DHT_NODE_URL = process.env.REACT_APP_DHT_NODE_URL;

export const register = async (username, password) => {
    const response = await fetch(`${API_URL}/profile/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    return response;
};

export const getPosts = async (page = 0) => {
    await authenticationHelper.handleTokenExpiry();

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/posts?page=${page}&size=10`, {
            method: "GET",
            headers: authenticationHelper.authHeader()
        })
            .then(handleResponse)
            .then(response => parsePostsFromData(response))
            .then(posts => resolve(posts))
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
};

export const getPostsForUser = async (username, page = 0) => {
    await authenticationHelper.handleTokenExpiry();

    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/posts?username=${username}&page=${page}&size=10`, {
            method: "GET",
            headers: authenticationHelper.authHeader()
        })
            .then(handleResponse)
            .then(response => parsePostsFromData(response))
            .then(posts => resolve(posts))
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
};

export const createPost = async post => {
    await authenticationHelper.handleTokenExpiry();
    //TODO client side signing should enter here
    let signatureKey = await publishPostSignature("thisShouldBeAPGPSignature");

    const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            Authorization: authenticationHelper.authHeaderString(),
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            content: post,
            signatureKey
        })
    });
    return response;
};

export const publishPostSignature = async postSignature => {
    const response = await fetch(`${DHT_NODE_URL}/insert`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            data: postSignature
        })
    });
    const data = await response.json();
    if (data.error)
        console.error(
            "Something went wrong while publishing a post signature:",
            data.error
        );
    else {
        console.debug(`Published post signature to ${data.nodes} nodes`);
        return data.key;
    }
};

export const retrievePostSignature = async signatureKey => {
    const response = await fetch(`${DHT_NODE_URL}/lookup/${signatureKey}`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    });

    const responseData = await response.json();
    if (responseData) {
        let postSignature = responseData.data.value;
        console.debug("Retrieved post signature:", postSignature);
        return postSignature;
    }
};

const parsePostsFromData = data => {
    return new Promise((resolve, reject) => {
        if (data && data.content) {
            resolve(data.content);
        } else reject("No posts received");
    });
};

export default { getPosts, getPostsForUser };
