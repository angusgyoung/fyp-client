import Vue from "vue";

import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Feed from "./pages/Feed.vue";
import Keys from "./pages/Keys.vue";

import store from "./state/store.js";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    { path: "/", name: "home", component: Home },
    { path: "/home", name: "home", component: Home },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    {
        path: "/feed",
        name: "feed",
        component: Feed,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/keys",
        name: "keys",
        component: Keys,
        meta: {
            requiresAuth: true
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

export default router;
