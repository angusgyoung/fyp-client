<template>
    <div
        id="home"
        :style="{
            backgroundImage:
                'url(' + require('../assets/img/public_key.svg') + ')'
        }"
    >
        <b-container id="home-text-container">
            <h1>Welcome to I Said You Said</h1>
            <h3 v-if="isLoggedIn">
                <div v-if="hasKeypair">
                    <p>You are ready to create signed content</p>
                </div>
                <div v-else>
                    <router-link to="/keys">Set up your keys</router-link>
                    <p>
                        before
                        creating content
                    </p>
                </div>
            </h3>
            <h4 v-else>
                Please
                <router-link to="/login">sign in</router-link>to view the feed
            </h4>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["isLoggedIn", "currentUser", "hasKeypair"])
    }
};
</script>

<style scoped>
#home {
    text-align: center;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
}
#home-text-container {
    padding-top: 20%;
}
</style>
