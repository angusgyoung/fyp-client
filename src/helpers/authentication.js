const API_URL = process.env.REACT_APP_API_URL;

export const authenticationHelper = {
    login,
    logout,
    authHeader,
    authHeaderString
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
        return '';
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


function login(username, password) {
    return fetch(`${API_URL}/auth`, {
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
    .then(handleResponse)
    .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.debug('Authentication complete for user', user.profile.username);
        return user;
    }, 
        error => {
            console.debug('Authentication failed', error);
    })   
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}

function userAccessToken() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return currentUser.jwtToken;
}