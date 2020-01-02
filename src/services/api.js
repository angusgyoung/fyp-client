import { authenticationHelper } from "../helpers/authentication";

const API_URL = process.env.REACT_APP_API_URL;

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
      .then(response => parsePostsFromResponse(response))
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
      .then(response => parsePostsFromResponse(response))
      .then(posts => resolve(posts))
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const createPost = async post => {
  await authenticationHelper.handleTokenExpiry();

  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: authenticationHelper.authHeaderString(),
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      content: post
    })
  });
  return response;
};

const parsePostsFromResponse = response => {
  return new Promise((resolve, reject) => {
    if (response.status === 204) {
      resolve();
    } else {
      response
        .json()
        .then(data => {
          resolve(data.content);
        })
        .catch(error => reject(error));
    }
  });
};

export default { getPosts, getPostsForUser };
