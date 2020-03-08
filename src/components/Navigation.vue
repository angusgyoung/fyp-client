<template>
    <div id="NavigationContainer">
        <b-navbar id="Navbar" type="dark" variant="dark" toggleable="lg">
            <b-navbar-brand href="/">ISYS</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item @click="$router.push('/home')">Home</b-nav-item>
                    <b-nav-item @click="$router.push('/feed')">Feed</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <div v-if="isLoggedIn">
                        <b-nav-item-dropdown right>
                            <template v-slot:button-content>{{currentUser.username}}</template>
                            <b-dropdown-item
                                @click="$router.push(`/profile/${currentUser.username}`)"
                            >Profile</b-dropdown-item>
                            <b-dropdown-item @click="$router.push('/keys')">Keys</b-dropdown-item>
                            <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </div>

                    <div id="LoginRegisterContainer" v-else>
                        <b-button
                            size="sm"
                            variant="outline-success"
                            @click="$router.push('/login')"
                        >Login</b-button>
                        <b-button
                            size="sm"
                            variant="outline-info"
                            @click="$router.push('/register')"
                        >Register</b-button>
                    </div>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<style scoped>
#NavigationContainer {
    position: top;
}

#LoginRegisterContainer * {
    margin-left: 10px;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["isLoggedIn", "currentUser"])
    },
    methods: {
        logout() {
            this.$store.dispatch("logout").then(() => {
                this.$router.push("/login");
            });
        }
    }
};
</script>
