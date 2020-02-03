<template>
    <b-container>
        <PostList id="feed-post-list" v-bind:posts="posts" />
    </b-container>
</template>

<script>
import PostList from '../components/PostList';
import { getPosts } from '../api/posts';

export default {
    components: {
        PostList
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

<style scoped></style>
