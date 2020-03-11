import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import userModule from "../state/user-module";
import keyModule from "../state/key-module";

export default new Vuex.Store({
    modules: {
        userModule,
        keyModule
    },
    plugins: [createPersistedState()]
});
