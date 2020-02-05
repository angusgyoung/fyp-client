<template>
    <b-container class="my-3">
        <b-row>
            <b-col id="user-sidebar-col" class="col-md-3">
                <UserSidebar />
            </b-col>
            <b-col>
                <PostList v-bind:posts="posts" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import PostList from "../components/PostList";
import UserSidebar from "../components/UserSidebar";
import { getPosts } from "../api/posts";

export default {
    components: {
        PostList,
        UserSidebar
    },
    data() {
        return {
            posts: []
        };
    },
    mounted() {
        getPosts().then(data => (this.posts = data.content));
    }
};
</script>

<style scoped>
</style>
