import handleResponse from "./response-parser";

const API_URL = process.env.REACT_APP_API_URL;
const API_AUTH_REFRESH_LIMIT = process.env.REACT_APP_REFRESH_LIMIT || 60;

export const authenticationHelper = {
  login,
  logout,
  authHeader,
  authHeaderString,
  handleTokenExpiry
};

function authHeader() {
  // return authorization header with jwt token
  const token = userAccessToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

function authHeaderString() {
  // return authorization header with jwt token
  const token = userAccessToken();
  if (token) {
    return `Bearer ${token}`;
  } else {
    return "";
  }
}

function login(username, password) {
  return fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(handleResponse)
    .then(
      user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("currentUser", JSON.stringify(user));
        console.debug(
          "Authentication complete for user",
          user.profile.username
        );
        return user;
      },
      error => {
        console.debug("Authentication failed", error);
      }
    );
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
}

function userAccessToken() {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser.jwtToken;
}

// In a situation where our authentication token is close to expiring,
// we should call the token refresh endpoint to get a new token
async function handleTokenExpiry() {
  let userDetails = JSON.parse(localStorage.getItem("currentUser"));
  if (
    userDetails.expiryDate - new Date().getTime() / 1000 <
    API_AUTH_REFRESH_LIMIT
  ) {
    console.debug("Token is within expiry range, fetching new token");
    return fetch(`${API_URL}/auth/refresh`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authHeaderString()
      }
    })
      .then(handleResponse)
      .then(newUserAuthDetails => {
        userDetails.jwtToken = newUserAuthDetails.jwtToken;
        userDetails.expiryDate = newUserAuthDetails.expiryDate;

        // set the updated user details in local storage
        localStorage.setItem("currentUser", JSON.stringify(userDetails));
      });
  }
}
