<template>
    <div id="app">
        <Navigation />
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "app",
    components: {
        Navigation,
        Footer
    }
};
</script>

<style>
:root {
    --bg-color: #f1f1f1;
    --text-color: #101935;
    --primary-accent-color: #343a40;
    --secondary-accent-color: #94c5cc;
    background-color: var(--bg-color);
}

.btn {
    border-radius: 0 !important;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: var(--text-color);
    background-color: var(--bg-color);
}
</style>
