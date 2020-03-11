import Vue from "vue";

import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Feed from "./pages/Feed.vue";
import Keys from "./pages/Keys.vue";
import Profile from "./pages/Profile";

import store from "./state/store.js";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {path: "/", name: "home", component: Home, meta: { title: 'Home'}},
    {path: "/login", name: "login", component: Login, meta: { title: 'Login'}},
    {path: "/register", name: "register", component: Register, meta: { title: 'Register'}},
    {
        path: "/feed",
        name: "feed",
        component: Feed,
        meta: {
            title: "Feed",
            requiresAuth: true
        }
    },
    {
        path: "/keys",
        name: "keys",
        component: Keys,
        meta: {
            title: 'Keys',
            requiresAuth: true
        }
    },
    {
        path: "/profile/:username",
        name: "profile",
        component: Profile,
        meta: {
            requiredAuth: true
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'I Said You Said';
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
