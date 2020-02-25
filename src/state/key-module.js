import * as openpgp from "openpgp";
import {publishPublicKey} from "../api/pks";

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
        generateKeypair({ commit }, { user, passphrase }) {
            const options = {
                userIds: [{ email: user.username }],
                rsaBits: 4096,
                passphrase
            };

            return openpgp.generateKey(options).then(keypair => {
                // keypair will be saved in local storage with the id
                // of the user as the key
                console.log(keypair);
                publishPublicKey(user.username, keypair.publicKeyArmored);
                localStorage.setItem(user.id, JSON.stringify(keypair));
                commit("set_keypair", keypair);
            });
        },
        readKeypair({ commit }, user) {
            let keypairString = localStorage.getItem(user.id);
            if (keypairString) {
                commit("set_keypair", JSON.parse(keypairString));
            }
        },
        // just removes the current keypair from state, not
        // local storage
        removeKeypair({ commit }) {
            commit("remove_keypair");
        },
        revokeKeypair({ commit }, currentUser) {
            localStorage.removeItem(currentUser.user.id);
            // make call to PKS with revokation key here
            commit("remove_keypair");
        }
    },
    getters: {
        hasKeypair: state => !!state.keypair,
        publicKeyArmored: state => state.keypair.publicKeyArmored,
        privateKeyArmored: state => state.keypair.privateKeyArmored
    }
};
