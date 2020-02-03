<template>
    <div id="Home">
        <h2>Welcome to I Said You Said</h2>
        <p v-if="isLoggedIn">
            Set up your keys before creating content
        </p>
        <p v-else>
            Please <router-link to="/login">sign in</router-link> to view the
            feed
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['isLoggedIn', 'currentUser'])
    }
};
</script>

<style scoped>
#Home {
    margin-top: 10%;
    text-align: center;
}

#FileIconRow {
    justify-content: center;
    margin: 5%;
}

#FileIconRow * {
    padding: 1%;
}
</style>
