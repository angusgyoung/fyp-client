<template>
    <div>
        <div v-bind:key="post.id" v-for="post in posts">
            <PostContainer v-bind:post="post" />
        </div>
        <infinite-loading @infinite="handleNextPageLoad"></infinite-loading>
    </div>
</template>

<script>
import PostContainer from "./PostContainer";
import InfiniteLoading from 'vue-infinite-loading';
import { getPosts } from "../api/posts";

export default {
    components: {
        PostContainer,
        InfiniteLoading
    },
    props: {
        username: String,
        subscription: String
    },
    data() {
        return {
            posts: [],
            page: 0
        }
    },
    methods: {
        handleNextPageLoad($state) {
            getPosts(this.page, this.username)
                .then(data => {
                if (data.content.length) {
                    this.page += 1;
                    this.posts.push(...data.content);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        }
    }
};
</script>
