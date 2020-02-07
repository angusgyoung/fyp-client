import axios from "axios";

const AUTH_URL = "http://localhost:8008/api/v1/isys/auth";

const parseAuthResponse = (res, commit) => {
    const token = res.data.jwtToken;
    const user = res.data.profile;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    commit("auth_success", { token, user });
};

export default {
    state: {
        status: "",
        token: localStorage.getItem("token") || "",
        user: {}
    },
    mutations: {
        auth_request(state) {
            state.status = "loading";
        },
        auth_success(state, { token, user }) {
            state.status = "success";
            state.token = token;
            state.user = user;
        },
        auth_error(state) {
            state.status = "error";
        },
        logout(state) {
            state.status = "";
            state.token = "";
        }
    },
    actions: {
        login({ commit, dispatch }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                    url: `${AUTH_URL}`,
                    data: user,
                    method: "POST"
                })
                    .then(res => {
                        parseAuthResponse(res, commit);
                        dispatch("readKeypair", res.data.profile);
                        resolve(res);
                    })
                    .catch(err => {
                        commit("auth_error");
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        register({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit("auth_request");
                axios({
                    url: `${AUTH_URL}/register`,
                    data: user,
                    method: "POST"
                })
                    .then(res => {
                        parseAuthResponse(res);
                        resolve(res);
                    })
                    .catch(err => {
                        commit("auth_error", err);
                        localStorage.removeItem("token");
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise(resolve => {
                commit("logout");
                commit("remove_keypair");
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        currentUser: state => state.user
    }
};
