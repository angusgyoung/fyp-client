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
            <h4 v-if="isLoggedIn">Set up your keys before creating content</h4>
            <h4 v-else>
                Please
                <router-link to="/login">sign in</router-link> to view the feed
            </h4>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["isLoggedIn", "currentUser"])
    }
};
</script>

<style scoped>
#home {
    text-align: center;
    height: 100vh;
}
#home-text-container {
    padding-top: 20%;
}
</style>
