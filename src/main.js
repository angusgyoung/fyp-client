import Vue from "vue";
import Axios from "axios";
import { BootstrapVue } from "bootstrap-vue";
import VueMoment from "vue-moment";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import store from "./state/store";
import router from "./router.js";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue);
Vue.use(VueMoment);

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
    Vue.prototype.$http.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${token}`;
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
