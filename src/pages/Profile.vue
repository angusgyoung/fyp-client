<template>
    <b-container class="my-3">
        <b-row class="my-3">
            <b-col class="col-md-4 mb-3">
                <UserOverview :user="user" class="h-100"/>
            </b-col>
            <b-col class="col-md-8 mb-3">
                <b-card class="code-format-card h-100">
                    <b-card-title>Public Key</b-card-title>
                    <b-card-body class="key-preview">{{this.publicKey}}</b-card-body>
                </b-card>
            </b-col>
        </b-row>
        <PostList :username="user.username" :subscription="userPostSubscription" />
    </b-container>
</template>

<script>
import { getPublicKeyForEmail } from "../api/pks";
import { getUser } from "../api/user";

import UserOverview from "../components/UserOverview";
import PostList from "../components/PostList";

export default {
    name: "Profile",
    components: {
        UserOverview,
        PostList
    },
    data() {
        return {
            user: null,
            userPostSubscription: null,
            publicKey: "Loading..."
        };
    },
    mounted() {
        getUser(this.$route.params.username)
            .then(res => {
                this.user = res;
                this.userPostSubscription = `/queue/${this.user.username}/posts`;
                getPublicKeyForEmail(this.user.username)
                    .then(res => (this.publicKey = res.publicKeyArmored))
                    .catch(() => {
                        this.publicKey = 'Failed to retrieve public key...are you sure the keyserver knows about it?';
                    });
            })
            .catch(() => {
                this.$swal.fire({
                    title: "Could not retrieve profile",
                    text: "Please try again",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
                this.$router.go(-1);
            });
    },
    created() {
        document.title = 'Profile - ' + this.$route.params.username;
    }
};
</script>

<style scoped>
.key-preview {
    max-height: 350px;
    overflow: auto;
    overflow-x: hidden;
}
</style>