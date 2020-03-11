import Vue from "vue";
import Axios from "axios";
import { BootstrapVue } from "bootstrap-vue";
import VueMoment from "vue-moment";
import VueSweetalert2 from 'vue-sweetalert2';

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'sweetalert2/dist/sweetalert2.min.css';

import App from "./App.vue";
import store from "./state/store";
import router from "./router.js";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue);
Vue.use(VueMoment);
Vue.use(VueSweetalert2);

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
