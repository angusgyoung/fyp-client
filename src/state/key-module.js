import * as openpgp from "openpgp";

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
                localStorage.setItem(user.id, JSON.stringify(keypair));
                commit("set_keypair", keypair);
            });
        },
        removeKeypair({ commit }, user) {
            localStorage.removeItem(user.id);
            commit("remove_keypair");
        }
    },
    getters: {
        hasKeypair: state => !!state.keypair,
        publicKeyArmored: state => state.keypair.publicKeyArmored,
        privateKeyArmored: state => state.keypair.privateKeyArmored
    }
};
