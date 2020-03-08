import * as openpgp from "openpgp";
import {publishPublicKey, revokePublicKey} from "../api/pks";

export default {
    state: {
        keypair: null
    },
    mutations: {
        set_keypair(state, keypair) {
            state.keypair = keypair;
        },
        remove_keypair(state) {
            state.keypair = null;
        }
    },
    actions: {
        generateKeypair({commit}, {user, passphrase}) {
            const options = {
                userIds: [{email: user.username}],
                rsaBits: 4096,
                passphrase
            };

            return openpgp.generateKey(options).then(keypair => {
                // keypair will be saved in local storage with the id
                // of the user as the key
                return new Promise((resolve, reject) => {
                    publishPublicKey(user.username, keypair.publicKeyArmored).then(() => {
                        localStorage.setItem(user.id, JSON.stringify(keypair));
                        commit("set_keypair", keypair);
                        resolve();
                    }).catch(err => reject(err));
                })
            });
        },
        readKeypair({commit}, user) {
            let keypairString = localStorage.getItem(user.id);
            if (keypairString) {
                commit("set_keypair", JSON.parse(keypairString));
            }
        },
        removeKeypair({commit}, currentUser) {
            localStorage.removeItem(currentUser.user.id);
            commit("remove_keypair");
        },
        revokeKeypair({commit}, currentUser) {
            return new Promise(((resolve, reject) => {
                revokePublicKey(currentUser.user.username).then(() => {
                    localStorage.removeItem(currentUser.user.id);
                    commit("remove_keypair");
                    resolve();
                }).catch(err => {
                    if (err.response && err.response.status === 404) {
                        // PKS will respond with 404 if we try and revoke a key
                        // that doesn't exist or hasn't been verified. In that case we don't need
                        // to revoke the key and we can just continue
                        localStorage.removeItem(currentUser.user.id);
                        commit("remove_keypair");
                        resolve();
                    } else reject(err);
                });

            }));
        },
        importKeypair({commit}, {user, keypair}) {
            return new Promise((resolve) => {
                localStorage.setItem(user.id, JSON.stringify(keypair));
                commit("set_keypair", keypair);
                resolve();
            })
        }
    },
    getters: {
        hasKeypair: state => !!state.keypair,
        publicKeyArmored: state => state.keypair.publicKeyArmored,
        privateKeyArmored: state => state.keypair.privateKeyArmored
    }
};
