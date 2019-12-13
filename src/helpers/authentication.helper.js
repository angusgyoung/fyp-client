import { authenticationService } from "../services/authentication.service";

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.jwtToken) {
        return { Authorization: `Bearer ${currentUser.jwtToken}` };
    } else {
        return {};
    }
}

export function authHeaderString() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.jwtToken) {
        return `Bearer ${currentUser.jwtToken}`;
    } else {
        return '';
    }
}

export function jwtToken() {
    // return raw jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.jwtToken) {
        return currentUser.jwtToken;
    }
    else {
        return '';
    }
}

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authenticationService.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}