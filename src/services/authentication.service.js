import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../helpers/authentication.helper';

const API_URL = process.env.REACT_APP_API_URL;

export const authenticationService = {
    login,
    logout,
    userAccessToken
};

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
        console.log(user);
        return user;
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