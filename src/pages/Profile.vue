<template>
    <div>
        <h2>Public Key</h2>
        <p>{{ this.publicKey }}</p>
    </div>
</template>

<script>
    import {getPublicKeyForEmail} from "../api/pks";

    export default {
        name: "Profile",
        data() {
            return {
                profile: null,
                publicKey: 'Loading...'
            }
        },
        mounted() {
            getPublicKeyForEmail(this.$route.params.username)
                .then(res => this.publicKey = res.publicKeyArmored)
                .catch(err => {
                    this.publicKey = `Error:  ${err.message}`;
                    console.log(err);
                });
        }
    }
</script>

<style scoped>
</style>